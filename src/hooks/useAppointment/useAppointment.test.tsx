import { act, renderHook } from '@testing-library/react-hooks';
import EventEmitter from 'events';
import useAppointment from './useAppointment';

describe('the useTrack hook', () => {
  let mockPublication: any;

  beforeEach(() => {
    mockPublication = new EventEmitter();
  });

  it('should return mockPublication.track by default', () => {
    mockPublication.track = 'mockTrack';
    const { result } = renderHook(() => useAppointment(mockPublication));
    expect(result.current).toBe('mockTrack');
  });
});
