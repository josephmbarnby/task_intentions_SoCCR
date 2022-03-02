library(plumber)

# 'endpoint.R' is the location of the file that contains the API endpoint
pr("endpoint.R") %>%
  pr_run(port = 8123, host = "0.0.0.0")