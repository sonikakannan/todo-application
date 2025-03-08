import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import RightSidebar from './components/RightSidebar';
import { ToastContainer} from "react-toastify";



const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(0);
  const [selectedTask, setSelectedTask] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
   
      <div>
      <ToastContainer/>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setActiveFilter={setActiveFilter} />
      <div className='flex'>
        <div className='w-[60%]'>
          <Routes>
            <Route path='/' element={<Home setSelectedTask={setSelectedTask} />} /> {/* Pass setSelectedTask */}
          </Routes>
        </div>
       
        <RightSidebar task={selectedTask} />
      
      </div>
    </div>
  
  );
};

export default App;
