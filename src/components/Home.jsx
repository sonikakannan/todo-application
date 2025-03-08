import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCheck, toggleStar } from '../redux/taskSlice';
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoRepeat } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { FaRegStar, FaStar, FaCheckSquare } from 'react-icons/fa';
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import ListInput from './ListInput';

const Home = ({ setSelectedTask }) => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className='bg-[#FBFDFC] '>
      <div className='shadow-md mb-4 p-3'>
        <select>
          <option value="To Do">To Do</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className='bg-gradient-to-b from-[#FBFDFC] via-[#e8f7e8] to-[#e3fbe3] p-5 h-44 flex flex-col justify-between'>
        <p className='px-3 font-medium text-gray-600 text-lg'>Add A Task</p>
        <div className='flex justify-between items-center px-3'>
          <div className='flex gap-3'>
            <IoMdNotificationsOutline className='w-6 h-6' />
            <IoRepeat className='w-6 h-6' />
            <CiCalendar className='w-6 h-6' />
          </div>
          <div>
            <button 
              className='text-[#357937] bg-[#cff3d0] px-4 py-2 rounded-md font-semibold'
              onClick={() => setIsModalOpen(true)}
            >
              ADD TASK
            </button>
          </div>
        </div>
      </div>

      {/* Task List */}
      {tasks.map((task, index) => (
        <div key={index} className='flex justify-between items-center mt-2 p-5 border-t-[3px] border-gray-300' onClick={() => setSelectedTask(task)}>
          <div className='flex gap-2 font-semibold text-gray-600'>
            {/* Toggle Checkbox */}
            <button onClick={(e) => { e.stopPropagation(); dispatch(toggleCheck(task.id)); }}>
              {task.isChecked ? <FaCheckSquare className='w-6 h-6 text-green-700' /> : <MdOutlineCheckBoxOutlineBlank className='w-6 h-6' />}
            </button>
            <p className={`text-gray-600 font-semibold ${task.isChecked ? 'line-through' : ''}`}>{task.text}</p>
          </div>

          {/* Toggle Star */}
          <button onClick={(e) => { e.stopPropagation(); dispatch(toggleStar(task.id)); }}>
            {task.isStarred ? <FaStar className='w-6 h-6 text-black' /> : <FaRegStar className='w-6 h-6' />}
          </button>
        </div>
      ))}

      <ListInput isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
};

export default Home;