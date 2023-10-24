import React from 'react';
import { shallow } from 'enzyme';
import useLocalVideoToggle from '../../../hooks/useLocalVideoToggle/useLocalVideoToggle';

import ToggleSpeakerView from './ToggleSpeakerView';
import VideoOffIcon from '../../../icons/VideoOffIcon';
import VideoOnIcon from '../../../icons/VideoOnIcon';
import useDevices from '../../../hooks/useDevices/useDevices';

jest.mock('../../../hooks/useDevices/useDevices');
jest.mock('../../../hooks/useLocalVideoToggle/useLocalVideoToggle');

const mockUseLocalVideoToggle = useLocalVideoToggle as jest.Mock<any>;
const mockUseDevices = useDevices as jest.Mock<any>;

describe('the ToggleSpeakerView component', () => {
  beforeAll(() => {
    mockUseDevices.mockImplementation(() => ({ hasVideoInputDevices: true }));
  });

  it('should render correctly when video is enabled', () => {
    mockUseLocalVideoToggle.mockImplementation(() => [true, () => {}]);
    const wrapper = shallow(<ToggleSpeakerView />);
    expect(wrapper.prop('startIcon')).toEqual(<VideoOnIcon />);
    expect(wrapper.text()).toBe('Stop Video');
  });

  it('should render correctly when video is disabled', () => {
    mockUseLocalVideoToggle.mockImplementation(() => [false, () => {}]);
    const wrapper = shallow(<ToggleSpeakerView />);
    expect(wrapper.prop('startIcon')).toEqual(<VideoOffIcon />);
    expect(wrapper.text()).toBe('Start Video');
  });
});
