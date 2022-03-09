# Function file
source("functions.R")

# Additional libraries
library(plumber)
library(jsonlite)
library(logger)

# Set the log level

#* Disable CORS for testing purposes only
#* @filter cors
cors <- function(res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  plumber::forward()
}

#* Primary API endpoint function
#* @param req the request object
#* @param id the participant ID
#* @param responses the participant responses
#* @get /compute/intentions
function(req, id=0, responses="") {
  # Flag for valid response
  valid_request <- TRUE

  if (id == 0) {
    # The 'id' parameter was empty
    valid_request <- FALSE
    log_error("\'id\' parameter not specified!")
  } else {
    log_debug("Request from ID \'{id}\' received")
  }

  if (responses == "") {
    # The 'responses' parameter was empty
    valid_request <- FALSE
    log_error("\'responses\' parameter not specified!")
  }

  # Declare the parsed responses
  parsed <- list()
  if (valid_request == TRUE) {
    # The 'responses' parameter has content, parse and check length
    parsed <- tryCatch(fromJSON(responses, simplifyDataFrame = TRUE),
                        error = function(e) {
                          log_error("Error encountered while parsing \'responses\' content")
                          list()
                        })
  }

  # Generate a data frame from the responses
  computed <- list()
  if (valid_request == TRUE && length(parsed) > 0) {
    log_debug("Valid request received, running function...")
    # Load the full data
    full_data <- read.csv("./data/fullData.csv") %>% dplyr::select(-X)

    # Create the partners
    log_debug("Creating partners...")
    precan_df <- precan_partners(fullData)

    # Run the matching function
    log_debug("Running matching function...")
    computed <- matching_partner_incremental_fit(
        phase1data = parsed,
        precan_df,
        shuffle = T,
        file_loc = F)
  } else {
    log_warn("Invalid request received, returning empty response")
  }

  # Respond to the game
  return(list(
    id = id,
    computed = toJSON(computed)
  ))
}