const utils = require('../utils');

describe('utils', () => {
  describe('parseLinks', () => {
    it('Should should return an object with <links> assigned to their rel', () => {
      const expected = {
        test: 'https://api.github.com',
      };
      const links = '<https://api.github.com>; rel="test"';
      const result = utils.parseLinks(links);
      expect(result).toEqual(expected);
    });
    it('Should work with multiple links', () => {
      const expected = {
        next:
          'https://api.github.com/repositories/10270250/pulls?state=open&page=2',
        last:
          'https://api.github.com/repositories/10270250/pulls?state=open&page=5',
      };
      const links =
        '<https://api.github.com/repositories/10270250/pulls?state=open&page=2>; rel="next", <https://api.github.com/repositories/10270250/pulls?state=open&page=5>; rel="last"';
      const result = utils.parseLinks(links);
      expect(result).toEqual(expected);
    });
  });
});
