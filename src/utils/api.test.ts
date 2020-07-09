import { enableFetchMocks } from 'jest-fetch-mock';
import { Portfolio } from '../types';
import Api from './api';

enableFetchMocks();

const API_URL = '';
const api = new Api<Portfolio>(API_URL);

describe('Api', () => {
  it('should fetch a successful response from the Api', async () => {
    fetchMock.mockResponseOnce('{"res": "ok"}');
    const data = await api.fetch();
    expect(data).toEqual({ res: 'ok' });
  });

  it('should fetch a 404 response from the Api', async () => {
    fetchMock.mockResponseOnce('', { status: 404 });
    const data = await api.fetch();
    expect(data).toEqual({ error: 'Not Found' });
  });

  it('should return the reject error message when rejects', async () => {
    fetchMock.mockReject(new Error('fake error message'));
    const data = await api.fetch();
    expect(data).toEqual({ error: 'fake error message' });
  });
});
