import React, { useState, useEffect } from "react";
import Project from "./Project";
import "../App.css";

function InProgressProjects({ projects }) {
  return (
    <ul className="projects-list">
      {projects.map((project) => (
        <Project project={project} key={project.id} />
      ))}
    </ul>
  );
}

export default InProgressProjects;
