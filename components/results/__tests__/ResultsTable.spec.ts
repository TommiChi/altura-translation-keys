import { mount } from '@vue/test-utils';
import ResultsTable from '../ResultsTable.vue';

describe('ResultsTable.vue', () => {
  it('renders without crashing', () => {
    const wrapper = mount(ResultsTable);
    expect(wrapper.exists()).toBe(true);
  });

  // Add more tests based on component logic/props/events
});
