import React from 'react';
import '../assets/css/ProfileStyle.css';

export const ProfileReadOnly = (props) => {
  const { username, email, first_name, last_name, bio, url } = props;
  console.log(props);

  return (
    <section className="main user-profile">
      <h1>Profile</h1>
      <fieldset>
        <label htmlFor="image">Profile picture:</label>
        <img className="profile-pic" src={url} alt="Profile Picture" /><br />
      </fieldset>

      <fieldset>
        <label htmlFor="username" className="black-label">Username:</label>
        <input type="text" name="username" value={username} readOnly />
      </fieldset>

      <fieldset>
        <label htmlFor="email" className="black-label">Email:</label>
        <input type="text" name="email" value={email} readOnly />
      </fieldset>

      <fieldset>
        <label htmlFor="first_name" className="black-label">First name:</label>
        <input type="text" name="first_name" value={first_name} readOnly />
      </fieldset>

      <fieldset>
        <label htmlFor="last_name" className="black-label">Last name:</label>
        <input type="text" name="last_name" value={last_name} readOnly />
      </fieldset>

      <fieldset>
        <label htmlFor="bio" className="black-label">Bio (max. 500 characters):</label>
        <textarea name="bio" id="bio" placeholder="Tell us something about you" value={bio} readOnly></textarea>
      </fieldset>
    </section>
  );
};
