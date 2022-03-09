# Packages
import logging


# Custom modules
import util


def start(address=""):
  logging.info("Starting fuzzing tests -> {}".format(address))

  # Run the basic test
  util.runner(FuzzTests.basic, "FuzzTests.basic", args=(address, ))


# Class to group fuzzing tests
class FuzzTests:
  # Basic test
  def basic(args):
    FuzzRequests.basic(args[0])


# Class to group fuzzing requests
class FuzzRequests:
  # Basic request
  def basic(address=""):
    # Send a request
    response = util.create_request(address, params={
      "id": 1234,
      "responses": "[{\"ID\":\"NA\",\"Trial\":1,\"ppt1\":2,\"par1\":3,\"ppt2\":2,\"par2\":4,\"Ac\":1,\"Phase\":1}]"
    })

    if (response):
      logging.info("Success!")
