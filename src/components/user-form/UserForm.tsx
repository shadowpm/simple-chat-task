import { type FormEvent, useContext, useState } from "react";
import "./styles.css";
import { StateContext } from "../../state/createStateContext";
import { createSetUsername } from "../../state/actionCreators";

const UserForm: React.FC = () => {
  const [userName, setUserName] = useState("");
  const { dispatch } = useContext(StateContext);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userName.trim()) {
      dispatch(createSetUsername(userName.trim()));
    }
  };

  return (
    <div className="form-container">
      <form className="name-form" onSubmit={handleSubmit}>
        <label>Please enter your name:</label>
        <input
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          placeholder="e.g. Lilly"
        />
        <input type="submit" value="Enter" />
      </form>
    </div>
  );
};

export default UserForm;
