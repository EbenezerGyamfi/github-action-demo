const request = require('supertest');
const app = require('./app');

describe('Story API', () => {
  test('GET /health should return ok', async () => {
    const response = await request(app).get('/health');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      story: 'ok'
    });
  });

  test('POST /story should reject empty text', async () => {
    const response = await request(app)
      .post('/story')
      .send({ text: '' });

    expect(response.statusCode).toBe(422);
    expect(response.body.message).toBe('Text must not be empty!');
  });

  test('GET /story should return story content', async () => {
    const response = await request(app).get('/story');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('story');
  });
});