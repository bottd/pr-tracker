const request = require('supertest');
const app = require('../server');
const utils = require('../utils');

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
jest.mock('../utils');

describe('Server', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('/api/:owner/:repo', () => {
    describe('GET', () => {
      it('Should call fetchAllPulls with given owner and repo', async () => {
        await request(app).get('/api/bottd/pr-tracker');
        expect(utils.fetchAllPulls).toHaveBeenCalledWith('bottd', 'pr-tracker');
      });
      it('Should pass the result of fetchData to cleanPulls', async () => {
        await request(app).get('/api/bottd/pr-tracker');
        expect(utils.cleanPulls).toHaveBeenCalledWith(mockPulls);
      });
      it('Should return the cleaned data in the response body', async () => {
        const expected = await utils.cleanPulls(mockPulls);
        const result = await request(app).get('/api/bottd/pr-tracker');
        expect(result.body).toEqual(expected);
      });
      it('Should return a status 500 on server errors', async () => {
        utils.fetchAllPulls.mockImplementation(() => Promise.reject('Server error'));
        const result = await request(app).get('/api/bottd/pr-tracker');
        expect(result.status).toBe(500);
      });
    });
  });
});
