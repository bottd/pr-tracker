const utils = require('../');
const API = require('../API');

const token = process.env.TOKEN;

jest.mock('../API');
const mockPulls = [
  {
    user: {
      login: 'bottd',
    },
    commits_url: 'example.com/commits/1',
    comments_url: 'example.com/comments/1',
    title: 'A Pull Request',
    extraKey: 'Should be thrown out',
  },
  {
    user: {
      login: 'bottd',
    },
    commits_url: 'example.com/commits/2',
    comments_url: 'example.com/comments/2',
    title: 'Another Pull Request',
    extraKey: 'Should be thrown out',
  },
]

describe('utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('fetchAllPulls', () => {
    it('Should call getPulls with the base url and next urls', async () => {
      const expected = `https://api.github.com/repos/bottd/pr-tracker/pulls?state=open&access_token=${token}`;
      const expectedNext = 'https://example.com/repo?page=2'
      await utils.fetchAllPulls('bottd', 'pr-tracker');
      expect(API.getPulls).toHaveBeenCalledWith(expected);
      expect(API.getPulls).toHaveBeenCalledWith(expectedNext);

    });
    it('Should return all pulls in one array', async () => {
      const results = await utils.fetchAllPulls('bottd', 'pr-tracker');
      expect(results).toMatchSnapshot();
    });
  });
  describe('cleanPulls', () => {
    it('Should call getData with the commits and comments urls', async () => {
      await utils.cleanPulls(mockPulls);
      expect(API.getData).toHaveBeenCalledWith('example.com/commits/1');
      expect(API.getData).toHaveBeenCalledWith('example.com/comments/1');
      expect(API.getData).toHaveBeenCalledWith('example.com/commits/2');
      expect(API.getData).toHaveBeenCalledWith('example.com/comments/2');
    });
    it('Should remove unwanted keys from data', async () => {
      const results = await utils.cleanPulls(mockPulls);
      expect(results[0].extraKey).toBe(undefined);
    });
  });
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
