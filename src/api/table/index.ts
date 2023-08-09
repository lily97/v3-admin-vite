import request  from "@/utils/service"
import type * as Table from "./types/table"
import { T } from "vitest/dist/types-198fd1d9"

/** 增 */
export function createTableDataApi(data: Table.CreateTableRequestData) {
  return request({
    url: "table",
    method: "post",
    data
  })
}

/** 删 */
export function deleteTableDataApi(id: string) {
  return request({
    url: `table/${id}`,
    method: "delete"
  })
}

/** 改 */
export function updateTableDataApi(data: Table.UpdateTableRequestData) {
  return request({
    url: "table",
    method: "put",
    data
  })
}

/** 查 */
export function getTableDataApi(params: Table.GetTableRequestData) {
  return request<Table.GetTableResponseData>({
    url: "table",
    method: "get",
    params
  })
}

export function getUserListApi(params:object) {
  return request({
    url: "/user/getUserList",
    method: "get",
    params
  })
}
