const API = require('../API');
const utils = require('../utils');
const fetch = require('node-fetch');

const mockLinks = '<https://example.com/repo?page=2>; rel="next"';
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
];
const mockJson = jest.fn(() => Promise.resolve(mockPulls));
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
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });
  describe('cleanPulls', () => {
    it('Should call fetch each commit and comment url', async () => {
      await API.cleanPulls(mockPulls);
      expect(fetch).toHaveBeenCalledWith('example.com/commits/1');
      expect(fetch).toHaveBeenCalledWith('example.com/comments/1');
      expect(fetch).toHaveBeenCalledWith('example.com/commits/2');
      expect(fetch).toHaveBeenCalledWith('example.com/comments/2');
    });
    it('Should map the pulls to include only needed data', async () => {
      const expected = [
        {
          author: 'bottd',
          commit_count: 2,
          comment_count: 2,
          title: 'A Pull Request',
        },
        {
          author: 'bottd',
          commit_count: 2,
          comment_count: 2,
          title: 'Another Pull Request',
        },
      ];
      const pulls = await API.cleanPulls(mockPulls);
      expect(pulls).toEqual(expected);
    });
  });
  describe('fetchPulls', () => {
    it('Should call fetch with given url', async () => {
      await API.fetchPulls('example.com');
      expect(fetch).toHaveBeenCalledWith('example.com');
    });
    it('Should call .json() of the response', async () => {
      await API.fetchPulls('example.com');
      expect(mockJson).toHaveBeenCalled();
    });
    it('Should get the links header from the response', async () => {
      await API.fetchPulls('example.com');
      expect(mockGetHeader).toHaveBeenCalledWith('link');
    });
    it('Should return the parsed links and pulls in one object', async () => {
      const pulls = await API.cleanPulls(mockPulls);
      const expected = { links: utils.parseLinks(mockLinks), pulls };
      const result = await API.fetchPulls('example.com');
      expect(result).toEqual(expected);
    });
  });
  describe('getData', () => {
    it('Should call fetch with given url', async () => {
      await API.getData('example.com');
      expect(fetch).toHaveBeenCalledWith('example.com');
    });
    it('Should return the .json() of the response', async () => {
      await API.getData('example.com');
      expect(mockJson).toHaveBeenCalled();
    });
  });
});
