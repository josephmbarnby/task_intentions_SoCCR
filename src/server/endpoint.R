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
function(req, id=0, responses=list()) {
  # Generate a data frame from the responses
  parsed <- fromJSON(responses, simplifyDataFrame = TRUE)
  
  # Iterate and increment all values before returning
  for (row in 1: nrow(parsed)) {
    optionOne <- parsed[row, "optionOne"]
    optionTwo <- parsed[row, "optionTwo"]
    
    optionOne = optionOne + 1
    optionTwo = optionTwo + 1
    
    parsed[row, "optionOne"] = optionOne
    parsed[row, "optionTwo"] = optionTwo
  }
  
  # Respond to the game
  return(list(
    id = id,
    responses = toJSON(parsed)
  ))
}