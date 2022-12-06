import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  const fetchData = async () => {
    const username = "C917BD7916D242A48F48";
    const password = "T1hqLexGYuxXPMdr-vSvxx3dTmjVrHMqHT5MEOfq";

    const options = {
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
    };
    const response = await fetch(
      "https://api.ravelry.com/current_user.json",
      options
    );
    const json = await response.json();
    setCurrentUser({ ...currentUser, ...json });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatData = () => {
    const { username, large_photo_url } = currentUser.user;
    return (
      <>
        <h1>{username}</h1> <img src={large_photo_url} alt="profile picture" />
      </>
    );
  };

  return (
    <div className="App">
      {Object.keys(currentUser).length && formatData(currentUser)}
    </div>
  );
}

export default App;
