import React from 'react'
import { useEffect, useState } from 'react';
import { Activity } from '../components/Activity';


export const ActivitiesView = () => {
    const apiUrl = 'https://issuetracker2-asw.herokuapp.com/issues/activities';
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
      <div class="activity">
        {Array.isArray(apiResponse) ? (
          apiResponse.map(activity => (
            <Activity id={activity.id} creator={activity.Creator_username} created_at={activity.Created_at} type={activity.Type} user={activity.User_username}/>
          ))
        ) : (
          <p>No activities</p>
        )}
      </div>
    </div>
  )
}