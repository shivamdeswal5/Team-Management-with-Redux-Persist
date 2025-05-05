
import './App.css'
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Signup from './pages/signup'
import Admin from './components/dashboard/admin';
import User from './components/dashboard/user';
import Login from './pages/login';
import TeamLead from './components/dashboard/team-lead';
import ProtectedRoute from './routes/protected';

function App() {

  return (
    <>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        
        <Route
          path="/admin"
          element={<ProtectedRoute children={<Admin />} allowedRoles={['admin']} />}
        />

        <Route
          path="/teamlead"
          element={<ProtectedRoute children={<TeamLead />} allowedRoles={['admin', 'teamlead','user']} />}
        />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
