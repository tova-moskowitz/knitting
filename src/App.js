import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserProjects, setCurrentUserProjects] = useState({});

  const fetchData = async () => {
    const username = "C917BD7916D242A48F48";
    const password = "T1hqLexGYuxXPMdr-vSvxx3dTmjVrHMqHT5MEOfq";
    const ravUserName = "GoodRebecca";

    const options = {
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
    };

    const users = await fetch(
      "https://api.ravelry.com/current_user.json",
      options
    );
    const usersJSON = await users.json();

    const projects = await fetch(
      `https://api.ravelry.com/projects/${ravUserName}/list.json`,
      options
    );
    const projectsJSON = await projects.json();

    await Promise.all([usersJSON, projectsJSON]);
    setCurrentUser(usersJSON.user);
    setCurrentUserProjects(projectsJSON.projects);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatData = () => {
    return currentUserProjects.map((project) => {
      return (
        <>
          <h1>
            <a href={project.links.self.href} target="_blank">
              {project.name}
            </a>
          </h1>
          <img src={project?.first_photo?.small_url} />
        </>
      );
    });
  };
  const { username, large_photo_url } = currentUser;

  return (
    <div className="App">
      {username}
      <img src={large_photo_url} />
      {Object.keys(currentUser).length && formatData()}
    </div>
  );
}

export default App;
