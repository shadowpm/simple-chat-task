import { Message } from "../types/message";

export const mergeMessages = (messagesA: Message[], messagesB: Message[]) => {
  let i = 0;

  while (i < messagesB.length) {
    const current = messagesB[i];
    if (messagesA.some((message) => message._id === current._id)) {
      messagesB.splice(i, 1);
    } else {
      i++;
    }
  }

  return [...messagesA, ...messagesB];
};
