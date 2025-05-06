
import { RootState, AppDispatch } from '../../../redux/store';
import {
  Box,
  Typography,
  TextField,
  Button, 
  Container,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Stack,
  AppBar,
  Toolbar,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addTeam } from '../../../redux/slices/team/teamSlice';


interface Team {
  name: string;
  lead: string;
}

interface FormData {
  teamName: string;
  teamLead: string;
}

const schema = yup.object({
  teamName: yup.string().required('Team Name is required'),
  teamLead: yup.string().required('Team Lead is required'),
});


export default function AdminDashboard() {
  const { team } = useSelector((state:RootState) => state);
  const { user } = useSelector((state:RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // useEffect(() => {
  //   const storedUsers = JSON.parse(localStorage.getItem('user') || '[]');
  //   const storedTeams = JSON.parse(localStorage.getItem('teams') || '[]');
  //   setUsers(storedUsers);
  //   setTeams(storedTeams);
  // }, []);

  const onSubmit = (data: FormData) => {
    const newTeam: Team = {
      name: data.teamName,
      lead: data.teamLead,
    };
    dispatch(addTeam(newTeam));
    console.log("Teams are: ",team)
    reset();
  };

  // const onSubmit = (data: FormData) => {
    // const newTeam: Team = {
    //   name: data.teamName,
    //   lead: data.teamLead,
    // };
  //   const updatedTeams = [...teams, newTeam];
  //   setTeams(updatedTeams);
  //   localStorage.setItem('teams', JSON.stringify(updatedTeams));
  //   reset();
  // };

  const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');

  const assignedLeads = new Set(team.teams.map((team) => team.lead));
  const eligibleLeads = user.users.filter(
    (user) => user.role !== 'admin' && !assignedLeads.has(user.name)
  );

  const handleLogout = () => {
    sessionStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Admin Dashboard
          </Typography>
          <Button onClick={handleLogout} color="primary" variant="outlined">
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Welcome Admin, {currentUser.name}
          </Typography>

          <Box mt={4}>
            <Typography variant="h6">Create Team</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3} mt={2}>
                <Controller
                  name="teamName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Team Name"
                      fullWidth
                      error={!!errors.teamName}
                      helperText={errors.teamName?.message}
                    />
                  )}
                />

                <Controller
                  name="teamLead"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.teamLead}>
                      <InputLabel>Select Team Lead</InputLabel>
                      <Select {...field} label="Select Team Lead">
                        {eligibleLeads.map((user, index) => (
                          <MenuItem key={index} value={user.name}>
                            {user.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.teamLead && (
                        <Typography variant="caption" color="error">
                          {errors.teamLead.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />

                <Button type="submit" variant="contained">
                  Create Team
                </Button>
              </Stack>
            </form>
          </Box>

          <Box mt={5}>
            <Typography variant="h6" gutterBottom>
              Existing Teams
            </Typography>
            <Stack spacing={1}>
              {team.teams.map((team: Team, idx) => (
                <Paper key={idx} variant="outlined" sx={{ p: 1 }}>
                  {team.name} (Lead: {team.lead})
                </Paper>
              ))}
            </Stack>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
