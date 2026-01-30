```js
import { shallowMount } from '@vue/test-utils';
import TaskItem from '@/components/TaskItem.vue';
import store from '@/store';

describe('TaskItem.vue', () => {
  const createWrapper = (props = {}, options = {}) => {
    return shallowMount(TaskItem, {
      store,
      propsData: {
        id: 1,
        title: 'Test task',
        completed: false,
        ...props,
      },
      ...options,
    });
  };

  it('renders task title', () => {
    const wrapper = createWrapper({ title: 'Write tests' });
    expect(wrapper.text()).toContain('Write tests');
  });

  it('applies completed class when task is completed', async () => {
    const wrapper = createWrapper({ completed: true });
    expect(wrapper.classes()).toContain('task-item--completed');
  });

  it('emits "toggle" event when checkbox is clicked', async () => {
    const wrapper = createWrapper();
    const checkbox = wrapper.find('input[type="checkbox"]');
    await checkbox.setChecked();
    expect(wrapper.emitted('toggle')).toBeTruthy();
    expect(wrapper.emitted('toggle')[0]).toEqual([1]);
  });

  it('emits "remove" event when delete button is clicked', async () => {
    const wrapper = createWrapper();
    const btn = wrapper.find('button.delete-task');
    await btn.trigger('click');
    expect(wrapper.emitted('remove')).toBeTruthy();
    expect(wrapper.emitted('remove')[0]).toEqual([1]);
  });

  it('dispatches "tasks/updateTask" action on toggle', async () => {
    const mockDispatch = jest.fn();
    const wrapper = createWrapper({}, {
      mocks: {
        $store: {
          ...store,
          dispatch: mockDispatch,
        },
      },
    });
    const checkbox = wrapper.find('input[type="checkbox"]');
    await checkbox.setChecked();
    expect(mockDispatch).toHaveBeenCalledWith('tasks/updateTask', {
      id: 1,
      completed: true,
    });
  });
});
```