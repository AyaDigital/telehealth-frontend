import { useCallback, useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: process.env.REACT_APP_KEYCLOAK_URL,
  realm: process.env.REACT_APP_KEYCLOAK_REALM || 'aya-realm',
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT || 'web-client',
};
const keycloak = new Keycloak(keycloakConfig);

export default function useKeycloakAuth() {
  // TODO: review
  const [user, setUser] = useState<{ displayName: undefined; photoURL: undefined; passcode: string } | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [roles, setRoles] = useState<string[]>([]);
  const [avatarUrl, setAvatarUrl] = useState<string>();

  const getToken = useCallback(
    async (user_identity: string, room_name: string) => {
      const headers = new window.Headers();

      headers.set('Authorization', `Bearer ${user}`);
      headers.set('content-type', 'application/json');

      const endpoint = process.env.REACT_APP_BACKEND_URL + '/token' || '/token';

      return fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          appointmentId: room_name,
          create_conversation: process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== 'true',
        }),
      }).then(res => res.json());
    },
    [user]
  );

  const updateRecordingRules = useCallback(
    async (room_sid, rules) => {
      const headers = new window.Headers();

      const idToken = ''; //TODO
      headers.set('Authorization', idToken);
      headers.set('content-type', 'application/json');

      return fetch('/recordingrules', {
        method: 'POST',
        headers,
        body: JSON.stringify({ room_sid, rules }),
      }).then(async res => {
        const jsonResponse = await res.json();

        if (!res.ok) {
          const recordingError = new Error(
            jsonResponse.error?.message || 'There was an error updating recording rules'
          );
          recordingError.code = jsonResponse.error?.code;
          return Promise.reject(recordingError);
        }

        return jsonResponse;
      });
    },
    [user]
  );

  useEffect(() => {
    const headers = new window.Headers();
    const endpoint = process.env.REACT_APP_BACKEND_URL + '/user';

    headers.set('Authorization', `Bearer ${user}`);
    headers.set('content-type', 'application/json');

    fetch(endpoint, {
      headers,
    })
      .then(response => response.json())
      .then(data => {
        setName(data.name);
        setRoles(data.roles);
      })
      .catch(error => console.error(error));
  }, [user]);

  useEffect(() => {
    const headers = new window.Headers();
    const endpoint = process.env.REACT_APP_BACKEND_API + '/profile';

    headers.set('Authorization', `Bearer ${user}`);
    headers.set('content-type', 'application/json');

    fetch(endpoint, {
      headers,
    })
      .then(response => response.json())
      .then(data => {
        setAvatarUrl(data.avatarUrl);
      })
      .catch(error => console.error(error));
  }, [user]);

  useEffect(() => {
    setIsFetching(true);
    keycloak
      .init({ onLoad: 'check-sso' })
      .then(authenticated => {
        setIsAuthReady(true);
        if (authenticated) {
          setUser(keycloak.token as any); //TODO: review
        }
      })
      .finally(() => {
        setIsFetching(false);
      });

    setIsAuthReady(true);
  }, []);

  const signIn = useCallback(() => {
    setIsFetching(true);
    return keycloak.login();
  }, []);

  const signOut = useCallback(() => {
    setIsFetching(true);
    setUser(null);
    return keycloak.logout(); //TODO: review
  }, []);

  return { user, name, roles, signIn, signOut, isAuthReady, getToken, updateRecordingRules, isFetching, avatarUrl };
}
export {};
