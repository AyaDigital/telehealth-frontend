import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import EndCallButton from '../Buttons/EndCallButton/EndCallButton';
import DropCallButton from '../Buttons/EndCallButton/DropCallButton';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import { Typography, Grid, Hidden } from '@material-ui/core';
import { useAppState } from '../../state';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.background.default,
      bottom: 0,
      left: 0,
      right: 0,
      height: `${theme.footerHeight}px`,
      display: 'flex',
      padding: '0 1.43em',
      zIndex: 10,
      [theme.breakpoints.down('sm')]: {
        height: `${theme.mobileFooterHeight}px`,
        padding: 0,
      },
    },
    screenShareBanner: {
      position: 'fixed',
      zIndex: 8,
      bottom: `${theme.footerHeight}px`,
      left: 0,
      right: 0,
      height: '104px',
      background: 'rgba(0, 0, 0, 0.5)',
      '& h6': {
        color: 'white',
      },
      '& button': {
        background: 'white',
        color: theme.brand,
        border: `2px solid ${theme.brand}`,
        margin: '0 2em',
        '&:hover': {
          color: '#600101',
          border: `2px solid #600101`,
          background: '#FFE9E7',
        },
      },
    },
    flexRow: {
      display: 'flex',
      flexDirection: 'row',
      columnGap: '16px',
    },
    hideMobile: {
      display: 'initial',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  })
);

export default function MenuBarShorted() {
  const classes = useStyles();
  const { roles } = useAppState();

  const ROLE_PRACTITIONER = 'ROLE_PRACTITIONER';
  const isPractitioner = roles?.includes(ROLE_PRACTITIONER);

  return (
    <>
      <footer className={classes.container}>
        <Grid container justifyContent="space-around" alignItems="center">
          <Grid style={{ flex: 1 }}>
            <Grid container justifyContent="space-around">
              <div className={classes.flexRow}>{isPractitioner ? <DropCallButton /> : <EndCallButton />}</div>
            </Grid>
          </Grid>
        </Grid>
      </footer>
    </>
  );
}
