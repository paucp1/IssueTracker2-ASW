import React from 'react'
import '../assets/css/userStyle.css'
import { useNavigate } from 'react-router-dom';


export const User = (props) => {
  const { id, image_url, username} = props;
  const navigate = useNavigate();


  const handleClick = () => {
    navigate(`/users/${id}`);  
  };

  console.log(props);
  return (
    <div class="user" onClick={handleClick}>
      <img class="image" src={image_url}/>
      <p class="username">{username}</p>
    </div>
  )
}
