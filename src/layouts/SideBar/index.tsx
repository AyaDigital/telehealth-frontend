import React, { useState, useEffect } from 'react';
import { Button, styled } from '@material-ui/core';
import PatientsIcon from '../../images/Icons/patientsIcon';
import DoctorsIcon from '../../images/Icons/doctorsIcon';
import MenuListIcon from '../../images/Icons/menuListIcon';
import CalendarIcon from '../../images/Icons/calendarIcon';
import AppointmentsManagementIcon from '../../images/Icons/appointmentsManagementIcon';
import ClinicsManagment from '../../images/Icons/clinicsManagment';
import { useAppState } from '../../state';

import './sideBar.scss';

type SideBarProps = {
  roles?: string[];
  loading?: boolean;
  isPatient?: boolean;
  isDoctor?: boolean;
};

const MenuButton = styled(Button)({
  width: '180px',
  border: 'none',
  height: '20px',
  '&:hover': {
    backgroundColor: 'rgba(245, 250, 255, 1)',
  },
});
const MenuSideBarButton = styled(Button)({
  width: '20px',
  '&:hover': {
    backgroundColor: 'rgb(245, 250, 255);',
  },
});

export const SideBar: React.FC<SideBarProps> = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const { roles } = useAppState();
  const clinicsManagmnet = roles?.includes('ROLE_ADMIN') || roles?.includes('ROLE_CMANAGER');
  const isPatient = roles?.includes('ROLE_PATIENT') && !roles?.includes('ROLE_PRACTITIONER');
  const isDoctor = roles?.includes('ROLE_PRACTITIONER');

  const navigate = (path: string) => {
    window.open(`https://account-beta.aya-doc.com${path}`, '_blank');
  };

  const redirectToAdministration = () => {
    window.open('https://admin.aya-doc.com/clinics', '_blank');
  };

  const redirectToCallsHistory = () => {
    window.open('https://viewier-logs.aya-doc.com/', '_blank');
  };

  useEffect(() => {
    const sidebar = document.getElementById('sidebar');
    const appLayout = document.getElementById('app-layout');
    if (isSideBarOpen) {
      sidebar?.classList.add('expanded');
      sidebar?.classList.remove('collapsed');
      appLayout?.classList.add('sidebar-expanded');
      appLayout?.classList.remove('sidebar-collapsed');
    } else {
      sidebar?.classList.remove('expanded');
      sidebar?.classList.add('collapsed');
      appLayout?.classList.add('sidebar-collapsed');
      appLayout?.classList.remove('sidebar-expanded');
    }
  }, [isSideBarOpen]);

  return (
    <div className="sidebar expanded" id="sidebar">
      <div className="sidebar-header">
        <div></div>
        <div className="sidebar-control">
          <MenuSideBarButton
            //variant="outlined"
            disableRipple={true}
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          >
            <MenuListIcon />
          </MenuSideBarButton>
        </div>
      </div>
      <div className="sidebar-body">
        <ul>
          {clinicsManagmnet && (
            <li>
              <MenuButton disableRipple={true} onClick={() => redirectToAdministration()}>
                <div className="button-label">
                  <ClinicsManagment />
                  <div className="menu-item-title">Clinics management</div>
                </div>
              </MenuButton>
            </li>
          )}
          <li>
            <MenuButton
              disableRipple={true}
              onClick={() => (isPatient ? navigate('/patient-appointments') : navigate('/appointments'))}
            >
              <div className="button-label">
                <AppointmentsManagementIcon />
                <div className="menu-item-title">Appointments managment</div>
              </div>
            </MenuButton>
          </li>
          {isPatient ? (
            <li>
              <MenuButton disableRipple={true} onClick={() => navigate('/doctors')}>
                <div className="button-label">
                  <DoctorsIcon />
                  <div className="menu-item-title">Doctors</div>
                </div>
              </MenuButton>
            </li>
          ) : (
            <li>
              <MenuButton disableRipple={true} onClick={() => navigate('/patients')}>
                <div className="button-label">
                  <PatientsIcon />
                  <div className="menu-item-title">Patients</div>
                </div>
              </MenuButton>
            </li>
          )}
          {isDoctor ? (
            <li>
              <MenuButton disableRipple={true} onClick={() => redirectToCallsHistory()}>
                <div className="button-label">
                  <CalendarIcon />
                  <div className="menu-item-title">Video calls history</div>
                </div>
              </MenuButton>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};
