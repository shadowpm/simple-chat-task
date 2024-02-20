import {
  createSentMessage,
  createReceivedMessages,
  createSetUsername,
} from "./actionCreators";

describe("Action Creators", () => {
  describe("createSentMessage", () => {
    it("should create an action for sending a message", () => {
      const message = {
        _id: "123",
        message: "Hello, World!",
        author: "john_doe",
        timestamp: Date.now(),
        token: "abc123",
      };
      const action = createSentMessage(message);
      expect(action.type).toBe("MESSAGE_SENT");
      expect(action.payload).toBe(message);
    });
  });

  describe("createReceivedMessages", () => {
    it("should create an action for receiving messages", () => {
      const messages = [
        {
          _id: "456",
          message: "Message 1",
          author: "alice",
          timestamp: 123456,
          token: "def456",
        },
        {
          _id: "789",
          message: "Message 2",
          author: "bob",
          timestamp: 789012,
          token: "ghi789",
        },
      ];
      const action = createReceivedMessages(messages);
      expect(action.type).toBe("RECEIVE_MESSAGES");
      expect(action.payload).toBe(messages);
    });
  });

  describe("createSetUsername", () => {
    it("should create an action for setting the username", () => {
      const username = "john_doe";
      const action = createSetUsername(username);
      expect(action.type).toBe("SET_USERNAME");
      expect(action.payload).toBe(username);
    });
  });
});
