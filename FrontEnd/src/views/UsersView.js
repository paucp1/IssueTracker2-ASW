import React from 'react'
import { useEffect, useState } from 'react';
import { User } from '../components/User';


export const UsersView = () => {
    const apiUrl = 'https://issuetracker2-asw.herokuapp.com/users/users/';
    const token = localStorage.getItem('token'); 
    const [apiResponse, setApiResponse] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        try {
          const headers = {
            Authorization: `Token ${token}`, // Incluir el token en el encabezado
            'Content-Type': 'application/json'
          };

          const response = await fetch(apiUrl, {
            method: 'GET',
            headers,
          });

          const responseData = await response.json();
          setApiResponse(responseData);

        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchData();
    }, []); // La dependencia vacía [] asegura que el efecto solo se ejecute una vez al montar el componente



    console.log(apiResponse);

  return (
    <div>    
      <div class="users">
        {Array.isArray(apiResponse) ? (
          apiResponse.map(user => (
            <User id={user.id} username={user.user_username} image_url={user.url}/>
          ))
        ) : (
          <p>No users</p>
        )}
      </div>
    </div>
  )
}