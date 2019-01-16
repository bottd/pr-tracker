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

const getPulls = jest
  .fn(() => ({
    links: '<https://example.com/repo?page=2>; rel="last"',
    pulls: mockPulls,
  }))
  .mockImplementationOnce(() => ({
    links: mockLinks,
    pulls: mockPulls,
  }))
  .mockImplementationOnce(() => ({
    links: '<https://example.com/repo?page=2>; rel="last"',
    pulls: mockPulls,
  }));

const getData = jest.fn().mockImplementation(() => mockPulls);

module.exports = { getData, getPulls };
