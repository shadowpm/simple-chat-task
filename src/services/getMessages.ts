import { token } from "../configs";
import { Message } from "../types/message";

export const getMessages = async (
  since?: number,
  limit?: number,
): Promise<Message[]> => {
  let url = `https://chatty.doodle-test.com/api/chatty/v1.0/?token=${token}`;
  if (since !== undefined) {
    url += `&since=${since}`;
  }
  if (limit !== undefined) {
    url += `&limit=${limit}`;
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
