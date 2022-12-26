import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserProjects, setCurrentUserProjects] = useState({});
  const {
    username,
    large_photo_url,
    first_name,
    location,
    about_me,
    fave_curse,
  } = currentUser;

  const fetchData = async () => {
    const username = "C917BD7916D242A48F48";
    const password = "T1hqLexGYuxXPMdr-vSvxx3dTmjVrHMqHT5MEOfq";
    const ravUserName = "goodrebecca";
    // const ravUserName = "sockdiva";
    // const ravUserName = "yarnzilla";
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="user-info">
        <h1>{username}</h1>
        <p className="user-first-name">{first_name}</p>
        <div className="user-details">
          <img src={large_photo_url} />
          <div className="inner-details">
            <p>
              <span>Location:</span> {location}
            </p>
            <p>
              <span>About Me:</span> {about_me}
            </p>
            <p>
              <span>Favorite Curse:</span> {fave_curse}
            </p>
          </div>
        </div>
      </div>
      <ul className="projects-list">
        {Object.keys(currentUser).length &&
          currentUserProjects.length &&
          currentUserProjects.map((project) => {
            return (
              <>
                {/* {
                  <li className={`single-project id-${project.id}`}>
                    <a
                      className="link"
                      href={project.links.self.href}
                      target="_blank"
                    >
                      {project.name}
                    </a>
                    <img
                      className="project-photo"
                      src={project?.first_photo?.small_url}
                      alt={project.name}
                    />
                  </li>
                } */}
              </>
            );
          })}
      </ul>
    </div>
  );
}

export default App;
