const {beforeEach, afterEach, test} = require('@jest/globals');
const {Graphics} = require('../src/lib');

beforeEach(() => {});

afterEach(() => {});

test('default instantiation test for Graphics', () => {
  const graphics = new Graphics(null);
  expect(graphics.getElements().length).toBe(0);
});
