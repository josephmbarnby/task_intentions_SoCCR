# Function file
source("functions.R")

# Additional libraries
library(logger)
library(jsonlite)
library(RestRserve)

# Create a new application with CORS middleware
application <- Application$new(
  middleware = list(CORSMiddleware$new())
)

# Configure the logger to use files
if (dir.exists("logs") == FALSE) {
  dir.create("logs")
}

# Create a data folder to store responses
if (dir.exists("responses") == FALSE) {
  dir.create("responses")
}

# Set the 'server' log level and namespace
log_threshold(DEBUG, namespace = "server")
log_appender(appender_tee(
  "./logs/server.log",
  append = TRUE,
  max_lines = Inf,
  max_bytes = Inf,
  max_files = 1L
), namespace = "server")

# Set the 'computations' log level and namespace
log_threshold(DEBUG, namespace = "computations")
log_appender(appender_tee(
  "./logs/computations.log",
  append = TRUE,
  max_lines = Inf,
  max_bytes = Inf,
  max_files = 1L
), namespace = "computations")

# Start the server
log_info("Starting server...", namespace = "server")

# Load the full data
full_data <- read.csv("./data/fullData.csv") %>% dplyr::select(-X)

# Create the partners
log_debug("Creating partners...", namespace = "server")
precan_df <- precan_partners(full_data)
log_debug("Ready to start!", namespace = "server")

handler <- function(.req, .res) {
  # Print the headers
  log_debug("Host: ", as.character(.req$headers["host"]), namespace = "server")

  # Parse the ID from the body of the request
  # Check for a valid ID
  valid_id <- FALSE
  if ("id" %in% attributes(.req$parameters_query)$names) {
    id <- as.integer(.req$parameters_query["id"])
    if (!is.na(id)) {
      valid_id <- TRUE
    }
  }

  # Reply with a HTTPError if any issues with ID
  if (valid_id == FALSE) {
    log_error("ID invalid or not specified", namespace = "server")
    raise(HTTPError$bad_request())
  }

  # Parse the responses
  valid_response <- FALSE
  parsed <- list()
  if ("responses" %in% attributes(.req$parameters_query)$names) {
    tryCatch({
        parsed <- fromJSON(
          as.character(.req$parameters_query["responses"]),
          simplifyDataFrame = TRUE
        )
        valid_response <- TRUE
      },
      error = function(e) {
        log_error(
          "Error encountered while parsing \'responses\' content",
          namespace = "server"
        )

        # Return an empty list
        list()
      }
    )
  }

  # Reply with a HTTPError if any issues with responses
  if (valid_response == FALSE) {
    log_error("\'responses\' invalid or not specified", namespace = "server")
    raise(HTTPError$bad_request())
  } else {
    log_debug("Successfully parsed responses", namespace = "server")
  }

  log_success("Valid request received", namespace = "server")
  log_info("Computing for ID: {id}", namespace = "computations")

  # Run the matching function
  log_debug("Running matching function...", namespace = "server")

  computed <- list()
  tryCatch({
      computed <- match_incremental_fit(
        phase_data = parsed,
        precan_df,
        shuffle = T,
        file_loc = F)
    },
    error = function(e) {
      log_error(
        "Error encountered while computing the partner",
        namespace = "server"
      )

      # Return an empty list
      list()
    }
  )

  # Save the data in CSV for for each ID
  # Create a folder for the ID if it doesn't exist
  if (dir.exists(paste0("responses/", id)) == FALSE) {
    dir.create(paste0("responses/", id))
  }

  file_path <- paste0(
    "responses/",
    id,
    "/"
  )

  file_time <- as.character(round(as.numeric(as.POSIXct(Sys.time()))))

  # Write the CSV file
  write.csv(
    computed,
    paste0(
      file_path,
      file_time,
      "_partner",
      ".csv"
    )
  )

  # Configure the response body
  .res$set_body(toJSON(list(
    id = id,
    computed = toJSON(computed)
  )))
  .res$set_content_type("text/plain")
}

# Specify the API endpoint and handler
application$add_get(path = "/compute/intentions", FUN = handler)

# Start the server
backend <- BackendRserve$new()
backend$start(application, http_port = 8000)