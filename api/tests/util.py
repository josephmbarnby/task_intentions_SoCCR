# Packages
import logging
import requests
import threading
import time
from types import FunctionType


# Constants
ADDR = "http://localhost:8000/compute/intentions"


# Create a new worker thread with a function that supports
# a tuple of arguments
def create_thread(target, args=()):
  logging.debug("Creating new thread")
  return threading.Thread(target=target, args=args)


# Create a pool of worker threads and run them
def create_pool(workers, target, args):
  logging.info("Creating {}-worker pool".format(workers))
  jobs = []

  for i in range(0, workers):
    jobs.append(create_thread(target, args))

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


def runner(func: FunctionType, args):
  logging.info("Running {}: {}".format(func.__module__, func.__name__))
  start_time = time.time()

  # Run the test
  output = func(*args)

  # Calculated the elapsed time
  elapsed = time.time() - start_time
  logging.info("{}: {} finished after {}s".format(func.__module__, func.__name__, round(elapsed, ndigits=3)))

  # Return test output
  return output

# Class to group requests
class Requests:
  # Basic request
  def basic(address=""): 
    # Send a request
    response = create_request(address, params={
      "id": 1234,
      "responses": "[{\"ID\":\"NA\",\"Trial\":1,\"ppt1\":2,\"par1\":3,\"ppt2\":2,\"par2\":4,\"Ac\":1,\"Phase\":1}]"
    })

    # Acknowledge a response
    if (response):
      logging.info("Request succeeded!")
      return True
    else:
      logging.error("Request failed!")
      return False
