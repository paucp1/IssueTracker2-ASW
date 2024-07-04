import React from 'react'
import '../assets/css/activityStyle.css'

export const Activity = (props) => {
  console.log(props);
  const user_isNotNull = props.user != "unassigned"; 
  return (
    <div class="card">
        <p>{props.creator}</p>
        <p>{props.created_at}</p>
        <p>{props.type}</p>
        <p style={{ display: user_isNotNull ? 'inline' : 'none' }}>{props.user}</p>
    </div>
  )
}
