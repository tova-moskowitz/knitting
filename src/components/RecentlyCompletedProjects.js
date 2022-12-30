import { useState, useEffect } from "react";
import Project from "./Project";
import "../App.css";

function RecentlyCompletedProjects({ currentUserProjects }) {
  // const froggedProjects = [];

  // currentUserProjects.forEach((project) => {
  //   // console.log(`${project.status_name} => ${project.name}`);
  //   project.status_name === "Frogged" &&
  //     froggedProjects.push(<Project project={project} />);
  // });

  // return froggedProjects.map((frogged) => {
  //   return frogged;
  // });

  return (
    <ul className="projects-list">
      {currentUserProjects.map((project) => (
        <Project project={project} />
      ))}
    </ul>
  );
}

export default RecentlyCompletedProjects;
