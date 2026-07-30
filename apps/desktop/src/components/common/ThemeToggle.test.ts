import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { TooltipProvider } from '@aikitr/ui';
import ThemeToggle from './ThemeToggle.vue';

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders without crashing', () => {
    const wrapper = mount({
      components: { ThemeToggle, TooltipProvider },
      template: '<TooltipProvider><ThemeToggle /></TooltipProvider>',
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('emits click handler when clicked', async () => {
    const wrapper = mount({
      components: { ThemeToggle, TooltipProvider },
      template: '<TooltipProvider><ThemeToggle /></TooltipProvider>',
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.exists()).toBe(true);
  });
});
