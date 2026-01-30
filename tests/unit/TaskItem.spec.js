import { shallowMount } from '@vue/test-utils';
import TaskItem from '@/components/TaskItem.vue';

describe('TaskItem.vue', () => {
  const task = {
    id: 1,
    title: 'Test task',
    completed: false,
  };

  const factory = (propsData = {}, slots = {}) => {
    return shallowMount(TaskItem, {
      propsData: {
        task,
        ...propsData,
      },
      slots,
    });
  };

  it('renders task title', () => {
    const wrapper = factory();
    expect(wrapper.text()).toContain(task.title);
  });

  it('applies completed class when task is completed', async () => {
    const wrapper = factory({ task: { ...task, completed: true } });
    expect(wrapper.find('.task-item').classes()).toContain('completed');
  });

  it('emits "toggle" event when checkbox is changed', async () => {
    const wrapper = factory();
    const checkbox = wrapper.find('input[type="checkbox"]');
    await checkbox.setChecked();
    expect(wrapper.emitted('toggle')).toBeTruthy();
    expect(wrapper.emitted('toggle')[0]).toEqual([task.id]);
  });

  it('emits "delete" event when delete button is clicked', async () => {
    const wrapper = factory();
    const deleteButton = wrapper.find('button.delete');
    await deleteButton.trigger('click');
    expect(wrapper.emitted('delete')).toBeTruthy();
    expect(wrapper.emitted('delete')[0]).toEqual([task.id]);
  });
});