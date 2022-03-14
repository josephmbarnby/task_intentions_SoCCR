# Function file
source("functions.R")

# Additional libraries
library(logger)
library(jsonlite)
library(RestRserve)

application <- Application$new()

# Configure the logger to use files
if (dir.exists("logs") == FALSE) {
  dir.create("logs")
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

handler <- function(.req, .res) {
  # Parse the ID and responses from the body of the request
  # Check for an ID
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

  parsed <- tryCatch(
    fromJSON(
      as.character(.req$parameters_query["responses"]),
      simplifyDataFrame = TRUE
    ),
    error = function(e) {
      log_error(
        "Error encountered while parsing \'responses\' content",
        namespace = "server"
      )
      # Return an empty list
      list()
    }
  )

  log_success("Valid request received", namespace = "server")
  log_info("ID: {id}", namespace = "computations")

  # Run the matching function
  log_debug("Running matching function...", namespace = "server")
  computed <- match_incremental_fit(
      phase1data = parsed,
      precan_df,
      shuffle = T,
      file_loc = F)

  .res$set_body(toJSON(list(
    id = id,
    computed = toJSON(computed)
  )))
  .res$set_content_type("text/plain")
}

application$add_get(path = "/compute/intentions", FUN = handler)

# Start the server
backend <- BackendRserve$new()
backend$start(application, http_port = 8000)