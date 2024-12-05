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
import SignupLogin from './Auth/login';
import { AuthProvider, ProtectedRoute } from './Auth/AuthProtectComponents';


function App() {
  
  return (
      <AuthProvider>

    <Provider store={store}>
      <Router>
            <Routes>
            <Route path="/login" element={<SignupLogin />} />
              <Route path="/" element={<ProtectedRoute>
                <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/tasks" element={<ProtectedRoute>
               
           <div className=' p-0.5 md:pl-60 w-full  '>
                <div className="bg-[#2C2B5A] bg-opacity-55 w-full  mx-auto
                flex justify-center  flex-col  ">
                  <h1 className='text-white text-[2rem]   font-light '>hello , <span className='text-[#8E44AD] text-[3rem] font-bold '>   Tushar </span></h1>
<div className="w-full">

                <TaskManager />
</div>
                </div>
                </div>
                </ProtectedRoute>
                } />
            </Routes>
      </Router>
    </Provider>
                </AuthProvider>
  );
}

export default App;
