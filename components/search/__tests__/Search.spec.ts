import { mount } from '@vue/test-utils';
import Search from '../Search.vue';

describe('Search.vue', () => {
  it('renders without crashing', () => {
    const wrapper = mount(Search);
    expect(wrapper.exists()).toBe(true);
  });

  // Add more tests based on component logic/props/events
});
