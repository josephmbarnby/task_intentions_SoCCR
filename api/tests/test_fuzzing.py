# Custom modules
import util
import common


# Class to test fuzzy input to the server
class TestFuzzing():
  def test_basic(self):
    util.runner(common.Requests.basic, args=(util.ADDR, ))
