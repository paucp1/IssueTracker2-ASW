import React from 'react'
import '../assets/css/IssueStyle.css'

export const Comment = (props) => {
  const { comment, created_at, creator } = props;

  return (
    <div class="comment">
        <ul>
            <p class="title">{creator}</p>
            <p>{comment}</p>
            <p>{created_at}</p>
        </ul>
    </div>
  )
}