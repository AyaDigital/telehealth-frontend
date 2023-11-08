import React, { useCallback } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';
import CallEndIcon from '../../../icons/CallEndIcon';

import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import { useAppState } from '../../../state';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      background: 'none',
      color: 'white',
      '&:hover': {
        background: 'none',
      },
    },
  })
);

export default function EndCallButton(props: { className?: string }) {
  const classes = useStyles();
  const { room } = useVideoContext();
  const { user } = useAppState();
  const endpoint = process.env.REACT_APP_BACKEND_URL + '/drop';

  function DropCall() {
    const headers = new window.Headers();
    headers.set('Authorization', `Bearer ${user}`);
    headers.set('content-type', 'application/json');
    return fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        appointmentId: room?.name,
      }),
    }).then(res => res.json());
  }

  return (
    <Button
      onClick={() => {
        DropCall().then(r => console.log('drop'));
        // room!.disconnect()
      }}
      className={clsx(classes.button, props.className)}
      data-cy-disconnect
    >
      <CallEndIcon />
    </Button>
  );
}
