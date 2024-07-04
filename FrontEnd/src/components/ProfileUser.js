import React from 'react';
import '../assets/css/ProfileStyle.css';
import { useState, useEffect } from "react";

export const Profile = (props) => {
  const { username, email, first_name, last_name, bio, url, changeImage, changeBio } = props;
  console.log(props);

  const [bioAux, setBio] = useState(bio);
  const [imageAux, setImage] = useState(url);
  const [imageAux2, setImage2] = useState(url);

  const handleChangeImage = () => {
    console.log("LA NUEVA IMAGEN ES " + imageAux2);
    changeImage(imageAux2);
  };

  const handleChangeBio = () => {
    changeBio(bioAux);
  };

  useEffect(() => {
    setBio(bioAux);
  }, [bioAux]);

  useEffect(() => {
    setImage(imageAux);
  }, [imageAux]);

  return (
    <section className="main user-profile">
      <h1>User configuration</h1>
      <fieldset>
        <label htmlFor="image">Profile picture:</label>
        <img className="profile-pic" src={imageAux} alt="Profile Picture" /><br />
        <input type="file" name="image" 
            onChange={(e) => {
                setImage(URL.createObjectURL(e.target.files[0]))
                setImage2(e.target.files[0])
                }
            }
        />
            
        <button onClick={handleChangeImage} className="btn-small change-photo-btn">Change photo</button>
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
        <textarea name="bio" id="bio" placeholder="Tell us something about you" onChange={(e) => setBio(e.target.value)} value={bioAux}></textarea>
      </fieldset>

      {/* Render messages here */}
      {/* {messages.map((message, index) => (
        <div className="messages" key={index}>
          {message}
        </div>
      ))} */}

      <button onClick={handleChangeBio} className="btn-small change-photo-btn">Save changes</button>
    </section>
  );
};
