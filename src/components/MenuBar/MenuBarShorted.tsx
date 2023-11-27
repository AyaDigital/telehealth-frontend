import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import EndCallButton from '../Buttons/EndCallButton/EndCallButton';
import DropCallButton from '../Buttons/EndCallButton/DropCallButton';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import { Typography, Grid, Hidden } from '@material-ui/core';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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
    styledModal: {
      position: 'fixed',
      width: '200px',
      height: '200px',
    },
    editorWindow: {
      position: 'absolute',
      top: '20vw',
      left: '20vw',
      padding: '0px 32px 0px 32px',
      backgroundColor: 'white',
      '& > div.quill': {
        width: '600px',
        height: '300px',
        zIndex: '10000',
        padding: '10px 0px 65px 0px',
      },
    },
    buttonModalStyle: {
      height: '60px',
    },
    buttonStyle: {
      position: 'absolute',
      width: '170px',
      height: '72px',
    },
    buttonClose: {
      color: 'red',
    },
    buttonSave: {
      color: 'green',
    },
  })
);

export default function MenuBarShorted() {
  const classes = useStyles();
  const { roles } = useAppState();

  const ROLE_PRACTITIONER = 'ROLE_PRACTITIONER';
  const isPractitioner = roles?.includes(ROLE_PRACTITIONER);

  const [isWindowOpen, setIsWindowOpen] = useState(false);

  const openModal = () => {
    setIsWindowOpen(true);
  };

  const closeModal = () => {
    setIsWindowOpen(false);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
    ],
  };

  return (
    <>
      <Modal
        className={classes.styledModal}
        keepMounted
        disablePortal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={isWindowOpen}
        onClose={() => closeModal()}
      >
        <div className={classes.editorWindow}>
          <ReactQuill modules={modules} theme="snow" value={''} onChange={() => {}} />
          <Grid container className={classes.buttonModalStyle} justifyContent="space-around" alignItems="center">
            <Button className={classes.buttonSave} variant="outlined" onClick={() => {}}>
              Save
            </Button>
            <Button className={classes.buttonClose} variant="outlined" onClick={closeModal}>
              Close
            </Button>
          </Grid>
        </div>
      </Modal>
      <footer className={classes.container}>
        {isPractitioner ? (
          <Grid container className={classes.buttonStyle} justifyContent="space-around" alignItems="center">
            <Button variant="outlined" onClick={openModal}>
              Create prescription
            </Button>
          </Grid>
        ) : null}
        <Grid container justifyContent="space-around" alignItems="center" xs={12}>
          <Grid style={{ flex: 2 }}>
            <Grid container justifyContent="space-around">
              <div className={classes.flexRow}>{isPractitioner ? <DropCallButton /> : <EndCallButton />}</div>
            </Grid>
          </Grid>
        </Grid>
      </footer>
    </>
  );
}
