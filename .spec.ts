```ts
import { shallowMount } from '@vue/test-utils';
import TaskItem from '@/components/TaskItem.vue';

describe('TaskItem.vue', () => {
  const task = {
    id: 1,
    title: 'Test task',
    completed: false,
  };

  it('renders task title', () => {
    const wrapper = shallowMount(TaskItem, {
      propsData: { task },
    });
    expect(wrapper.text()).toContain(task.title);
  });

  it('emits delete event with task id when delete button is clicked', async () => {
    const wrapper = shallowMount(TaskItem, {
      propsData: { task },
    });
    const deleteButton = wrapper.find('button.delete');
    await deleteButton.trigger('click');
    expect(wrapper.emitted('delete')).toBeTruthy();
    expect(wrapper.emitted('delete')![0]).toEqual([task.id]);
  });
});
```