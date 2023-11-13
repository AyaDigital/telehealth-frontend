import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    timerBlock: {
      display: 'flex',
      'column-gap': '5px',
      'align-items': 'center',
      'font-weight': 'bold',
    },
  })
);

const eventTime = moment().unix();

export default function Timer(props: { disabled?: boolean }) {
  const classes = useStyles();
  const [timer, setTimer] = useState('');

  const interval = 1000;

  setInterval(() => {
    const currentTime = moment().unix();

    const diffTime = currentTime - eventTime;
    const duration = moment.duration(diffTime, 'seconds');

    const innerText =
      String(duration.hours()).padStart(2, '0') +
      ' : ' +
      String(duration.minutes()).padStart(2, '0') +
      ' : ' +
      String(duration.seconds()).padStart(2, '0');

    setTimeout(() => {
      setTimer(innerText);
    }, 100);
  }, interval);

  useEffect(() => {
    return () => {
      setTimer('');
    };
  }, []);

  return (
    <div className={classes.timerBlock}>
      <span>Timer call: </span>
      <span>{timer}</span>
    </div>
  );
}
