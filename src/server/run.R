# Additional libraries
library(logger)
library(plumber)

# Set the log level
log_threshold(DEBUG)
log_layout(layout_glue_colors)

log_info("Starting server...")
# 'server.R' is the location of the file that contains the API endpoint code
pr("server.R") %>%
  pr_run(port = 8000, host = "0.0.0.0")