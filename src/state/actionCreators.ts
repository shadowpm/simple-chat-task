import { Message } from "../types/message";
import { ActionType } from "./actionTypes";

export const createSentMessage = (message: Message): ActionType => ({
  type: "MESSAGE_SENT",
  payload: message,
});
export const createReceivedMessages = (messages: Message[]): ActionType => ({
  type: "RECEIVE_MESSAGES",
  payload: messages,
});
