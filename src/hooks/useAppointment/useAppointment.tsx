import { useEffect, useState, useMemo } from 'react';
import { useAppState } from '../../state/';

type ParticipantT = {
  firstname: string;
  lastname: string;
  photo: string;
};

export default function useAppointment(roomName: string | undefined) {
  const { user } = useAppState();
  const [participant, setParticipant] = useState<ParticipantT>();
  const [appointmentDate, setAppointmentDate] = useState<string>('2023-12-12');
  const [appointmentType, setAppointmentType] = useState<string>('ONLINE');
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (data: any) => {
    setParticipant(data.participant);
    setAppointmentDate(data.startDate);
    setAppointmentType(data.type);
  };

  const headers = useMemo(() => new window.Headers(), []);

  headers.set('Authorization', `Bearer ${user}`);
  headers.set('content-type', 'application/json');

  useEffect(() => {
    if (roomName) {
      const endpoint = process.env.REACT_APP_BACKEND_API + '/appointments/' + roomName;

      setIsLoading(true);

      fetch(endpoint, {
        headers,
      })
        .then(response => response.json())
        .then(data => {
          setIsLoading(false);
          handleNameChange(data);
        })
        .catch(error => {
          setIsLoading(false);
          console.error(error);
        });
    }
  }, [roomName, headers]);

  return { isLoading, participant, appointmentDate, appointmentType };
}
