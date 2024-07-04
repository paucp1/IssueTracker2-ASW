import React, { useEffect, useState } from 'react';
import { Issue } from '../components/Issue.js';
import '../assets/css/IssuesViewStyles.css'
import { Link } from 'react-router-dom'

export const IssuesView = () => {
  const apiUrl = 'https://issuetracker2-asw.herokuapp.com/issues/';
  const apiUsersUrl = 'https://issuetracker2-asw.herokuapp.com/users/users/';
  const token = localStorage.getItem('token'); 

  const [apiResponse, setApiResponse] = useState('');
  const [usersList, setUsersList] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [creator, setCreator] = useState('');
  const [orderBy, setOrderBy] = useState('');
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
        console.log(responseData);
      } catch (error) {
        console.error('Error:', error);
      }

      try {
        const headers = {
          Authorization: `Token ${token}`, // Incluir el token en el encabezado
          'Content-Type': 'application/json'
        };

        const response = await fetch(apiUsersUrl, {
          method: 'GET',
          headers,
        });

        const responseData = await response.json();
        setUsersList(responseData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []); // La dependencia vacía [] asegura que el efecto solo se ejecute una vez al montar el componente


  const deleteIssue = async (issueId) => {
    try {    
      const headers = {
        Authorization: `Token ${token}`, // Incluir el token en el encabezado
        'Content-Type': 'application/json'
      };

      const response = await fetch(apiUrl + issueId + '/delete', {
        method: 'DELETE',
        headers,
      });

      if (response.ok) {
        // Eliminación exitosa, actualiza el estado de apiResponse
        setApiResponse(prevState => prevState.filter(issue => issue.id !== issueId));
      } else {
        console.log('Error al eliminar el issue');
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const searchIssues = async () => {
    // Construir la URL con los parámetros de búsqueda
    const apiUrl = 'https://issuetracker2-asw.herokuapp.com/issues/';
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (status) params.append('status', status);
    if (priority) params.append('priority', priority);
    if (creator) params.append('creator', creator);
    if (orderBy) params.append('order_by', orderBy);

    const urlWithParams = `${apiUrl}?${params.toString()}`;

    // Realizar la petición con la URL construida
    try {
      const headers = {
        Authorization: `Token ${token}`, // Incluir el token en el encabezado
        'Content-Type': 'application/json'
      };
  
        const response = await fetch(urlWithParams, {
          method: 'GET',
          headers,
        });
  
      if (response.ok) {
        const responseData = await response.json();
        // Actualizar el estado de apiResponse con los nuevos datos recibidos
        setApiResponse(responseData);
      } else {
        console.log('Error al realizar la búsqueda');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleCreatorChange = (event) => {
    setCreator(event.target.value);
  };

  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };

  const handleResetSelects = () => {
    setSearchQuery("");
    setStatus("");
    setPriority("");
    setCreator("");
    setOrderBy("");
  };

  const invisibleStyle = {
    color: 'transparent',
  };

  return (
    <div class="WNDW">
      <div class="ajuste">
        <div class="taskboard-actions">
          <div class="issue-table-options">
            <div className="filter-form">
              <input
                className="search-bar"
                type="text"
                name="q"
                placeholder="subject or description"
                autoComplete="on"
                value={searchQuery}
                onChange={handleInputChange}
              />

              <label className="search-bar" htmlFor="status">
                Status:
              </label>
              <select className="select-filters" id="status" name="status" value={status} onChange={handleStatusChange}>
                <option value=""></option>
                <option value="New">New</option>
                <option value="In progress">In progress</option>
                <option value="Ready for test">Ready for test</option>
                <option value="Closed">Closed</option>
                <option value="Needs info">Needs info</option>
                <option value="Rejected">Rejected</option>
                <option value="Postponed">Postponed</option>
              </select>

              <label className="search-bar" htmlFor="priority">
                Priority:
              </label>
              <select className="select-filters" id="priority" name="priority" value={priority} onChange={handlePriorityChange}>
                <option value=""></option>
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
              </select>

              <label className="search-bar" htmlFor="creator">
                Created by:
              </label>
              <select className="select-filters" id="creator" name="creator" value={creator} onChange={handleCreatorChange}>
                <option value=""></option>
                {Array.isArray(usersList) ? (
                  usersList.map(user => (
                    <option value={user.user_username}>{user.user_username}</option>
                  ))
                ) : (
                  null
                )}
              </select>

              <label className="search-bar" htmlFor="order_by">
                Order by:
              </label>
              <select className="select-filters" id="order_by" name="order_by" value={orderBy} onChange={handleOrderByChange}>
                <option value=""></option>
                <option value="Subject">Subject ascending</option>
                <option value="-Subject">Subject descending</option>
                <option value="Created_at">Created at ascending</option>
                <option value="-Created_at">Created at descending</option>
              </select>

              <button className="search-action-button" onClick={searchIssues} title="Filter the selected params"></button>
            </div>
            <div class="filter-form" method="GET" action={ apiUrl }>
              <button onClick={handleResetSelects} class="clear-filters-button" title="Clear filters"></button>
            </div>  
          </div>
      </div>
        <div class="new-issue">
          <Link to="/new_issue">
            <button class="new-issue-btn">
                NEW ISSUE
            </button>    
          </Link>
          <button class="bulk-insert-btn">
            <Link style={invisibleStyle} to="/bulk_insert">#</Link>
          </button>  
        </div>
      </div> 
      {Array.isArray(apiResponse) ? (
        apiResponse.map(issue => (
            <Issue id={issue.id} subject={issue.Subject} Description={issue.Description} Blocked={issue.Block_reason} Due_Date={issue.Due_Date} onDelete={deleteIssue}/>
        ))
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
};
