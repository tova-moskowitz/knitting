import { useState, useEffect } from "react";
import UserNameForm from "./components/UserNameForm";
import RecentlyCompletedProjects from "./components/RecentlyCompletedProjects";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserProjects, setCurrentUserProjects] = useState([]);

  const handleClick = async (ravUserName) => {
    // const ravUserName = "goodrebecca";
    // const ravUserName = "yarnzilla";
    // const ravUserName = "sockdiva";
    // const ravUserName = "pattiecakes";
    const options = {
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
    };

    const user = await fetch(
      `https://api.ravelry.com/people/${ravUserName}.json`,
      options
    );
    const userJSON = await user.json();

    // /current_user.json
    // const users = await fetch(
    //   "https://api.ravelry.com/current_user.json",
    //   options
    // );
    // const usersJSON = await users.json();

    // /projects/{id}.json}
    const projects = await fetch(
      `https://api.ravelry.com/projects/${ravUserName}/list.json`,
      options
    );
    const projectsJSON = await projects.json();

    await Promise.all([userJSON, projectsJSON]);
    setCurrentUser(userJSON.user);
    setCurrentUserProjects(projectsJSON.projects);
  };

  const {
    username,
    large_photo_url,
    first_name,
    location,
    about_me,
    fave_curse,
  } = currentUser;

  return (
    <div className="App">
      <UserNameForm handleClick={handleClick} />

      <div className="user-info">
        <h1>{username}</h1>
        <p className="user-first-name">{first_name}</p>
        <div className="user-details">
          <img src={large_photo_url} />
          <div className="inner-details">
            {location && (
              <p>
                <span>Location: </span>
                {location}
              </p>
            )}

            {about_me && (
              <p>
                <span>About Me: </span>
                {about_me}
              </p>
            )}

            {fave_curse && (
              <p>
                <span>Favorite Curse: </span>
                {fave_curse}
              </p>
            )}
          </div>
        </div>
      </div>
      <hr />
      <h2>Recently Completed Projects</h2>
      <RecentlyCompletedProjects currentUserProjects={currentUserProjects} />
    </div>
  );
}

export default App;
