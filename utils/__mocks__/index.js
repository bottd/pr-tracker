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

const cleanPulls = jest.fn(() => ['pull1', 'pull2']);
const fetchAllPulls = jest.fn(() => mockPulls);
const parseLinks = jest.fn();

module.exports = { cleanPulls, fetchAllPulls, parseLinks };
