import { getMessages } from "../services/getMessages";
import { messageLimit, reloadMessagesInterval } from "../configs";
import { ActionType } from "../state/actionTypes";
import { useEffect } from "react";
import { State } from "../state/state";
import { createReceivedMessages } from "../state/actionCreators";

export const getMessagesPeriodically = async (
  lastMessageTimestamp: number,
  dispatch: React.Dispatch<ActionType>,
) => {
  const messages =
    lastMessageTimestamp === 0
      ? await getMessages()
      : await getMessages(lastMessageTimestamp, Number(messageLimit));
  dispatch(createReceivedMessages(messages));
};

export const usePeriodicMessageReceiver = (stateValue: {
  dispatch: React.Dispatch<ActionType>;
  state: State;
}) => {
  useEffect(() => {
    const interval = setInterval(
      () =>
        getMessagesPeriodically(
          stateValue.state.lastReceivedMessageTimestamp,
          stateValue.dispatch,
        ),
      Number(reloadMessagesInterval),
    );

    return () => {
      clearInterval(interval);
    };
  }, [stateValue.state.lastReceivedMessageTimestamp, stateValue.dispatch]);
};
