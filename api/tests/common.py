# Packages
import json
import logging


# Custom functions
import util


# Class to group requests
class Requests:
  # Basic request
  def basic(address=""): 
    # Send a request
    logging.info("Sending request...")
    response = util.create_request(address, params={
      "id": 1234,
      "responses": "[{\"ID\":\"NA\",\"Trial\":1,\"ppt1\":2,\"par1\":3,\"ppt2\":2,\"par2\":4,\"Ac\":1,\"Phase\":1}]"
    })

    # Extract the content of the response
    content = None
    try:
      content = response.json()
      logging.info("Request succeeded!")
    except (json.JSONDecodeError):
      logging.error("Error decoding JSON!")

    # Assert that there were no issues decoding the response
    assert content is not None

    # Assert that ID has been specified
    assert util.valid_id(content['id']) == True

    # Assert that the responses are valid
    assert util.valid_responses(json.loads(content['computed'][0])) == True