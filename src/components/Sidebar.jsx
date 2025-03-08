import React, { useState, useContext } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FiPlus } from "react-icons/fi";
import user from '../assets/user.png';
import { RiTodoLine } from "react-icons/ri";
import { CiCalendar } from "react-icons/ci";
import { FaRegStar, FaRegMap } from "react-icons/fa";
import { BiUserCheck } from "react-icons/bi";
import ListInput from './ListInput';
import { useSelector } from 'react-redux';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  

  const [activeIndex, setActiveIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tasks = useSelector(state => state.tasks);

  const menuItems = [
    { icon: <RiTodoLine className='w-5 h-5' />, text: "All Tasks" },
    { icon: <CiCalendar className='w-5 h-5' />, text: "Today" },
    { icon: <FaRegStar className='w-5 h-5' />, text: "Important" },
    { icon: <FaRegMap className='w-5 h-5' />, text: "Planned" },
    { icon: <BiUserCheck className='w-5 h-5' />, text: "Assigned to me" }
  ];

  const completedTasks = tasks.filter(task => task.isChecked).length;
  const totalTasks = tasks.length;
  const circleBorderColor = completedTasks === totalTasks ? '#142E15' : '#3F9142';

  return (
    <Drawer 
      anchor="left" 
      open={isOpen} 
      onClose={toggleSidebar} 

    >
      <div style={{ width: 250, padding: 16 }} className=''>
        <div className='bg-[#e9f8ea] relative rounded mt-15 p-3'>
          <img src={user} alt="user image" className='absolute -top-13 right-15 w-25 h-25' />
          <div className='bg-[#FBFDFC] rounded mt-13 px-2 cursor-pointer'>
            <List>
              {menuItems.map((item, index) => (
                <ListItem
                  key={index}
                  className={`flex gap-3 items-center ${activeIndex === index ? 'text-[#357937] bg-[#eafbeb]' : ''}`}
                  sx={{ fontSize: '700' }}
                  onClick={() => setActiveIndex(index)}
                >
                  {item.icon}
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </div>
          <div className='flex bg-[#FBFDFC] mt-2 rounded gap-5 p-5 font-semibold cursor-pointer' onClick={() => setIsModalOpen(true)}>
            <FiPlus className='w-6 h-6' />
            Add list
          </div>
          <div className='bg-[#FBFDFC] my-3 rounded p-3'>
            <p className='font-semibold'>Today Tasks</p>
            <p className='font-semibold'>{tasks.length}</p>
            <div className='flex items-center justify-center'>
              <div className='w-30 h-30 border-[30px] rounded-full' style={{ borderColor: circleBorderColor }}></div>
            </div>
            <div className='flex gap-2 mt-1'>
              <div className='flex gap-1 text-sm items-center font-semibold'>
                <div className='bg-[#3F9142] rounded w-2 h-2'></div> Pending
              </div>
              <div className='flex gap-1 text-sm items-center font-semibold'>
                <div className='bg-[#142E15] rounded w-2 h-2'></div> Done
              </div>
            </div>
          </div>
        </div>
      </div>
      <ListInput isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Drawer>
  );
};

export default Sidebar;
