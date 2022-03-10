# Additional libraries
library(logger)
library(plumber)
library(future)
future::plan("multicore")

# Configure the logger to use files
if (dir.exists("logs") == FALSE) {
  dir.create("logs")
}

# Set the server log level and namespace
log_threshold(DEBUG, namespace = "server")
log_appender(appender_tee(
  "./logs/server.log",
  append = TRUE,
  max_lines = Inf,
  max_bytes = Inf,
  max_files = 1L
), namespace = "server")

# Set the requests log level and namespace
log_threshold(DEBUG, namespace = "requests")
log_appender(appender_tee(
  "./logs/requests.log",
  append = TRUE,
  max_lines = Inf,
  max_bytes = Inf,
  max_files = 1L
), namespace = "requests")

# Start the server
log_info("Starting server...", namespace = "server")

# 'server.R' is the location of the file that contains the API endpoint code
pr("server.R") %>%
  pr_run(port = 8000, host = "0.0.0.0")