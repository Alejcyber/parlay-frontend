import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import New from './components/New';
import List from './components/List';
import { createContext } from 'react';

const MyContext = createContext(null);

function App() {

  return (
    <HashRouter basename="/">
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<New/>} /> 
          <Route path='/new' element={<New/>} /> 
          <Route path='/list' element={<List/>} /> 
        </Routes>
        <MyContext.Provider value={null}>
          {/* Your components here */}
        </MyContext.Provider>
      </div>
    </HashRouter>
  );
}

export default App;
