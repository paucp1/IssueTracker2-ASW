import { useState, useEffect } from "react";
import React from 'react'
import '../assets/css/registerStyle.css';
import { useParams } from 'react-router-dom';
import { ProfileReadOnly } from '../components/ProfileUserReadOnly.js';


export const ProfileView = () => {
    const apiUrl = 'https://issuetracker2-asw.herokuapp.com'; 
    const { id } = useParams();
    const apiGetBioImageProfileUrl = `${apiUrl}/users/${id}/`;
    const apiUserUrl = `${apiUrl}/users/user/${id}/`;
    const [apiResponseUser, setApiResponseUser] = useState('');
    const [apiResponseProfile, setApiResponseProfile] = useState('');

    useEffect(() => {
      const token = localStorage.getItem('token'); // Obtener el token del local storage

        const fetchData = async () => {
          try {
            const headers = {
              Authorization: `Token ${token}`, // Incluir el token en el encabezado
              'Content-Type': 'application/json'
            };
        
            const responseUser = await fetch(apiUserUrl, {
              method: 'GET',
              headers,
            });
            const responseDataUser = await responseUser.json();
    
            const responseBio = await fetch(apiGetBioImageProfileUrl, {
              method: 'GET',
              headers,
            });

            const responseDataBio = await responseBio.json();
    
            setApiResponseProfile(responseDataBio);
            setApiResponseUser(responseDataUser);
    
          } catch (error) {
            console.error('Error:', error);
          }
        };
    
        fetchData();
    }, []);

              
    return (
        <div>
            <ProfileReadOnly
              username={apiResponseUser.username}
              email={apiResponseUser.email}
              first_name={apiResponseUser.first_name}
              last_name={apiResponseUser.last_name}
              bio={apiResponseProfile.bio}
              url={apiResponseProfile.url}>
              </ProfileReadOnly>
        </div>
    );
};
  