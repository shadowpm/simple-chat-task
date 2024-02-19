import {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  useCallback,
} from "react";
import { Message } from "../types/message";
import { mergeMessages } from "../utilities/mergeMessages";
import { getMessages } from "../services/getMessages";
import { messageLimit, reloadMessagesInterval } from "../configs";
import { sendMessage } from "../services/sendMessage";

interface AppState {
  newMessage: string;
  allMessages: Message[];
  lastMessageIndex: number;
}

export const useCustomState = () => {
  const [state, setState] = useState<AppState>({
    newMessage: "",
    allMessages: [],
    lastMessageIndex: -1,
  });

  const { newMessage, allMessages, lastMessageIndex } = state;

  const SET_NEW_MESSAGE = "SET_NEW_MESSAGE";
  const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";

  const dispatch = (action: { type: string; payload?: any }) => {
    switch (action.type) {
      case SET_NEW_MESSAGE:
        setState((prevState) => ({
          ...prevState,
          newMessage: action.payload,
        }));
        break;
      case RECEIVE_MESSAGES:
        const { newMessages } = action.payload;
        const originalPart = allMessages.slice(0, lastMessageIndex + 1);
        const remaining = allMessages.slice(
          lastMessageIndex + 1,
          allMessages.length,
        );
        const mergedMessages = mergeMessages(newMessages, remaining);
        setState((prevState) => ({
          ...prevState,
          allMessages: [...originalPart, ...mergedMessages],
          lastMessageIndex: originalPart.length + newMessages.length - 1,
        }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMessages();
        dispatch({
          type: RECEIVE_MESSAGES,
          payload: { messageTimestamp: 0, newMessages: response },
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const getMessagesPeriodically = useCallback(async () => {
    const messageTimestamp =
      lastMessageIndex > -1 ? allMessages[lastMessageIndex].timestamp : 0;
    const newMessages = await getMessages(
      messageTimestamp,
      Number(messageLimit),
    );
    dispatch({
      type: RECEIVE_MESSAGES,
      payload: { messageTimestamp, newMessages },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMessages, lastMessageIndex]);

  useEffect(() => {
    const interval = setInterval(
      getMessagesPeriodically,
      Number(reloadMessagesInterval),
    );

    return () => clearInterval(interval);
  }, [getMessagesPeriodically]);

  const handleSendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    try {
      const message = await sendMessage({
        message: newMessage,
        author: "Alice",
      });
      dispatch({
        type: RECEIVE_MESSAGES,
        payload: { messageTimestamp: 0, newMessages: [message] },
      });
      dispatch({ type: SET_NEW_MESSAGE, payload: "" });

      scrollToBottom();
    } catch (error) {
      console.error(error);
    }
  };

  const setEnteredMessage = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch({ type: SET_NEW_MESSAGE, payload: value });
  };

  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  return {
    newMessage,
    allMessages,
    lastMessageIndex,
    setEnteredMessage,
    handleSendMessage,
  };
};
