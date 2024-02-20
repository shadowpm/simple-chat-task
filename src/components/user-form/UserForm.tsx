import "./styles.css";

interface Props {
  nameValue?: string;
  onChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

const UserForm: React.FC<Props> = ({ nameValue, onChangeName, onSubmit }) => {
  return (
    <div className="form-container">
      <form className="name-form" onSubmit={onSubmit}>
        <label>Please enter your name:</label>
        <input
          value={nameValue}
          onChange={onChangeName}
          placeholder="e.g. Lilly"
        />
        <input type="submit" value="Enter" />
      </form>
    </div>
  );
};

export default UserForm;
