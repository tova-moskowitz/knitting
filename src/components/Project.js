import { useState, useEffect } from "react";
import "../App.css";

function Project({ project }) {
  const {
    id,
    name,
    links,
    // links: {
    //   self: { href },
    // },
  } = project;

  const href = project?.links?.self?.href;

  return (
    <>
      {
        <li className={`single-project id-${id}`}>
          {href && (
            <a className="link" href={href} target="_blank">
              {name}
            </a>
          )}
          <img
            className="project-photo"
            src={project?.first_photo?.small_url}
            alt={name}
          />
        </li>
      }
    </>
  );
}
export default Project;
