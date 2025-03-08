import { useDispatch } from 'react-redux';
import { addTask } from '../redux/taskSlice'; // ✅ Correct import
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';

const ListInput = ({ isOpen, onClose }) => {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask(task));
      setTask('');
      onClose();
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="add-task-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
          textAlign: 'center'
        }}
      >
        <Typography variant="h6" mb={2}>Add a Task</Typography>
        <TextField
          fullWidth
          label="Task Name"
          variant="outlined"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ mt: 2, background: '#3F9142' }}
          onClick={handleAddTask}
        >
          Add
        </Button>
      </Box>
    </Modal>
  );
};

export default ListInput;
