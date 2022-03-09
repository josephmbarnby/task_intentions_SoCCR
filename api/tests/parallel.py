# Packages
import logging


# Custom modules
import util


def start(address=""):
  logging.info("Starting parallel tests -> {}".format(address))

  # Run the tests
  util.runner(ParallelTests.basic, args=(address, ))
  util.runner(ParallelTests.long, args=(address, ))


class ParallelTests:
  def basic(args):
    util.create_pool(3, ParallelRequests.basic, (args[0], ))
  def long(args):
    util.create_pool(100, ParallelRequests.basic, (args[0], ))


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
      logging.info("Request succeeded!")
    else:
      logging.error("Request failed!")
    