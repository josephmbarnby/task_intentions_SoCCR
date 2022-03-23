# Function file
source("functions.R")

# Additional libraries
library(logger)
library(jsonlite)
library(RestRserve)
library(tidyverse)

# Create a new application with CORS middleware
application <- Application$new(
  middleware = list(CORSMiddleware$new())
)

# Configure the logger to use files
if (dir.exists("logs") == FALSE) {
  dir.create("logs")
}

# Create a data folder to store participant data
if (dir.exists("participants") == FALSE) {
  dir.create("participants")
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
      computed <- matching_partner_incremental_fit(
        phase1data = parsed,
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
  if (dir.exists(paste0("participants/", id)) == FALSE) {
    dir.create(paste0("participants/", id))
  }

  # Generate file path
  file_path <- paste0("participants/", id, "/")
  file_time <- as.character(round(as.numeric(as.POSIXct(Sys.time()))))
  responses_file_name <- paste(id, file_time, "responses.csv", sep = "_")
  parameters_file_name <- paste(id, file_time, "parameters.csv", sep = "_")
  partner_file_name <- paste(id, file_time, "partner.csv", sep = "_")

  # Write the responses CSV file
  write.csv(
    parsed,
    paste0(
      file_path,
      responses_file_name
    )
  )

  # Extract the partner data and write the partner CSV file
  write.csv(
    computed[[1]],
    paste0(
      file_path,
      partner_file_name
    )
  )

  # Extract participant and partner parameters
  participant_parameters <- computed[[2]]
  partner_parameters <- as.list(strsplit(computed[[3]], " "))[[1]]

  # Write the parameters CSV file
  write.csv(
    data.frame(
      mu_alpha = c(participant_parameters[1], partner_parameters[1]),
      mu_beta = c(participant_parameters[2], partner_parameters[2]),
      row.names = c("ppt", "par")
    ),
    paste0(
      file_path,
      parameters_file_name
    )
  )

  # Configure the response body
  .res$set_body(toJSON(list(
    id = id,
    computed = toJSON(computed[[1]])
  )))
  .res$set_content_type("text/plain")
}

# Specify the API endpoint and handler
application$add_get(path = "/compute/intentions", FUN = handler)

# Start the server
backend <- BackendRserve$new()
backend$start(application, http_port = 8000)