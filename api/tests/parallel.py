# Packages
import logging


# Custom modules
import util


def start(address=""):
  logging.info("Starting parallel tests -> {}".format(address))

  # Run the basic test
  util.runner(ParallelTests.basic, "ParallelTests.basic", args=(address, ))


class ParallelTests:
  def basic(args):
    # Create a pool of 3 threads
    jobs = []
    num = 3

    for i in range(0, num):
      jobs.append(util.create_thread(ParallelRequests.basic, (args[0], )))

    # Start the threads
    for j in jobs:
      j.start()

    # Join the threads
    for j in jobs:
      j.join()


# Class to group parallel requests
class ParallelRequests:
  # Basic request
  def basic(address=""):
    # Send a request
    response = util.create_request(address, params={
      "id": 1234,
      "responses": "[{\"ID\":\"NA\",\"Trial\":1,\"ppt1\":2,\"par1\":3,\"ppt2\":2,\"par2\":4,\"Ac\":1,\"Phase\":1}]"
    })

    # Acknowledge a response
    if (response):
      logging.info("Request succeeded")
    else:
      logging.error("Request failed")
    