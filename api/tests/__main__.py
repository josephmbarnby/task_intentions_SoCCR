# Packages
import logging

# Custom modules
import fuzzing
import parallel
import util

ADDR = "http://localhost:8000/compute/intentions"

def main():
  # Configure logging
  format = "%(asctime)s: %(message)s"
  logging.basicConfig(format=format, level=logging.INFO, datefmt="%H:%M:%S")

  # Start the fuzzing tests
  fuzzing.start(address=ADDR)

  # Start the parallel tests
  parallel.start(address=ADDR)

  # Get and print the statistics
  stats = util.get_stats()
  logging.info("Finished tests:\n\t\tAverage: {}s\n\t\tMin: {}s\n\t\tMax: {}s".format(stats[0], stats[1], stats[2]))

if __name__ == "__main__":
  main()