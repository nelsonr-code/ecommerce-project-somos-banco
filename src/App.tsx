import './App.css';
import './assets/styles/index.css';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Main from './pages/main';

function App() {
  return (
    <Router>
      <div className="">
        <Main />
        {/* <Signup /> */}
        {/* <InputForm
        label="email"
        type="text"
        name="email"
        placeholder="type your email address"
        isRequired
      />
      <InputForm
        label="password"
        type="text"
        name="password"
        placeholder="type your password"
        isRequired
      /> */}
      </div>
    </Router>
  );
}

export default App;
