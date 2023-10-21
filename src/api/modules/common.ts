import request from '@/utils/http/request'
export const upload = (params: any) => request.post('/upload', params)
export const getDicts = (params: any) => request.get('/admin/dict/type/', params)
