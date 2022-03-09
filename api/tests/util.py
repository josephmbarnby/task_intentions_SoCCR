# Packages
import logging
from pyclbr import Function
import requests
import threading
import time
import numpy as np


DURATIONS = []


# Create a new worker thread with a function that supports
# a tuple of arguments
def create_thread(func, args=()):
  logging.debug("Creating new thread")
  return threading.Thread(target=func, args=args)


# Create and send a GET request to the specified address
# with parameters
def create_request(address, params={}):
  request_sent = time.time()

  response = None
  try:
    response = requests.get(address, params=params)
  except(requests.exceptions.ConnectionError):
    logging.error("Connection error!")

  DURATIONS.append(round(time.time() - request_sent, ndigits=3))
  return response


def get_stats():
  sigma = np.average(DURATIONS)
  local_min = np.min(DURATIONS)
  local_max = np.max(DURATIONS)

  return [sigma, local_min, local_max]


def runner(func: Function, name: str, args):
  logging.info("Running '{}'".format(name))
  start_time = time.time()

  # Run the test
  func(args)

  # Calculated the elapsed time
  elapsed = time.time() - start_time
  logging.info("'{}' finished after {}s".format(name, round(elapsed, ndigits=3)))