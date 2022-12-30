import { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
import "../App.css";

function UserNameForm(props) {
  const { handleClick } = props;
  const [ravUserName, setRavUserName] = useState("");

  const handleChange = (e) => {
    setRavUserName(e.target.value);
  };

  const internalClickHandler = () => {
    handleClick(ravUserName);
  };
  return (
    <>
      <label>Look up a Ravelry User</label>
      <input
        type="text"
        name="ravelry-user-name"
        value={ravUserName}
        onChange={handleChange}
      />
      <button onClick={internalClickHandler}>Search for User</button>
    </>
  );
}

export default UserNameForm;
