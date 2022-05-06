# Custom modules
import util
import common


# Class to test parallel (i.e. multiple) requests
class TestParallel():
  def test_basic(self):
    util.runner(util.create_pool, (3, common.Requests.basic, (util.ADDR, ), ))


  def test_long(self):
    util.runner(util.create_pool, (10, common.Requests.basic, (util.ADDR, ), ))
