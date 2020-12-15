import request from './request'

export const testApi = (name: string) => {
  return request({
    baseURL: 'https://api.diamond2221.com/DIAMOND',
    url: '/api/test',
    method: 'POST',
    data: {
      name
    }
  })
}
