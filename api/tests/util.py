# Packages
import logging
import requests
import threading
import time
from types import FunctionType


# Create a new worker thread with a function that supports
# a tuple of arguments
def create_thread(func, args=()):
  logging.debug("Creating new thread")
  return threading.Thread(target=func, args=args)


# Create a pool of worker threads and run them
def create_pool(workers, func, args):
  jobs = []

  for i in range(0, workers):
    jobs.append(create_thread(func, args))

  # Start the threads
  for j in jobs:
    j.start()

  # Join the threads
  for j in jobs:
    j.join()


# Create and send a GET request to the specified address
# with parameters
def create_request(address, params={}):
  response = None

  try:
    response = requests.get(address, params=params)
  except(requests.exceptions.ConnectionError):
    logging.error("Connection error!")

  return response


def runner(func: FunctionType, name: str, args):
  logging.info("Running '{}'".format(name))
  start_time = time.time()

  # Run the test
  func(args)

  # Calculated the elapsed time
  elapsed = time.time() - start_time
  logging.info("'{}' finished after {}s".format(name, round(elapsed, ndigits=3)))