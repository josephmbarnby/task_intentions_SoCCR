# Packages
import logging


def main():
  # Configure logging
  format = "%(asctime)s: %(message)s"
  logging.basicConfig(format=format, level=logging.INFO, datefmt="%H:%M:%S")


if __name__ == "__main__":
  main()
