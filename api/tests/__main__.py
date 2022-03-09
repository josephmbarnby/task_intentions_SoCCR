# Packages
import logging

# Custom modules
import fuzzing
import parallel

ADDR = "http://localhost:8000/compute/intentions"

def main():
  # Configure logging
  format = "%(asctime)s: %(message)s"
  logging.basicConfig(format=format, level=logging.INFO, datefmt="%H:%M:%S")

  # Start the fuzzing tests
  fuzzing.start(address=ADDR)

  # Start the parallel tests
  parallel.start(address=ADDR)


if __name__ == "__main__":
  main()