import { useMemo, useReducer, useState, FormEvent } from "react";
import MessageBox from "./components/ui/message-box/MessageBox";
import FixedInput from "./components/ui/fixed-input/FixedInput";
import { StateContext } from "./state/createStateContext";
import "./App.css";
import { initialState, reducer } from "./state/state";
import { usePeriodicMessageReceiver } from "./hooks/usePeriodicMessageReceiver";
import UserForm from "./components/user-form/UserForm";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userName, setUserName] = useState("");
  const stateValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  usePeriodicMessageReceiver(stateValue);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userName.trim()) {
      dispatch({ type: "SET_USERNAME", payload: userName });
    }
  };

  return (
    <StateContext.Provider value={stateValue}>
      {state.username === "" ? (
        <UserForm
          nameValue={userName}
          onChangeName={(event) => setUserName(event.target.value)}
          onSubmit={handleSubmit}
        />
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
