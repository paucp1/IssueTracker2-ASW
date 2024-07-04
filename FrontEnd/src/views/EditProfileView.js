import { useRef, useState, useEffect } from "react";
import React from 'react'
import '../assets/css/registerStyle.css';
import { Link } from 'react-router-dom'
import { Profile } from '../components/ProfileUser.js';


export const EditProfileView = () => {
    const apiUrl = 'https://issuetracker2-asw.herokuapp.com'; 
    const apiGetBioImageProfileUrl = apiUrl+'/users/profile/';
    const apiUserUrl = apiUrl+'/users/edit-user-profile/';
    const apiChangeBioProfileUrl = apiUrl+'/users/change-bio-profile/';
    const apiChangeImageProfileUrl = apiUrl+'/users/change-picture-profile/';

    const [apiResponse, setApiResponse] = useState('');

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
    
            setApiResponse({
              user: responseDataUser.user,
              profile: responseDataBio.profile,
            });
    
            console.log(responseDataUser);
            console.log(responseDataBio);
          } catch (error) {
            console.error('Error:', error);
          }
        };
    
        fetchData();
    }, []);

    const changeBioProfile = async (bio) => {
        try {    
          const token = localStorage.getItem('token'); // Obtener el token del local storage

          const headers = {
            Authorization: `Token ${token}`, // Incluir el token en el encabezado
            'Content-Type': 'application/json'
          };
          const data = {
            'bio': bio,
          };
    
          const response = await fetch(apiChangeBioProfileUrl, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data)
          });
          console.log("BIO:  "+bio)
            if (response.ok) {
                console.log('Bio del usuario actualizada');

            } else {
                console.log('Error al cambiar la bio del usuario');
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const changeImageProfile = async (url) => {
      try {
        const token = localStorage.getItem('token'); // Obtener el token del local storage

        const headers = {
          Authorization: `Token ${token}`, // Incluir el token en el encabezado
        };

        const cacheBuster = Date.now(); // Generate a unique value for cache busting
      
        const formData = new FormData();
        formData.append('image', url);
    
        const urlWithCacheBuster = `${apiChangeImageProfileUrl}?cache=${cacheBuster}`;

        const response = await fetch(urlWithCacheBuster, {
          method: 'PUT',
          headers,
          body: formData,
        });
        
        console.log("URL--->" + url);
    
        if (response.ok) {
          console.log('Imagen de perfil del usuario actualizada');
        } else {
          console.log('Error al cambiar la imagen de perfil del usuario');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
              
    return (
        <div>
          {apiResponse.user && apiResponse.profile && (
            <Profile
              username={apiResponse.user.username}
              email={apiResponse.user.email}
              first_name={apiResponse.user.first_name}
              last_name={apiResponse.user.last_name}
              bio={apiResponse.profile.bio}
              url={apiResponse.profile.url}
              changeImage={changeImageProfile} 
              changeBio={changeBioProfile}
            />
          )}
        </div>
    );
};
  