import { Message } from "../types/message";
import { createReceivedMessages, createSentMessage } from "./actionCreators";
import { State, initialState, reducer } from "./state";

describe("Reducer Tests", () => {
  it("should handle MESSAGE_SENT action", () => {
    const message: Message = {
      _id: "1",
      message: "Hello",
      author: "John",
      timestamp: 1234567890,
      token: "yourToken",
    };

    const action = createSentMessage(message);
    const newState = reducer(initialState, action);

    expect(newState.sentMessages).toEqual([message]);
  });

  it("should handle RECEIVE_MESSAGES action", () => {
    const existingMessages: Message[] = [
      {
        _id: "1",
        message: "Hello",
        author: "John",
        timestamp: 1234567890,
        token: "yourToken1",
      },
    ];

    const newMessages: Message[] = [
      {
        _id: "2",
        message: "Hi",
        author: "Jane",
        timestamp: 1234567891,
        token: "yourToken2",
      },
    ];

    const action = createReceivedMessages(newMessages);
    const stateWithExistingMessages: State = {
      ...initialState,
      messages: existingMessages,
    };
    const newState = reducer(stateWithExistingMessages, action);

    expect(newState.messages).toEqual([...existingMessages, ...newMessages]);
    expect(newState.sentMessages).toEqual([]);
    expect(newState.lastReceivedMessageTimestamp).toEqual(
      newMessages[0].timestamp,
    );
  });
});
