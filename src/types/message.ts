export type Message = {
  _id: string;
  message: string;
  author: string;
  timestamp: number;
  token: string;
};

export type MessageBody = Pick<Message, "message" | "author">;
