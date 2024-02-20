import { useMemo, useReducer, useEffect } from "react";
import MessageBox from "./components/ui/message-box/MessageBox";
import FixedInput from "./components/fixed-input/FixedInput";
import { StateContext } from "./state/createStateContext";
import "./App.css";
import { initialState, reducer } from "./state/state";
import { usePeriodicMessageReceiver } from "./hooks/usePeriodicMessageReceiver";
import UserForm from "./components/user-form/UserForm";
import { scrollToBottom } from "./utilities/scrollToBottom";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const stateValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  usePeriodicMessageReceiver(stateValue);

  useEffect(() => {
    scrollToBottom();
  }, [state.messages?.length, state.sentMessages.length]);

  return (
    <StateContext.Provider value={stateValue}>
      {state.username === "" ? (
        <UserForm />
      ) : (
        <div>
          <div className="chat-container">
            {state.messages === undefined &&
              "Your messages are loading in ~5 seconds, Please wait"}
            {state.messages?.map((message) => (
              <MessageBox
                key={message._id}
                message={message.message}
                senderName={message.author}
                dateAndTime={message.timestamp.toString()}
                isAdminMessage={
                  message.author.toLocaleLowerCase() ===
                  state.username.toLocaleLowerCase()
                }
              />
            ))}
            {state.sentMessages.map((message) => (
              <MessageBox
                key={message._id}
                message={message.message}
                senderName={message.author}
                dateAndTime={message.timestamp.toString()}
                isAdminMessage={
                  message.author.toLocaleLowerCase() ===
                  state.username.toLocaleLowerCase()
                }
              />
            ))}
          </div>
          {state.messages !== undefined && <FixedInput />}
        </div>
      )}
    </StateContext.Provider>
  );
}

export default App;
