import type { Message } from "../types/message";
import { ActionType } from "./actionTypes";
import { removeCommonObjectsById } from "../utilities/removeCommonObjectsById";

// import devices from '../mocked-data/device.json';
export type State = {
  lastReceivedMessageTimestamp: number;
  messages?: Message[];
  sentMessages: Message[];
  username: string;
};

export const initialState: State = {
  lastReceivedMessageTimestamp: 0,
  messages: undefined,
  sentMessages: [],
  username: "",
};

export const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "MESSAGE_SENT":
      return {
        ...state,
        sentMessages: [...state.sentMessages, action.payload],
      };
    case "RECEIVE_MESSAGES":
      const messages = [...(state.messages || []), ...action.payload];
      const lastReceivedMessageTimestamp =
        messages.length > 0 ? messages[messages.length - 1].timestamp : 0;
      const sentMessages = removeCommonObjectsById(
        action.payload,
        state.sentMessages,
      );
      return {
        ...state,
        messages,
        sentMessages,
        lastReceivedMessageTimestamp,
      };
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    default:
      return state;
  }
};
