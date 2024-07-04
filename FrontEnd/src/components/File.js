import React from 'react'
import '../assets/css/IssueDetail.css'

export const File = (props) => {
  const { id, name, file, issue, onDelete, isBlocked} = props;

  const handleDeleteFile = () => {
    onDelete(id);
  };

  return (
    <div class="file">
          <div class="file-info">
            <a class="file-name">
              {name}
            </a>
            {!isBlocked ? (
              <button class="taiga-btn-delete" onClick={handleDeleteFile}></button>
            ):(null)
            }            
          </div>
    </div>
  )
}