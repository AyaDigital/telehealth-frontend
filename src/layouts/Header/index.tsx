import React, { useState, useEffect } from 'react';
import Logo from '../../images/logo';
// Temprorary avatar stubb

import { Grid, Hidden, Button } from '@material-ui/core';
import ToggleAudioButton from '../../components/Buttons/ToggleAudioButton/ToggleAudioButton';
import ToggleVideoButton from '../../components/Buttons/ToggleVideoButton/ToggleVideoButton';
import ToggleScreenShareButton from '../../components/Buttons/ToogleScreenShareButton/ToggleScreenShareButton';
import ToggleSpeakerViewButton from '../../components/Buttons/ToggleSpeakerView/ToggleSpeakerView';
import Timer from '../../components/Timer/Timer';
import Menu from '../../components/MenuBar/Menu/MenuHeader';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import { isMobile } from '../../utils';
import DropDownIcon from '../../images/Icons/dropdawnIcon';
import LogoutIcon from '../../images/Icons/logoutIcon';
import ProfileIcon from '../../images/Icons/profileIcon';
import { useAppState } from '../../state';
import useRoomState from '../../hooks/useRoomState/useRoomState';
import { FullProfileT } from '../../types';

import './header.scss';
import {} from 'react-router-dom';

type HeaderProps = {
  loading?: boolean;
  isModalOpen?: boolean;
  profile?: FullProfileT;
  pathname: string | undefined;
  openModal?: (arg: boolean) => void;
  getProfile?: () => void;
};

export const Header: React.FC<HeaderProps> = () => {
  const roomState = useRoomState();
  const { isSharingScreen, toggleScreenShare } = useVideoContext();
  const isReconnecting = roomState === 'reconnecting';

  const [isMenuBarOpen, setIsMenuOpen] = useState(false);
  const { name, roles, avatarUrl, signOut } = useAppState();

  const isPatient = roles?.includes('ROLE_PATIENT') && !roles?.includes('ROLE_PRACTITIONER');
  const isDoctor = roles?.includes('ROLE_PRACTITIONER');

  const redirectToProfile = () => {
    window.open('https://account-beta.aya-doc.com/account', '_blank');
  };

  useEffect(() => {
    const menubar = document.getElementById('dropdown');
    if (isMenuBarOpen) {
      menubar?.classList.add('open');
    } else {
      menubar?.classList.remove('open');
    }
  }, [isMenuBarOpen]);

  return (
    <div className="header-layout">
      <div className="header">
        <div className="logo">
          <Logo />
        </div>
        <div className="headerRight">
          <div className="searchBlock">
            <Hidden smDown>
              {roomState === 'connected' ? (
                <Grid item>
                  <Grid container justifyContent="center">
                    <ToggleAudioButton disabled={isReconnecting} />
                    <ToggleVideoButton disabled={isReconnecting} />
                    {!isSharingScreen && <ToggleScreenShareButton disabled={isReconnecting} />}
                    {isSharingScreen && <Button onClick={() => toggleScreenShare()}>Stop Sharing</Button>}
                    <ToggleSpeakerViewButton disabled={isReconnecting} />
                    <Timer />
                  </Grid>
                </Grid>
              ) : null}
            </Hidden>
            <Hidden mdUp>{roomState === 'connected' ? <Menu /> : null}</Hidden>
          </div>
          <div className="notificationsBlock"></div>
          <div className="userBlock">
            <a className={`userLink ${isMenuBarOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuBarOpen)}>
              <div className="profile-avatar">
                <img width="35px" height="35px" src={avatarUrl} alt="" />
              </div>
              <div className="userInfo">
                <div className="userName">{name}</div>
                <div className="userRole">{isPatient ? 'Patient' : isDoctor ? 'Doctor' : ''}</div>
              </div>
              <i className="fa custom-caret">
                <DropDownIcon />
              </i>
            </a>
            <div className="dropdown-menu" id="dropdown">
              <ul className="list-unstyled mb-2">
                <li className="divider"></li>
                <li>
                  <a role="menuitem" onClick={() => redirectToProfile()}>
                    <i className="bx bx-user-circle">
                      <ProfileIcon />
                    </i>
                    My Profile
                  </a>
                </li>
                <li>
                  <a role="menuitem" onClick={signOut}>
                    <i className="bx bx-power-off">
                      <LogoutIcon width="17" height="17" />
                    </i>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
