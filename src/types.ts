import { LocalVideoTrack, RemoteVideoTrack, TwilioError } from 'twilio-video';

declare module 'twilio-video' {
  // These help to create union types between Local and Remote VideoTracks
  interface LocalVideoTrack {
    isSwitchedOff: undefined;
    setPriority: undefined;
  }
}

declare global {
  interface MediaDevices {
    getDisplayMedia(constraints: MediaStreamConstraints): Promise<MediaStream>;
  }

  interface HTMLMediaElement {
    setSinkId?(sinkId: string): Promise<undefined>;
  }

  // Helps create a union type with TwilioError
  interface Error {
    code: undefined;
  }
}

export type Callback = (...args: any[]) => void;

export type ErrorCallback = (error: TwilioError | Error) => void;

export type IVideoTrack = LocalVideoTrack | RemoteVideoTrack;

export type RoomType = 'group' | 'group-small' | 'peer-to-peer' | 'go';

export type RecordingRule = {
  type: 'include' | 'exclude';
  all?: boolean;
  kind?: 'audio' | 'video';
  publisher?: string;
};

export type RecordingRules = RecordingRule[];
export type GenderT = 'male' | 'female' | 'other' | 'unknown';

export type FullProfileT = {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  jwtUserUuid?: string;
  sex?: GenderT;
  ssn?: string;
  driverLicense?: null | string;
  birthDate?: string;
  weight?: string;
  height?: string;
  tin?: string;
  appeal?: number;
  avatarUrl?: string;
  phone?: string;
};
