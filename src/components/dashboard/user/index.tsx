import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

type Project = {
  name: string;
  members: string[];
};

type UserDashboardProps = {};

const UserDashboard: React.FC<UserDashboardProps> = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { team } = useSelector((state) => state);
  const { user } = useSelector((state) => state);
  const { project } = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    const currUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    setCurrentUser(user);

    if (!currUser) {
      navigate('/login');
    }

    const userProjects = project.projects.filter((project: Project) => project.members.includes(currUser.name));
    setProjects(userProjects);

  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <Box sx={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Welcome User, {currentUser?.name}
      </Typography>

      <Button variant="outlined" color="secondary" onClick={handleLogout} sx={{ position: 'absolute', top: '1rem', right: '1rem' }}>
        Logout
      </Button>

      <Grid container spacing={4} sx={{ maxWidth: '900px', margin: '0 auto' }}>
        

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            ➤ My Projects
          </Typography>
          {projects.length === 0 ? (
            <Typography>No projects assigned to you</Typography>
          ) : (
            projects.map((project, index) => (
              <Box key={index} sx={{ padding: '1rem', marginBottom: '1rem', border: '1px solid #ccc' }}>
                <Typography variant="body1" gutterBottom>
                  ▸ {project.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  - Members: {project.members.join(', ')}
                </Typography>
              </Box>
            ))
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard;
