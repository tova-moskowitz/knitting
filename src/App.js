import React, { useState, useEffect } from "react";
import UserNameForm from "./components/UserNameForm";
import CompletedProjects from "./components/CompletedProjects";
import InProgressProjects from "./components/InProgressProjects";
import HibernatingProjects from "./components/HibernatingProjects";
import FroggedProjects from "./components/FroggedProjects";
import "./App.css";
import UserProfile from "./components/UserProfile";

function App() {
  const [dataReady, setDataReady] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserProjects, setCurrentUserProjects] = useState({
    inProgress: [],
    finished: [],
    frogged: [],
    hibernating: [],
  });

  //create function that will use reduce to separate API data into 4 differerent statuses

  const reshapeRawAPIData = (apiData) => {
    const statuses = {
      IN_PROGRESS: "In progress",
      FINISHED: "Finished",
      FROGGED: "Frogged",
      HIBERNATING: "Hibernating",
    };

    const initialValue = {
      inProgress: [],
      finished: [],
      frogged: [],
      hibernating: [],
    };

    const reshapedData = apiData.projects.reduce(
      (accumulator, currentValue) => {
        if (currentValue.status_name === statuses.FROGGED) {
          accumulator.frogged.push(currentValue);
        }
        if (currentValue.status_name === statuses.HIBERNATING) {
          accumulator.hibernating.push(currentValue);
        }
        if (currentValue.status_name === statuses.IN_PROGRESS) {
          accumulator.inProgress.push(currentValue);
        }
        if (currentValue.status_name === statuses.FINISHED) {
          accumulator.finished.push(currentValue);
        }
        return accumulator;
      },

      initialValue
    );
    console.log(reshapedData);
    return reshapedData;
  };

  // the only place to know about the API logic
  // const reshapeRawAPIProjectList = (apiResponse) => {
  //   // update API shape to my own app shape
  //   const statuses = {
  //     FINISHED: "Finished",
  //     IN_PROGRESS: "In progress",
  //     FROGGED: "Frogged",
  //     HIBERNATING: "Hibernating",
  //   };

  //   //this is the accumulator
  //   const initialAccumulatorValue = {
  //     finished: [],
  //     inProgress: [],
  //     frogged: [],
  //     hibernating: [],
  //   };

  //   const filtered = apiResponse.reduce((allProjects, project) => {
  //     const { status_name } = project;
  //     const { HIBERNATING, IN_PROGRESS, FINISHED, FROGGED } = statuses;

  //     // const prunedProject = project.map((project) => {
  //     //   return {
  //     //     name: project.name,
  //     //     id: project.id,
  //     //   };
  //     // });

  //     if (status_name === FINISHED) {
  //       allProjects.finished.push(project);
  //     }

  //     if (status_name === IN_PROGRESS) {
  //       allProjects.inProgress.push(project);
  //     }

  //     if (status_name === FROGGED) {
  //       allProjects.frogged.push(project);
  //     }

  //     if (status_name === HIBERNATING) {
  //       allProjects.hibernating.push(project);
  //     }

  //     return allProjects;
  //   }, initialAccumulatorValue);

  //   return filtered;
  // };

  const handleClick = async (ravUserName) => {
    const username = process.env.REACT_APP_USERNAME;
    const password = process.env.REACT_APP_PASSWORD;

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
    // /projects/{id}.json

    const projects = await fetch(
      `https://api.ravelry.com/projects/${ravUserName}/list.json`,
      options
    );
    const projectsJSON = await projects.json();

    await Promise.all([userJSON, projectsJSON]);

    // const reshaped = reshapeRawAPIProjectList(projectsJSON.projects);
    const reshapedData = reshapeRawAPIData(projectsJSON);

    setCurrentUser(userJSON.user);
    setCurrentUserProjects(reshapedData);
    setDataReady(true);
  };

  return (
    <div className="App">
      <UserNameForm handleClick={handleClick} />
      <hr />

      <UserProfile currentUser={currentUser} />
      <h2>Recently Completed Projects</h2>
      <CompletedProjects projects={currentUserProjects.finished} />
      <h2>In Progress Projects</h2>
      <InProgressProjects projects={currentUserProjects.inProgress} />
      <h2>Hibernating Projects</h2>
      <HibernatingProjects projects={currentUserProjects.hibernating} />
      <h2>Frogged Projects</h2>
      <FroggedProjects projects={currentUserProjects.frogged} />
    </div>
  );
}

export default App;
