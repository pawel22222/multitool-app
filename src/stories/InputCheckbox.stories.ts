import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import InputCheckbox from '@/components/form/InputCheckbox';

const meta = {
  title: 'Form/InputCheckbox',
  component: InputCheckbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { id: 'checkbox', label: 'Dark mode', onChange: fn() },
} satisfies Meta<typeof InputCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Unchecked: Story = {
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};
