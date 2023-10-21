import request from '@/utils/http/request'
import { ParamsType } from '../types/test'
import { TableList } from '../types/baseModel'
export const testFn = (params: ParamsType) => request.get<TableList>('/api/test', params)

export const testPost = (params: ParamsType) => request.post('/api/set_post', params)

export const testPut = (params: ParamsType) => request.put('/api/set_put', params)

export const testDelete = (params: ParamsType) => request.delete('/api/set_delete', params)
