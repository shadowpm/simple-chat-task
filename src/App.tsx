import { useMemo, useReducer } from "react";
import MessageBox from "./components/ui/message-box/MessageBox";
import FixedInput from "./components/ui/fixed-input/FixedInput";
import { StateContext } from "./state/createStateContext";
import "./App.css";
import { initialState, reducer } from "./state/state";
import { usePeriodicMessageReceiver } from "./hooks/usePeriodicMessageReceiver";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const stateValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  usePeriodicMessageReceiver(stateValue);
  return (
    <StateContext.Provider value={stateValue}>
      <div>
        <div className="chat-container">
          {state.messages === undefined && "Your messages are loading in ~5 seconds, Please wait"}
          {state.messages?.map((message) => (
            <MessageBox
              key={message._id}
              message={message.message}
              senderName={message.author}
              dateAndTime={message.timestamp.toString()}
              isAdminMessage={message.author === "Alice"}
            />
          ))}
          {state.sentMessages.map((message) => (
            <MessageBox
              key={message._id}
              message={message.message}
              senderName={message.author}
              dateAndTime={message.timestamp.toString()}
              isAdminMessage={message.author === "Alice"}
            />
          ))}
        </div>
        {state.messages !== undefined &&
          <FixedInput />}
      </div>
    </StateContext.Provider>
  );
}

export default App;
