import { ChangeEvent, FormEvent } from "react";
import "./styles.css";

interface Props {
  enteredMessage: string;
  setEnteredMessage: (value: ChangeEvent<HTMLInputElement>) => void;
  onSend: (event: FormEvent<HTMLFormElement>) => void;
}

const FixedInput: React.FC<Props> = ({
  enteredMessage,
  setEnteredMessage,
  onSend,
}) => {
  return (
    <div className="form-container">
      <form onSubmit={onSend} data-testid="messageForm">
        <label className="visually-hidden">Message:</label>
        <input
          value={enteredMessage}
          onChange={setEnteredMessage}
          className="messsage-field"
          placeholder="Message"
        />
        <input className="submit-button" type="submit" value="Send" />
      </form>
    </div>
  );
};

export default FixedInput;
