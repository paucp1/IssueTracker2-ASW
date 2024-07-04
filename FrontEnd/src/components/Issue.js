import React from 'react'
import '../assets/css/IssueStyle.css'
import { useNavigate } from 'react-router-dom';

export const Issue = (props) => {
  const { id, subject, Description, Blocked, Due_Date, onDelete } = props;
  const navigate = useNavigate();

  const handleDeleteIssue = (event) => {
    event.stopPropagation();
    onDelete(id);
  };

  const handleClick = () => {
    navigate(`/issues/${id}`);  
  };

console.log(Due_Date);

  return (
    <div class="issues" onClick={handleClick}>
        <p class="title">{subject}</p>
        <p>{Description}</p>
        <button onClick={handleDeleteIssue} class="taiga-btn-delete"></button>
        <div class="indicators">
        {Blocked != null ? <p>🔒︎</p> : null}
        {Due_Date != null ? <p>⏳</p> : null}
        </div>
    </div>
  )
}
