/**
 * Operations for array manipulation
 */
export enum ArrayManipulation {
  columnAfter = "columnAfter",
  columnBefore = "columnBefore",
  rowAfter = "rowAfter",
  rowBefore = "rowBefore",
}

/**
 * Operations for whether a new row or column
 * is added at the start/before or end/after of an array
 */
export enum ArrayOperation {
  before = "before",
  after = "after",
}

/**
 * SHARED DATA TYPES BETWEEN FRONTEND AND SERVER
 */
// TODO: Find a way to share these types bt frontend and backend
export enum WSMessageType {
  request_sync_grid = "request_sync_grid", // [UI]
  send_sync_grid = "send_sync_grid", // [ESP32]
  led_pattern = "led_pattern", // [UI]
  pressure_data = "pressure_data", // [ESP32]
}

export interface WSMessageObject {
  type: WSMessageType;
  data: Object;
}
