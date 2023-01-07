import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  return (
    <main className="container mx-auto px-4 lg:px-[150px]">
      <h1 className="text-4xl py-3 font-semibold">App de Tasks</h1>
      <TaskForm />
      <TaskList />
    </main>
  );
}

export default App;
