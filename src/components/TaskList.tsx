import { useTaskState } from '../hooks/useTaskState';
import { useDispatch } from 'react-redux';
import {
  deleteTask,
  toggleEditMode,
  updateTask,
} from '../features/tasks/taskSlice';

const TaskList = () => {
  const { tasks } = useTaskState();
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    console.log(id);
    // my action - dispatch are the  actions
    dispatch(deleteTask({ id }));
  };

  const handleEditTask = (id: string) => {
    dispatch(toggleEditMode({ id, editMode: true }));
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
      {tasks.map((task) => {
        return (
          <div key={task.id} className="card bg-gray-900">
            <div className="card-body">
              <h3 className="card-title">{task.title}</h3>
              <p>{task.description}</p>
              <div className="card-actions">
                <button
                  className="btn-error btn"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>

                <button
                  className="btn-secondary btn"
                  onClick={() => handleEditTask(task.id)}
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};
export default TaskList;
