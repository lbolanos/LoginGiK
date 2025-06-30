import { mount } from '@vue/test-utils';
import App from '../App.vue';

describe('App.vue', () => {
  it('renders without crashing', () => {
    const wrapper = mount(App, {
      global: {
        stubs: ['router-view'],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
