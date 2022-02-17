source("functions.R")

library(plumber)
library(jsonlite)

#* Disable CORS for testing purposes only
#* @filter cors
cors <- function(res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  plumber::forward()
}

#* Run a computation on the data gathered from phase one
#* @param req the request object
#* @param id the participant ID
#* @param responses the participant responses
#* @get /api/compute
function(req, id=0, responses="") {
  valid_responses <- TRUE

  if (responses == "") {
    # The 'responses' parameter was empty
    valid_responses <- FALSE
  }

  # Declare the parsed responses
  parsed <- list()
  if (valid_responses == TRUE) {
    # The 'responses' parameter has content, parse and check length
    parsed <- tryCatch(fromJSON(responses, simplifyDataFrame = TRUE),
                        error = function(e) {
                          list()
                        })
  }

  # Generate a data frame from the responses
  computed <- list()
  if (valid_responses == TRUE && length(parsed) > 0) {
    # Load the full data
    full_data <- read.csv("fullData.csv") %>% dplyr::select(-X)

    # Run the matching function
    computed <- matching_partner_phase1(
      Phase1Data = parsed,
      full_data,
      shuffle = T,
      file_loc = F)
  }

  # Respond to the game
  return(list(
    id = id,
    computed = toJSON(computed)
  ))
}