import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { FaSun, FaEye, FaEdit, FaTrash, FaMoon, FaSlidersH } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  //darkmode
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  //todos
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });


  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  //model
  const [showmodal, setshowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState("");

  //save todos
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //darkmode
  useEffect(() => {
    localStorage.setItem("darkMode", isDark);
  }, [isDark]);

  //add
  const addTodo = () => {
    if (text.trim() === "") {
      toast.error("please enter a task");
      return;
    }
    if (editId) {
      setTodos(todos.map((t) => (t.id === editId ? { ...t, text } : t)));
      toast.success("task Updated Successfully");
      setEdited(null);
    } else {
      setTodos([...todos, { id: Date.now(), text }]);
      toast.success("task added successfully");
    }

    setText("");
  };
  //delete
  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
    toast.error("Task deleted");
  };
  //view
  const viewTodo = (todo) => {
    setSelectedTodo(todo);
    setshowModal(true);
  };
  //edit
  const editTodo = (todo) => {
    setText(todo.text);
    setEditId(todo.id);
  }


  return (
    <div>
      <div className={`min-h-screen flex items-center justify-center transition-all duration-300 ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`w-full max-w-xl rounded-2xl shadow-xl p-6
  ${isDark ? "bg-gray-900 text-white" : "bg-white text-black"}`}
        >
          {/*header*/}
          <div className='flex justify-between items-center mb-6'>
            <h1 className='text-xl font-semibold tracking-wide'>MY TODO LIST</h1>
            {/*<FaSun className='text-lg cursor-pointer' />*/}
            <button onClick={() => setIsDark(!isDark)} className='text-lg'>
              {isDark ? <FaMoon /> : <FaSun />}
            </button>
          </div>
          {/*top bar*/}
          <div className='flex justify-between items-center mb-5'>
            <span className='bg-indigo-500 text-white px-4 py-1.5 rounded-md text-ss'>TODO</span>
            <span className='text-ss bg-gray-700 px-3 py-1 rounded-md text-gray-300'>ALL</span>
          </div>
          {/*input data*/}
          <div className='flex gap-2 mb-6'>
            <input value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder='Enter Your Task...' className={`flex-1 px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-sm text-white focus:outline-none focus:border-indigo-500 ${isDark ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 "}`} />
            <button onClick={addTodo} className='bg-indigo-500 text-white px-4 rounded-md hover:bg-indigo-600'> {editId ? "update" : "Add"}</button>
          </div>

          {/*todo list*/}
          <div className='space-y-3'>
            {todos.map((t) => (

              <motion.div initial={{ opacity: 0, y: 0.95 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='flex justify-between items-center bg-gray-700 p-4 border border-gray-600 rounded-lg'>
                <div>
                  <p className='text-sm font-medium'>{t.text}</p>
                  <span className='text-xs text-gray-400'>Task Added</span>
                </div>
                <div className='flex gap-4 text-lg'>
                  <FaEye onClick={() => viewTodo(t)} className='text-gray-400 hover:text-gray-500 cursor-pointer' />
                  <FaEdit onClick={() => editTodo(t)} className='text-gray-400 hover:text-gray-500 cursor-pointer' />
                  <FaTrash onClick={() => deleteTodo(t.id)} className='text-gray-400 hover:text-gray-500 cursor-pointer' />
                </div>
              </motion.div>
            ))}
          </div>
          <ToastContainer position="top-right" autoClose="2000">

          </ToastContainer>
        </motion.div>

        {/* model design*/}
        {showmodal && (
          <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className={`w-80 rounded-lg p-6 bg-gray-800 text-white ${isDark ? "bg-gray-800" : "bg-white"}`}
            >
              <h3 className='font-semibold mb-2'>modal Contact</h3>
              <p className='mb-4'>{selectedTodo.text}</p>
              <button onClick={() => setshowModal(false)} className='bg-indigo-500 text-white px-4 py-1 rounded hover:bg-indigo-600'>Close</button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;