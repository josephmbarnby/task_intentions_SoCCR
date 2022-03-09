library(plumber)

# 'server.R' is the location of the file that contains the API endpoint code
pr("server.R") %>%
  pr_run(port = 8000, host = "0.0.0.0")