# Custom modules
import util


# Class to test fuzzy input to the server
class TestFuzzing():
  def test_basic(self):
    assert util.runner(util.Requests.basic, args=(util.ADDR, )) == True
