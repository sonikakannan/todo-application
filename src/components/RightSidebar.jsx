import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegStar, FaStar } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoRepeat } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { FaXmark } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const API_KEY = "00e95e7e8739a95e19bf68368d71dec4"; 

const RightSidebar = ({ task, onDelete }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });

  useEffect(() => {
    if (task) {
      const savedDate = localStorage.getItem(`dueDate-${task.id}`);
      if (savedDate) {
        setDueDate(dayjs(savedDate));
      }
    }

    // Get user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => console.error("Error getting location:", error)
    );
  }, [task]);

  const fetchWeather = async (lat, lon) => {
    if (!lat || !lon) return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            lat,
            lon,
            appid: API_KEY,
            units: "metric",
          },
        }
      );

      const data = response.data;
      if (data.main && data.weather && data.weather.length > 0) {
        setWeather({
          temp: data.main.temp,
          condition: data.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        });
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const handleDateChange = (newValue) => {
    setDueDate(newValue);
    localStorage.setItem(`dueDate-${task.id}`, newValue.toISOString());
    setShowCalendar(false);
    fetchWeather(location.lat, location.lon);
  };

  const handleDeleteTask = () => {
    if (!task) return;

    const storedTasks = JSON.parse(localStorage.getItem("Add-task")) || [];
    const updatedTasks = storedTasks.filter((t) => t.id !== task.id);
    localStorage.setItem("Add-task", JSON.stringify(updatedTasks));
    localStorage.removeItem(`dueDate-${task.id}`);

    if (onDelete) {
      onDelete(task.id);
    }

    toast.success("Task deleted successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  if (!task) {
    return (
      <div className="bg-[#EEF6EF] w-[40%] min-h-screen p-3 flex items-center justify-center text-gray-500">
        Select a task to view details
      </div>
    );
  }

  return (
    <div className="bg-[#EEF6EF] w-[40%] h-full p-3 flex flex-col justify-between">
      <ToastContainer />
      <div>
        <div className="flex justify-between items-center p-5 border-t-[3px] border-gray-300">
          <div className="flex gap-2 font-semibold text-gray-600">
            <input type="checkbox" checked={task?.isChecked || false} readOnly />
            <label>{task?.text || "No Task Selected"}</label>
          </div>
          {task.isStarred ? <FaStar className="text-black" /> : <FaRegStar />}
        </div>

        <div className="flex gap-3 items-center p-5 border-t-[3px] border-gray-300">
          <FiPlus className="w-6 h-6 text-gray-600" />
          <p className="text-gray-600 font-semibold">Add Step</p>
        </div>
        <div className="flex gap-3 items-center p-5 border-t-[3px] border-gray-300">
          <IoMdNotificationsOutline className="w-6 h-6 text-gray-600" />
          <p className="text-gray-600 font-semibold">Set Reminder</p>
        </div>

        {/* Due Date Section */}
        <div
          className="flex gap-3 items-center p-5 border-t-[3px] border-gray-300 cursor-pointer"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <CiCalendar className="w-6 h-6 text-gray-600" />
          <p className="text-gray-600 font-semibold">
            {dueDate ? dayjs(dueDate).format("MMM DD, YYYY") : "Add Due Date"}
          </p>
        </div>

        {showCalendar && (
          <div className="p-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar value={dueDate} onChange={handleDateChange} />
            </LocalizationProvider>
          </div>
        )}

        {/* Weather Section */}
        {dueDate && weather && (
          <div className="flex gap-3 items-center p-5 border-t-[3px] border-gray-300">
            <img src={weather.icon} alt="Weather Icon" className="w-8 h-8" />
            <p className="text-gray-600 font-semibold">
              {weather.temp}°C - {weather.condition}
            </p>
          </div>
        )}

        <div className="flex gap-3 items-center p-5 border-t-[3px] border-gray-300 border-b-[3px]">
          <IoRepeat className="w-6 h-6 text-gray-600" />
          <p className="text-gray-600 font-semibold">Repeat</p>
        </div>
      </div>

      <div className="flex justify-between border-t-2 border-t-gray-300 mt-56 py-4">
        <FaXmark className="text-gray-600" />
        <p className="text-gray-500 font-semibold">
          {dueDate ? dayjs(dueDate).format("MMM DD, YYYY") : "Created Today"}
        </p>
        <MdDelete
          className="w-6 h-6 cursor-pointer text-red-600 hover:text-red-800"
          onClick={handleDeleteTask}
        />
      </div>
    </div>
  );
};

export default RightSidebar;