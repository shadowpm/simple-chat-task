import type { Message } from "../types/message";

export const removeCommonObjectsById = (
  messagesA: Message[],
  messagesB: Message[],
): Message[] => {
  const idsInA = new Set(messagesA.map((obj) => obj._id));

  return messagesB.filter((obj) => !idsInA.has(obj._id));
};
