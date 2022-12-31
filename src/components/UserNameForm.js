import React, { useState } from "react";
import "../App.css";

function UserNameForm(props) {
  const { handleClick } = props;
  const [ravUserName, setRavUserName] = useState("");

  const handleChange = (e) => {
    setRavUserName(e.target.value);
  };

  return (
    <>
      <label>Look up a Ravelry User </label>
      <input
        type="text"
        name="ravelry-user-name"
        value={ravUserName}
        onChange={handleChange}
      />
      <button
        onClick={() => {
          handleClick(ravUserName);
        }}
      >
        Search for User
      </button>
    </>
  );
}

export default UserNameForm;
