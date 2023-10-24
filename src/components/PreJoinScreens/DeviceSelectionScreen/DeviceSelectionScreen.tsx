import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { makeStyles, Typography, Grid, Button, Theme, Hidden, Switch, Tooltip } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import LocalVideoPreview from './LocalVideoPreview/LocalVideoPreview';
import SettingsMenu from './SettingsMenu/SettingsMenu';
import { Steps } from '../PreJoinScreens';
import ToggleAudioButton from '../../Buttons/ToggleAudioButton/ToggleAudioButton';
import ToggleVideoButton from '../../Buttons/ToggleVideoButton/ToggleVideoButton';
import { useAppState } from '../../../state';
import useChatContext from '../../../hooks/useChatContext/useChatContext';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import useAppointment from '../../../hooks/useAppointment/useAppointment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useKrispToggle } from '../../../hooks/useKrispToggle/useKrispToggle';
import SmallCheckIcon from '../../../icons/SmallCheckIcon';
import InfoIconOutlined from '../../../icons/InfoIconOutlined';
import './styles.scss';

const useStyles = makeStyles((theme: Theme) => ({
  gutterBottom: {
    marginBottom: '1em',
  },
  marginTop: {
    marginTop: '1em',
  },
  deviceButton: {
    width: '100%',
    border: '2px solid #aaa',
    margin: '1em 0',
  },
  localPreviewContainer: {
    paddingRight: '2em',
    marginBottom: '2em',
    [theme.breakpoints.down('sm')]: {
      padding: '0 2.5em',
    },
  },
  joinButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      width: '100%',
      '& button': {
        margin: '0.5em 0',
      },
    },
  },
  mobileButtonBar: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '1.5em 0 1em',
    },
  },
  mobileButton: {
    padding: '0.8em 0',
    margin: 0,
  },
  toolTipContainer: {
    display: 'flex',
    alignItems: 'center',
    '& div': {
      display: 'flex',
      alignItems: 'center',
    },
    '& svg': {
      marginLeft: '0.3em',
    },
  },
  appointmentInfo: {
    '& > div:nth-child(2)': {
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column !important',
        width: 'auto !important',
        height: 'auto !important',
      },
    },
  },
}));

interface DeviceSelectionScreenProps {
  name: string;
  roomName: string;
  setStep: (step: Steps) => void;
}

export default function DeviceSelectionScreen({ name, roomName, setStep }: DeviceSelectionScreenProps) {
  const classes = useStyles();
  const { getToken, roles, isFetching, isKrispEnabled, isKrispInstalled } = useAppState();
  const { connect: chatConnect } = useChatContext();
  const { connect: videoConnect, isAcquiringLocalTracks, isConnecting } = useVideoContext();
  const { toggleKrisp } = useKrispToggle();
  const { participant, appointmentDate, appointmentType, isLoading } = useAppointment(roomName);

  const disableButtons = isFetching || isAcquiringLocalTracks || isConnecting;
  const isPatient = roles?.includes('ROLE_PATIENT') && !roles?.includes('ROLE_PRACTITIONER');

  const handleJoin = () => {
    getToken(name, roomName).then(({ token }) => {
      videoConnect(token);
      process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== 'true' && chatConnect(token);
    });
  };

  if (isFetching || isConnecting) {
    return (
      <Grid container justifyContent="center" alignItems="center" direction="column" style={{ height: '100%' }}>
        <div>
          <CircularProgress variant="indeterminate" />
        </div>
        <div>
          <Typography variant="body2" style={{ fontWeight: 'bold', fontSize: '16px' }}>
            Joining Meeting
          </Typography>
        </div>
      </Grid>
    );
  }

  return (
    <>
      <Typography variant="h5" className={classes.gutterBottom}>
        <div className="patient-block">
          {isLoading ? (
            <CircularProgress variant="indeterminate" />
          ) : (
            <>
              <div className="patient-header">{isPatient ? 'Doctor' : 'Patient'}</div>
              <div className="patient-profile">
                <div className="patient-photo">
                  <img width="74px" height="74px" src={participant?.photo} alt="" />
                  <div>{`${participant?.firstname} ${participant?.lastname}`}</div>
                </div>
              </div>
              <div className={`appointment-info ${classes.appointmentInfo}`}>
                <div>Appointment info</div>
                <div>
                  <div>
                    <div>Date</div>
                    <div>{moment(appointmentDate).format('LL')}</div>
                  </div>
                  <div>
                    <div>Time</div>
                    <div>{moment(appointmentDate).format('LT')}</div>
                  </div>
                  <div>
                    <div>Appointment type</div>
                    <div>{appointmentType}</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Typography>

      <Grid container justifyContent="center">
        <Grid item md={7} sm={12} xs={12}>
          <div className={classes.localPreviewContainer}>
            <LocalVideoPreview identity={name} />
          </div>
          <div className={classes.mobileButtonBar}>
            <Hidden mdUp>
              <ToggleAudioButton className={classes.mobileButton} disabled={disableButtons} />
              <ToggleVideoButton className={classes.mobileButton} disabled={disableButtons} />
              <SettingsMenu mobileButtonClass={classes.mobileButton} />
            </Hidden>
          </div>
        </Grid>
        <Grid item md={5} sm={12} xs={12}>
          <Grid container direction="column" justifyContent="space-between" style={{ alignItems: 'normal' }}>
            <div>
              <Hidden smDown>
                <ToggleAudioButton className={classes.deviceButton} disabled={disableButtons} />
                <ToggleVideoButton className={classes.deviceButton} disabled={disableButtons} />
                <SettingsMenu mobileButtonClass={classes.mobileButton} className={classes.deviceButton} />
              </Hidden>
            </div>
          </Grid>
        </Grid>

        <Grid item md={12} sm={12} xs={12}>
          {isKrispInstalled && (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              style={{ marginBottom: '1em' }}
            >
              <div className={classes.toolTipContainer}>
                <Typography variant="subtitle2">Noise Cancellation</Typography>
                <Tooltip
                  title="Suppress background noise from your microphone"
                  interactive
                  leaveDelay={250}
                  leaveTouchDelay={15000}
                  enterTouchDelay={0}
                >
                  <div>
                    <InfoIconOutlined />
                  </div>
                </Tooltip>
              </div>

              <FormControlLabel
                control={
                  <Switch
                    checked={!!isKrispEnabled}
                    checkedIcon={<SmallCheckIcon />}
                    disableRipple={true}
                    onClick={toggleKrisp}
                  />
                }
                label={isKrispEnabled ? 'Enabled' : 'Disabled'}
                style={{ marginRight: 0 }}
                // Prevents <Switch /> from being temporarily enabled (and then quickly disabled) in unsupported browsers after
                // isAcquiringLocalTracks becomes false:
                disabled={isKrispEnabled && isAcquiringLocalTracks}
              />
            </Grid>
          )}
          <Divider />
        </Grid>

        <Grid item md={12} sm={12} xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={{ marginTop: '1em' }}
          >
            <Grid item md={5} sm={12} xs={12} style={{ minWidth: '100%' }}>
              <div className={classes.joinButtons}>
                <Button
                  variant="contained"
                  color="primary"
                  data-cy-join-now
                  onClick={handleJoin}
                  disabled={disableButtons}
                >
                  Join the call
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
