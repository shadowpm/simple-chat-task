import { getMessages } from "../services/getMessages";
import { messageLimit, reloadMessagesInterval } from "../configs";
import { ActionType } from "../state/actionTypes";
import { useEffect } from "react";
import { State } from "../state/state";
import { createReceivedMessages } from "../state/actionCreators";
import { scrollToBottom } from "../utilities/scrollToBottom";

export const getMessagesPeriodically = async (
  lastMessageTimestamp: number,
  dispatch: React.Dispatch<ActionType>,
) => {
  console.log('gt messages', lastMessageTimestamp)
  const messages =
    lastMessageTimestamp === 0
      ? await getMessages()
      : await getMessages(lastMessageTimestamp, Number(messageLimit));
  if (messages.length > 0) {
    scrollToBottom();
  }
  dispatch(createReceivedMessages(messages));
};

export const usePeriodicMessageReceiver = (stateValue: {
  dispatch: React.Dispatch<ActionType>;
  state: State;
}) => {
  console.log('in hook')
  useEffect(() => {
    console.log('setinterval')
    const interval = setInterval(
      () =>
        getMessagesPeriodically(
          stateValue.state.lastReceivedMessageTimestamp,
          stateValue.dispatch,
        ),
      Number(reloadMessagesInterval),
    );

    return () => {
      console.log('clear')
      clearInterval(interval);
    }
  }, [stateValue.state.lastReceivedMessageTimestamp, stateValue.dispatch]);
};
