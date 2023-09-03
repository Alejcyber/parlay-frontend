import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import New from './components/new/New';
import List from './components/list/List';

function App() {

  return (
    <HashRouter basename="/">
      <Navbar />
      <div className='container-fluid'>
        <Routes>
          <Route path='/' element={<New/>} /> 
          <Route path='/new' element={<New/>} /> 
          <Route path='/list' element={<List/>} /> 
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
