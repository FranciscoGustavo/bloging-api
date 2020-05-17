/* eslint-disable no-undef */
const testServer = require('../utils/mocks/testServer');
const { serviceMock, PostsMock } = require('../utils/mocks/postsMock');
const controller = require('../components/posts/controller')(serviceMock);
const router = require('../components/posts/router');


describe('router - posts', () => {
  const request = testServer(router, controller);

  describe('GET /api/posts', () => {
    const query = { limit: 10, sort: '-_id', page: 1 };
    test('should response with status code 200', (done) => {
      request
        .get('/api/posts')
        .query(query)
        .expect(200, done);
    });

    test('should response with a list of posts', (done) => {
      request
        .get('/api/posts')
        .query(query)
        .end((err, res) => {
          expect(res.body).toEqual({
            error: false,
            message: 'posts listed',
            status: 200,
            body: {
              post: PostsMock,
              pagination: {
                totalPosts: PostsMock.length,
                totalPages: 1,
                page: 1,
              },
            },
          });
          done();
        });
    });

    test('should response with a empty object', (done) => {
      request
        .get('/api/posts')
        .end((err, res) => {
          expect(res.body).toEqual({});
          done();
        });
    });
  });

  describe('GET /api/posts/:slug', () => {
    const { slug } = PostsMock[0];
    test('should response with status code 200', (done) => {
      request
        .get(`/api/posts/${slug}`)
        .expect(200, done);
    });

    test('should response with a list of posts', (done) => {
      request
        .get(`/api/posts/${slug}`)
        .end((err, res) => {
          expect(res.body).toEqual({
            error: false,
            message: 'post retrieved',
            status: 200,
            body: PostsMock[0],
          });
          done();
        });
    });

    test('should response with a empty object', (done) => {
      request
        .get('/api/posts/error')
        .end((err, res) => {
          expect(res.body).toEqual({});
          done();
        });
    });
  });
});
