import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';
import CallEndIcon from '../../../icons/CallEndIcon';

import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

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

  return (
    <Button onClick={() => room!.disconnect()} className={clsx(classes.button, props.className)} data-cy-disconnect>
      <CallEndIcon />
    </Button>
  );
}
