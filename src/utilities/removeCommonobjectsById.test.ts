import { removeCommonObjectsById } from "./removeCommonObjectsById";
import type { Message } from "../types/message";

describe("removeCommonObjectsById", () => {
  const message1: Message = {
    _id: "1",
    message: "Hello",
    author: "User1",
    timestamp: Date.now(),
    token: "token1",
  };

  const message2: Message = {
    _id: "2",
    message: "Hi",
    author: "User2",
    timestamp: Date.now(),
    token: "token2",
  };

  const message3: Message = {
    _id: "3",
    message: "Hey",
    author: "User3",
    timestamp: Date.now(),
    token: "token3",
  };

  const messagesA: Message[] = [message1, message2];
  const messagesB: Message[] = [message2, message3];

  it("removes common objects based on _id", () => {
    const result = removeCommonObjectsById(messagesA, messagesB);
    expect(result).toEqual([message3]);
  });

  it("does not modify original arrays", () => {
    const originalMessagesA = [...messagesA];
    const originalMessagesB = [...messagesB];

    removeCommonObjectsById(messagesA, messagesB);

    // Ensure original arrays are not modified
    expect(messagesA).toEqual(originalMessagesA);
    expect(messagesB).toEqual(originalMessagesB);
  });
});
