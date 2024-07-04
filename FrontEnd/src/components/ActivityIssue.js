import React from 'react'
import '../assets/css/IssueDetail.css'

export const ActivityIssue = (props) => {
  console.log(props);
  return (
    <div class="card">
      <div class="header-activity">
        <label class="creator-activity-label">{props.creator}</label>
        <label class="created-at-activity-label">{props.created_at}</label>
      </div>
      <div class="info-activity">
        <label class="type-activity-label">{props.type}</label>
        <label class="user-activity-label">{props.old_user}</label>
        <label class="sign-label">></label>
        <label class="user-activity-label">{props.user}</label>
      </div>
    </div>
  )
}