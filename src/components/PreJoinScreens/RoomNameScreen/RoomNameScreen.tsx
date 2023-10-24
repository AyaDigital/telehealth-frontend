import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import {
  Typography,
  makeStyles,
  TextField,
  Grid,
  Button,
  InputLabel,
  Theme,
  Select,
  MenuItem,
} from '@material-ui/core';
import { useAppState } from '../../../state';

const useStyles = makeStyles((theme: Theme) => ({
  gutterBottom: {
    marginBottom: '1em',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1.5em 0 3.5em',
    '& div:not(:last-child)': {
      marginRight: '1em',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '1.5em 0 2em',
    },
  },
  textFieldContainer: {
    width: '100%',
  },
  continueButton: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

interface RoomNameScreenProps {
  name: string;
  roomName: string;
  setName: (name: string) => void;
  setRoomName: (roomName: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function RoomNameScreen({ name, roomName, setName, setRoomName, handleSubmit }: RoomNameScreenProps) {
  const classes = useStyles();
  const { user, signOut } = useAppState();

  const handleNameChange = (event: string) => {
    console.log('User name set to ' + event);
    setName(event);
  };

  const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  const logout = () => {
    signOut?.().catch(err => console.log(err));
  };

  const hasUsername = !window.location.search.includes('customIdentity=true') && user?.displayName;

  const headers = new window.Headers();
  const endpoint = process.env.REACT_APP_BACKEND_URL + '/user';

  headers.set('Authorization', `Bearer ${user}`);
  headers.set('content-type', 'application/json');

  useEffect(() => {
    fetch(endpoint, {
      headers,
    })
      .then(response => response.json())
      .then(data => handleNameChange(data.name))
      .catch(error => console.error(error));
  }, []);

  return (
    <>
      <Typography variant="h5" className={classes.gutterBottom}>
        Join a Room
      </Typography>
      <Typography variant="body1">{"Enter the name of a room you'd like to join."}</Typography>
      <form onSubmit={handleSubmit}>
        <div className={classes.inputContainer}>
          {!hasUsername && (
            <div className={classes.textFieldContainer}>
              <InputLabel shrink htmlFor="input-user-name">
                Your Name
              </InputLabel>
              <Typography variant="h6" className={classes.gutterBottom}>
                {name}
              </Typography>
            </div>
          )}
          <div className={classes.textFieldContainer}>
            <InputLabel shrink htmlFor="input-room-name">
              Room Name
            </InputLabel>
            <TextField
              autoCapitalize="false"
              id="input-room-name"
              variant="outlined"
              fullWidth
              size="small"
              value={roomName}
              onChange={handleRoomNameChange}
            />
          </div>
        </div>
        <Grid container justifyContent="space-between">
          <Button variant="contained" type="submit" color="primary" onClick={logout}>
            Logout
          </Button>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={!name || !roomName}
            className={classes.continueButton}
          >
            Continue
          </Button>
        </Grid>
      </form>
    </>
  );
}
