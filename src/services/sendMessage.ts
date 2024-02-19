import { Message, MessageBody } from "../types/message";
import { token } from "../configs";

export const sendMessage = async (data: MessageBody): Promise<Message> => {
  try {
    const response = await fetch(
      "https://chatty.doodle-test.com/api/chatty/v1.0",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      },
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};
