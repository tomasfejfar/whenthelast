import { shallowMount } from '@vue/test-utils';
import Timer from '@/components/Timer.vue';

describe('Timer.vue', () => {
  it('renders title', () => {
    const title = 'Timer title';
    const wrapper = shallowMount(Timer, {
      propsData: { title: title }
    });
    expect(wrapper.find('h1').text()).toMatch(title);
  });
});
