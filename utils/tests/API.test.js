const API = require('../API');
const fetch = require('node-fetch');

const mockBody = [
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
];
const mockLinks = '<https://example.com/repo?page=2>; rel="next"';
const mockJson = jest.fn(() => Promise.resolve(mockBody));
const mockGetHeader = jest.fn(() => mockLinks);
jest.mock('node-fetch', () =>
  jest.fn(() => ({
    headers: {
      get: mockGetHeader,
    },
    json: mockJson,
  })),
);

describe('API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPulls', () => {
    const url = 'example.com';
    it('Should call fetch with given url', async () => {
      await API.getPulls(url);
      expect(fetch).toHaveBeenCalledWith(url);
    });
    it('Should call .json() on the response', async () => {
      await API.getPulls(url);
      expect(mockJson).toHaveBeenCalled();
    });
    it('Should get the link header from the response', async () => {
      await API.getPulls(url);
      expect(mockGetHeader).toHaveBeenCalledWith('link');
    });
    it('Shoul return links header and body in one object', async () => {
      const expected = { links: mockLinks, pulls: mockBody };
      const result = await API.getPulls(url);
      expect(result).toEqual(expected);
    });
  });

  describe('getData', () => {
    it('Should call fetch with given url', async () => {
      await API.getData('example.com');
      expect(fetch).toHaveBeenCalledWith('example.com');
    });
    it('Should return the .json() of the response', async () => {
      const result = await API.getData('example.com');
      expect(result).toEqual(mockBody);
    });
  });
});
