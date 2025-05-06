import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addProject } from '../../../redux/slices/project/projectSlice';
import { RootState,AppDispatch } from '../../../redux/store';

type Project = {
  name: string;
  members: string[];
};

const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');

type TeamLeadProps = {};

const TeamLeadDashboard: React.FC<TeamLeadProps> = () => {

  const { team } = useSelector((state:RootState) => state);
  const { user } = useSelector((state:RootState) => state);
  const { project } = useSelector((state:RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  const [newProjectName, setNewProjectName] = useState('');
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {

    setTeamMembers(user.users.filter((user) => user.role === 'user').map((user: any) => user.name));

    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const handleAddProject = () => {
    const newProject: Project = {
      name: newProjectName,
      members: selectedMembers,
    };

    dispatch(addProject(newProject));

    setNewProjectName('');
    setSelectedMembers([]);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <Box sx={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Welcome Team Lead, {currentUser?.name}
      </Typography>

      <Button variant="outlined" color="secondary" onClick={handleLogout} sx={{ position: 'absolute', top: '1rem', right: '1rem' }}>
        Logout
      </Button>

      <Grid container spacing={4} sx={{ maxWidth: '900px', margin: '0 auto' }}>
        <Grid item xs={12} md={6}>

          <Box sx={{ marginBottom: '2rem' }}>
            <Typography variant="body1" gutterBottom>
              ➤ Create Project
            </Typography>
            <TextField
              fullWidth
              label="Project Name"
              variant="outlined"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              sx={{ marginBottom: '1rem' }}
            />
            <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
              <InputLabel>Team Members</InputLabel>
              <Select
                multiple
                value={selectedMembers}
                onChange={(e) => setSelectedMembers(e.target.value as string[])}
                label="Team Members"
                renderValue={(selected) => selected.join(', ')}
              >
                {teamMembers.map((member, index) => (
                  <MenuItem key={index} value={member}>
                    {member}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={handleAddProject}>
              Create Project
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            ➤ My Projects
          </Typography>
          {project.projects.length === 0 ? (
            <Typography>No projects created yet</Typography>
          ) : (
            project.projects.map((project, index) => (
              <Box key={index} sx={{ padding: '1rem', marginBottom: '1rem', border: '1px solid #ccc' }}>
                <Typography variant="body1" gutterBottom>
                  ▸ {project.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  - Members: {project.members.join(', ')}
                </Typography>
                <Button variant="outlined" color="primary" sx={{ marginRight: '1rem' }}>
                  Edit Project
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                >
                  Delete Project
                </Button>
              </Box>
            ))
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeamLeadDashboard;
