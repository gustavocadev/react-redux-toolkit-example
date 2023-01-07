import { useForm } from 'react-hook-form';
import { Task } from '../types/types';
import { useDispatch } from 'react-redux';
import {
  createNewTask,
  toggleEditMode,
  updateTask,
} from '../features/tasks/taskSlice';
import { useTaskState } from '../hooks/useTaskState';
import { useEffect, useMemo } from 'react';

type TaskFormData = Omit<Task, 'id'>;

const TaskForm = () => {
  const dispatch = useDispatch();
  const { editMode, taskIdSelectedToEdit, tasks } = useTaskState();
  const task = useMemo(
    () => tasks.find((task) => task.id === taskIdSelectedToEdit),
    [taskIdSelectedToEdit]
  );

  const { formState, register, handleSubmit, setValue } =
    useForm<TaskFormData>();

  useEffect(() => {
    if (editMode) {
      setValue('title', task?.title ?? '');
      setValue('description', task?.description ?? '');
      return;
    }
  }, [editMode]);

  const handleTaskFormData = (taskFormData: TaskFormData) => {
    // just pass me the data, the type I've already defined it
    if (!editMode) {
      dispatch(
        createNewTask({
          ...taskFormData,
          id: crypto.randomUUID(),
        })
      );
      return;
    }
    dispatch(
      updateTask({
        ...taskFormData,
      })
    );
    dispatch(toggleEditMode({ id: '', editMode: false }));
    setValue('title', '');
    setValue('description', '');
  };

  return (
    <form
      onSubmit={handleSubmit(handleTaskFormData)}
      className="form-control gap-2"
    >
      <input
        className="input bg-slate-900"
        type="text"
        placeholder="Title"
        {...register('title', {
          required: true,
        })}
      />

      <textarea
        placeholder="Description"
        className="textarea bg-slate-900"
        {...register('description', { required: true })}
      ></textarea>

      <button type="submit" className="btn btn-primary">
        {task ? ' Editar' : 'Agregar Task'}
      </button>
    </form>
  );
};
export default TaskForm;
