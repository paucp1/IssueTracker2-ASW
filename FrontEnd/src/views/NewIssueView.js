import React from 'react'
import { useState } from 'react';
import '../assets/css/newIssueStyle.css'
import { Link } from 'react-router-dom'


export const NewIssueView = () => {
    const apiUrl = 'https://issuetracker2-asw.herokuapp.com/issues/';
    const token = localStorage.getItem('token'); 

    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };


    const handleClick = async () => {
        try {
          const headers = {
            Authorization: `Token ${token}`, // Incluir el token en el encabezado
            'Content-Type': 'application/json'
          };
    
          const data = {
            Subject: subject,
            Description: description
          };
    
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
          });

          setSubject("")
          setDescription("")
    
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const handleCancelClick = async () => {
        
      };

  return (
    <div class = "lightbox">
      <div class = "lightbox-form">
        <h2 class="title">New Issue</h2>
        <div class="form">
          <div class="form-element">
            <input type="text" name="Subject" placeholder="Subject" value={subject} required data-lenght="500" onChange={handleSubjectChange}/>    
          </div>            
          <div class="form-element">
            <textarea rows="7" name="Description" placeholder="Enter a description" value={description} onChange={handleDescriptionChange}></textarea>
          </div>            
          <div class="buttons">
            <Link class="linked-button" to="/">
              <button class="cancel-button">Cancel</button>
            </Link>  
            <Link class="linked-button" to="/">
              <button class="create-button" onClick={handleClick}>Create</button>
            </Link>            
          </div>            
        </div>
      </div>
    </div>
  )
}