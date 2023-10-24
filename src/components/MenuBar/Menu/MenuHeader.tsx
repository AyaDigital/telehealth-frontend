import React, { useState, useRef } from 'react';
import ToggleAudioButton from '../../../components/Buttons/ToggleAudioButton/ToggleAudioButton';
import ToggleVideoButton from '../../../components/Buttons/ToggleVideoButton/ToggleVideoButton';
import ToggleScreenShareButton from '../../../components/Buttons/ToogleScreenShareButton/ToggleScreenShareButton';
import ToggleSpeakerViewButton from '../../../components/Buttons/ToggleSpeakerView/ToggleSpeakerView';
import MoreIcon from '@material-ui/icons/MoreVert';
import StartRecordingIcon from '../../../icons/StartRecordingIcon';
import StopRecordingIcon from '../../../icons/StopRecordingIcon';

import { Button, styled, Theme, useMediaQuery, Menu as MenuContainer, MenuItem, Typography } from '@material-ui/core';
import useRoomState from '../../../hooks/useRoomState/useRoomState';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

export const IconContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  width: '1.5em',
  marginRight: '0.3em',
});

export default function MenuHeader(props: { buttonClassName?: string }) {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const roomState = useRoomState();
  const isReconnecting = roomState === 'reconnecting';
  const [menuOpen, setMenuOpen] = useState(false);

  const { isSharingScreen, toggleScreenShare } = useVideoContext();

  const anchorRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        onClick={() => setMenuOpen(isOpen => !isOpen)}
        ref={anchorRef}
        className={props.buttonClassName}
        data-cy-more-button
      >
        <>
          Menu
          <MoreIcon />
        </>
      </Button>
      <MenuContainer
        open={menuOpen}
        onClose={() => setMenuOpen(isOpen => !isOpen)}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: isMobile ? -55 : 'bottom',
          horizontal: 'center',
        }}
      >
        <MenuItem>
          <ToggleAudioButton disabled={isReconnecting} />
        </MenuItem>
        <MenuItem>
          <ToggleVideoButton disabled={isReconnecting} />
        </MenuItem>
        {!isSharingScreen && (
          <MenuItem onClick={() => null}>
            <ToggleScreenShareButton disabled={isReconnecting} />
          </MenuItem>
        )}
        {isSharingScreen && (
          <MenuItem onClick={() => null}>
            <Button onClick={() => toggleScreenShare()}>Stop Sharing</Button>
          </MenuItem>
        )}
        <MenuItem>
          <ToggleSpeakerViewButton disabled={isReconnecting} />
        </MenuItem>
      </MenuContainer>
    </>
  );
}
