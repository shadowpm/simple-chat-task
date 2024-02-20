import type { Message } from "../types/message";

export type ActionType =
  | { type: "SET_USERNAME"; payload: string }
  | { type: "MESSAGE_SENT"; payload: Message }
  | { type: "RECEIVE_MESSAGES"; payload: Message[] }
  | { type: "INIT_MESSAGES"; payload: { projectId: number; deviceId: number } };
