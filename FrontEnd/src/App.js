import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar';
import { IssuesView } from './views/IssuesView';
import { IssueDetailView } from './views/IssueDetailView';
import { Register } from './views/RegisterView';
import { NewIssueView } from './views/NewIssueView';
import { Login } from './views/LoginView';
import { ActivitiesView } from './views/ActivitiesView';
import { UsersView } from './views/UsersView';
import { BulkInsertView } from './views/BulkInsertView';
import { Error404View } from './views/Error404View';
import { EditProfileView } from './views/EditProfileView';
import { ProfileView } from './views/ProfileView';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // Route guard function to restrict access to specific routes if not logged in
  const requireLogin = (element) => {
    return isLoggedIn ? element : <Navigate to="/login" replace />;
  };

  return (
      <div>
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/" element={<NavigationBar />}>
          <Route path="/" element={requireLogin(<IssuesView />)} />
          <Route path="/issues/:id" element={<IssueDetailView/>}></Route>
          <Route path="/activities" element={requireLogin(<ActivitiesView />)} />
          <Route path="/users" element={requireLogin(<UsersView />)} />
          <Route path="/new_issue" element={requireLogin(<NewIssueView />)} />
          <Route path="/bulk_insert" element={requireLogin(<BulkInsertView />)} />
          <Route path="/edit_profile" element={requireLogin(<EditProfileView />)} />
          <Route path="/profile" element={requireLogin(<ProfileView />)} />
          <Route path="/users/:id" element={requireLogin(<ProfileView />)} />
          <Route path="*" element={requireLogin(<Error404View />)} />
        </Route>
      </Routes>
      </div>
  );
}

export default App;
