import React, { useRef } from 'react';
import CollaborationViewIcon from '@material-ui/icons/AccountBox';
import GridViewIcon from '@material-ui/icons/Apps';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useAppState } from '../../../state';
import useDevices from '../../../hooks/useDevices/useDevices';

export default function ToggleSpeakerViewButton(props: { disabled?: boolean; className?: string }) {
  const { hasVideoInputDevices } = useDevices();
  const { setIsGalleryViewActive, isGalleryViewActive } = useAppState();

  return (
    <Button
      className={props.className}
      onClick={() => {
        setIsGalleryViewActive(isGallery => !isGallery);
      }}
      disabled={!hasVideoInputDevices || props.disabled}
      startIcon={
        isGalleryViewActive ? (
          <CollaborationViewIcon style={{ fill: '#707578', width: '0.9em' }} />
        ) : (
          <GridViewIcon style={{ fill: '#707578', width: '0.9em' }} />
        )
      }
    >
      <Typography variant="body1">{isGalleryViewActive ? 'Speaker View' : 'Gallery View'}</Typography>
    </Button>
  );
}
