import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Sidebar from './Components/Sidebar';
import Dashboard from './pages/Dashboard';
import Footer from './Components/Footer';
import Header from './Components/Navbar';
import Navbar from './Components/Navbar';
import TaskManager from './pages/Taskmanager';


function App() {
  
  return (
    <Provider store={store}>
      <Router>
        <Navbar/>
        <div style={{ display: 'flex' } } className=' overflow-hidden'>
          <Sidebar />
          <main style={{ flexGrow: 1, padding: '20px', background: '#1e1e2d', color: '#fff' }} className='overflow-hidden'>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<div className=' p-5 md:pl-60 w-full  '>
                <div className="bg-[#2C2B5A] bg-opacity-55 w-full p-5 mx-auto
                flex justify-center  flex-col  ">
                  <h1 className='text-white text-[2rem]   font-light '>hello , <span className='text-[#8E44AD] text-[3rem] font-bold '>   Tushar </span></h1>

                <TaskManager />
                </div>
                </div>
                } />
            </Routes>
          </main>
        </div>
        <Footer/>
      </Router>
    </Provider>
  );
}

export default App;
