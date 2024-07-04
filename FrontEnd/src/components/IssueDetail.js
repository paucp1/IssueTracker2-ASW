import React from 'react'
import { useState, useEffect } from 'react';
import '../assets/css/IssueDetail.css'
import { Comment } from './Comment.js';
import { File } from './File.js';
import { ActivityIssue } from './ActivityIssue.js';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'https://issuetracker2-asw.herokuapp.com'

export const IssueDetail = ({issue}) => {
    const [id, setId] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [severity, setSeverity] = useState('');
    const [creator, setCreator] = useState('');
    const [newComment, setNewComment] = useState('');
    const [blockReason, blockIssue] = useState('');
    const [comments, setComments] = useState([]);
    const [newFile, setNewFile] = useState('');
    const [files, setFiles] = useState([]);
    const [activities, setActivities] = useState([]);
    const [users, setUsers] = useState([]);
    const [watchersArray, setWatchersArray] = useState([]);
    const [watchersUsers, setWatchersUsers] = useState([]);
    const [assignedArray, setAssignedArray] = useState([]);
    const [assigned, setAssigned] = useState('');
    
    const SERVER_URL = `${BASE_URL}/issues/${id}`;
    const POST_COMMENT_URL = `${BASE_URL}/issues/${id}/comments`;
    const BLOCK_ISSUE_URL = `${BASE_URL}/issues/${id}/toggle_block_issue/`;
    const POST_FILE_URL = `${BASE_URL}/issues/files/`;
    const POST_WATCHERS_URL = `${BASE_URL}/issues/${id}/watch`;
    const POST_ASSIGNED_URL = `${BASE_URL}/issues/${id}/assign`;
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const isBlocked = issue.Block_reason != null

    useEffect(() => {
        setSubject(issue.Subject);
        setDescription(issue.Description)
        setDueDate(issue.Due_Date)
        setType(issue.Type)
        setPriority(issue.Priority)
        setStatus(issue.Status);
        setSeverity(issue.Severity)
        setCreator(issue.Creator_username)
        setId(issue.id)
        setComments(issue.comments ? Object.values(issue.comments) : []);
        setFiles(issue.files ? Object.values(issue.files) : []);
        setActivities(issue.activities ? Object.values(issue.activities) : []);
        setUsers(issue.users ? Object.values(issue.users) : []);
        setWatchersArray(issue.watchers ? Object.values(issue.watchers) : []);
        setAssignedArray(issue.assigned_users ? Object.values(issue.assigned_users) : []);
      }, [issue]);

    useEffect(() => {
        console.log(issue)
        //console.log(subject);
    }, [subject]);

    useEffect(() => {
      const dateOnly = dueDate ? dueDate.split('T')[0] : '';
      setDueDate(dateOnly);
    }, [dueDate]);

    useEffect(() => {
        // Check if the watchers array has a single element
        if (assignedArray.length === 1) {
          // Assign the element to the assigned variable
          setAssigned(assignedArray[0].User);
        }
      }, [assignedArray]);

    useEffect(() => {
        setWatchersUsers(watchersArray.map((watcher) => watcher.User));
        console.log(watchersUsers)
    }, [watchersArray]);

    const handlePut = async () => {
        try {    
          const headers = {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
          };


          let formattedDate = null; // Initialize formattedDate as null

          if (dueDate) {
            const dateObj = new Date(dueDate);
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            formattedDate = `${year}-${month}-${day}`;
            console.log(formattedDate);
          }
               
          console.log(formattedDate)
          const data = {
            Subject: subject,
            Description: description,
            Type: type,
            Priority: priority,
            Status: status,
            Severity: severity, 
            Due_Date: formattedDate
          };
    
          const response = await fetch(SERVER_URL, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data)
          });
    
          const responseData = await response.json();
    
        } catch (error) {
          console.error('Error:', error);
        }
    };

    const handelCommentPost = async () => {
        try {    
          const headers = {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
          };
    
          const data = {
            comment: newComment,
          };
    
          const response = await fetch(POST_COMMENT_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
          });
    
          const responseData = await response.json();
          setComments(responseData.comments ? Object.values(responseData.comments) : []);
          setNewComment('');
          console.log(responseData)
    
        } catch (error) {
          console.error('Error:', error);
        }
    };

    const handelBlockIssuePut = async () => {
      try {    
        const headers = {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json'
        };

        var data = {};

        if(blockReason != ""){
          data = {            
            Block_reason: blockReason,
          }
        }
  
        const response = await fetch(BLOCK_ISSUE_URL, {
          method: 'PUT',
          headers,
          body: JSON.stringify(data)
        });

        navigate('/')
  
      } catch (error) {
        console.error('Error:', error);
      }
  };

    const handelFilePost = async () => {
      try {    
        const headers = {
          Authorization: `Token ${token}`,
          'Accept': '*/*',
        };

        const formData = new FormData();
        formData.append('file', newFile);
        formData.append('issue_id', id);

        const response = await fetch(POST_FILE_URL, {
          method: 'POST',
          headers,
          body: formData
        });

        const responseData = await response.json();
        setFiles(responseData.files ? Object.values(responseData.files) : []);
    
      } catch (error) {
        console.error('Error:', error);
      }
  };


    const handleAssignedPost = async () => {
        try {    
          const headers = {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
          };
    
          const data = {
            user: assigned,
          };
    
          const response = await fetch(POST_ASSIGNED_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
          });
        
        } catch (error) {
          console.error('Error:', error);
        }
    };

    const handleWatchersPost = async () => {
        try {
          const headers = {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
          };
      
          const data = {
            users: watchersUsers,
          };
          console.log(data)
          const response = await fetch(POST_WATCHERS_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
          });
      
          // Handle the response as needed
        } catch (error) {
          console.error('Error:', error);
        }
    };
      

    const handleUserSelection = (userId, isSelected) => {
        if (isSelected) {
            setWatchersUsers((prevSelectedUsers) => [...prevSelectedUsers, userId]);
        } else {
            setWatchersUsers((prevSelectedUsers) =>
            prevSelectedUsers.filter((id) => id !== userId)
          );
        }
    };

    const deleteFile = async (fileID) => {
      try {    
        const headers = {
          Authorization: `Token ${token}`, // Incluir el token en el encabezado
          'Content-Type': 'application/json'
        };
  
        const response = await fetch(POST_FILE_URL + fileID, {
          method: 'DELETE',
          headers,
        });
  
        if (response.ok) {
          // Eliminación exitosa, actualiza el estado de apiResponse
          setFiles(prevState => prevState.filter(file => file.id !== fileID));
        } else {
          console.log('Error al eliminar el issue');
        }
  
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const handleBlockIssue = (event) => {
      blockIssue(event.target.value);
    };
    
    const handleAssignedChange = (event) => {
        setAssigned(event.target.value);
    };

    const handleNewComment = (event) => {
        setNewComment(event.target.value);
    };

    const handleNewFile = (event) => {
      setNewFile(event.target.files[0]);
    };

    const handleDateChange = (event) => {
      setDueDate(event.target.value);
    };

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleSeverityChange = (event) => {
        setSeverity(event.target.value);
    };
    return (
        <div class="form">
            <div class="form-element">
                <label class="subject-label">#{id}</label>
                <input class="subject-input" name="Subject" type="text" value={subject} onChange={handleSubjectChange} readOnly={isBlocked}/>
            </div>
            <div class="info-issue">
              <label class="issue-label">ISSUE</label>
              <label class="creator-label">Created by {creator}</label>
            </div>
            <hr/>
            <br/>
            <div class="form-element">
                <textarea class="description-input" name="Description" value={description} placeholder="Empty space is so boring...go on, be descriptive..." onChange={handleDescriptionChange} readOnly={isBlocked}/>
            </div>
            <br/>
            <label className="search-bar" htmlFor="status">
                Status:
            </label>
            <select className="select-filters" id="status" name="status" value={status} onChange={handleStatusChange} disabled={isBlocked}>
                <option value=""></option>
                <option value="New">New</option>
                <option value="In progress">In progress</option>
                <option value="Ready for test">Ready for test</option>
                <option value="Closed">Closed</option>
                <option value="Needs info">Needs info</option>
                <option value="Rejected">Rejected</option>
                <option value="Posponed">Postponed</option>
            </select>
            <label className="search-bar" htmlFor="priority">
                Type:
              </label>
              <select className="select-filters" id="priority" name="priority" value={type} onChange={handleTypeChange} disabled={isBlocked}>
                <option value=""></option>
                <option value="Bug">Bug</option>
                <option value="Question">Question</option>
                <option value="Enhancement">Enhancement</option>
              </select>
            <label className="search-bar" htmlFor="priority">
                Severity:
            </label>
            <select className="select-filters" id="priority" name="priority" value={severity} onChange={handleSeverityChange} disabled={isBlocked}>
                <option value=""></option>
                <option value="Wishlist">Wishlist</option>
                <option value="Minor">Minor</option>
                <option value="Normal">Normal</option>
                <option value="Important">Important</option>
                <option value="Critical">Critical</option>
            </select>   
            <label className="search-bar" htmlFor="priority">
                Priority:
            </label>
            <select className="select-filters" id="priority" name="priority" value={priority} onChange={handlePriorityChange} disabled={isBlocked}>
                <option value=""></option>
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
            </select>
            <label className="search-bar" htmlFor="priority">
                DueDate:
            </label>
            <input className="select-filters" type="date" id="dateInput" value={dueDate} onChange={handleDateChange} readOnly={isBlocked}/>
            <br/>
            {!isBlocked ? (
              <button className="save-info-button" onClick={handlePut}>Save</button>
              ):(null)
            }
            <br/>
            <hr/>
            <br/>
            <div class="assigned-component">
              <label class="assigned-label">Assigned to: </label>
              <select class="select-assigned" id="assigned" name="assigned" value={assigned} onChange={handleAssignedChange} disabled={isBlocked}>
                  <option value=""></option>
                  {Array.isArray(users) ? (
                    users.map(user => (
                      <option value={user.id}>{user.username}</option>
                    ))
                  ) : (
                    null
                  )}
              </select>
              {!isBlocked ? (
                <button class="assign-button" onClick={handleAssignedPost} title="Save assigned user"></button>
              ):(null)
              }              
            </div>
            <br/>
            <div class="watchers-component">
              <label class="assigned-label">Watchers: </label>
              {users.map((user) => (
                  <li key={user.id}>
                      <input
                      type="checkbox"
                      name="watchers[]"
                      value={user.id}
                      checked={watchersUsers.some((watcher) => watcher === user.id)}
                      onChange={(e) => handleUserSelection(user.id, e.target.checked)}
                      disabled={isBlocked}
                      />
                      {user.username}
                  </li>
              ))}
              {!isBlocked ? (
                <button class="assign-button" onClick={handleWatchersPost} title="Save watchers"></button>
                ):(null)
              }              
            </div>
            <br/>
            <hr/>
            <br/>
            <br/>
            <div class="comments-component"><br/>
              <label class="issue-label">Block issue</label>
              <br/>
              <br/>
              {!isBlocked ? (
                  <div class="add-comment">
                    <textarea class="comment-textarea" name="Comment" placeholder="Type the block reason" onChange={handleBlockIssue} value={blockReason} readOnly={isBlocked}></textarea>
                    <button name="create" class="post-comment-button" onClick={handelBlockIssuePut}>Block</button>
                  </div>
                ) : (
                  <div>
                    <label class="blocked">Block reason: {issue.Block_reason}</label>
                    <br/>
                    <button name="create" class="post-comment-button" onClick={handelBlockIssuePut}>Unblock</button>
                  </div>
                )
              }
              <br/>
              {comments.map((comment, index) => (
                  <Comment key={index} comment={comment.Comment} created_at={comment.Created_at} creator={comment.Username} />
              ))}
            </div>
            <br/>
            <hr/>
            <br/>
            <br/>
            <div class="files-component">
              <label class="issue-label">ATTACHMENTS</label>
              <br/>
              <br/>
              {!isBlocked ? (
                <div class="add-file">
                  <input class="add-file-input" type="file" onChange={handleNewFile} readOnly={isBlocked}/>
                  <button class="add-file-button" onClick={handelFilePost}>Upload</button>
                </div>
              ):(null)
              }
              <br/>
              {files.map((file, index) => (                  
                  <File key={index} id={file.id} name={file.Name} file={file.File} issue={file.Issue} onDelete={deleteFile} isBlocked={isBlocked}/>
              ))}
            </div>
            <br/>
            <hr/>
            <br/>
            <br/>
            <div class="comments-component">
              <label class="issue-label">COMMENTS</label>
              <br/>
              <br/>
              {!isBlocked ? (
                <div class="add-comment">
                  <textarea class="comment-textarea" name="Comment" placeholder="Type a new comment here" onChange={handleNewComment} value={newComment} required readOnly={isBlocked}></textarea>
                  <button name="create" class="post-comment-button" onClick={handelCommentPost}>Post</button>
                </div>
                ):(null)
              }
              <br/>
              {comments.map((comment, index) => (
                  <Comment key={index} comment={comment.Comment} created_at={comment.Created_at} creator={comment.Username} />
              ))}
            </div>
            <br/>
            <hr/>
            <br/>
            <br/>
            <div class="activities-component">
              <label class="issue-label">ACTIVITIES</label>
              <br/>
              <br/>
              {activities.map((activity, index) => (
                  <ActivityIssue key={index} created_at={activity.Created_at} creator={activity.Creator_username} old_user={activity.Old_user_username} 
                  type={activity.Type} user={activity.User_username}/>
              ))}
            </div>
            <br/>
            <hr/>
            <br/>
            <br/>
        </div>
  );
};
