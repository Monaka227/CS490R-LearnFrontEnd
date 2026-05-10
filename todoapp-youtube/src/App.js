import './App.css';
import { Title } from './components/Title'
import { InputForm } from './components/InputForm'
import { TodoList } from './components/TodoList';

function App() {
  return (
    <div className="body">
      <Title />
      <InputForm />
      <TodoList />
    </div>
  );
}

export default App;
