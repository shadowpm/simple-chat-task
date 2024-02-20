import { type FormEvent, useContext, useState } from "react";
import "./styles.css";
import { StateContext } from "../../../state/createStateContext";
import { sendMessage } from "../../../services/sendMessage";
import { createSentMessage } from "../../../state/actionCreators";
import { scrollToBottom } from "../../../utilities/scrollToBottom";

const FixedInput: React.FC = () => {
  const { dispatch, state } = useContext(StateContext);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim()) {
      const sentMessage = await sendMessage({
        message: message.trim(),
        author: state.username,
      });
      dispatch(createSentMessage(sentMessage));
      setMessage("");
      scrollToBottom();
    }
  };

  return (
    <div className="fixed-form-container">
      <form
        onSubmit={handleSubmit}
        data-testid="messageForm"
        className="fixed-form"
      >
        <label className="visually-hidden">Message:</label>
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="messsage-field"
          placeholder="Message"
        />
        <input className="submit-button" type="submit" value="Send" />
      </form>
    </div>
  );
};

export default FixedInput;
