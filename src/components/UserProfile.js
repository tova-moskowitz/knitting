import React, { useState, useEffect } from "react";
import "../App.css";

function UserProfile({ currentUser }) {
  const {
    username,
    large_photo_url,
    first_name,
    location,
    about_me,
    fave_curse,
  } = currentUser;

  return (
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
  );
}

export default UserProfile;
