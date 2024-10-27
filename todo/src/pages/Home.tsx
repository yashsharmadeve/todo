import { useEffect, useState } from "react";
import Forms from "../components/forms/Forms";
import axios from "../axios/axios";
import Tasks from "../components/Tasks/Tasks";

const Home = () => {
  const [data, setData] = useState({
    pending: false,
    open: false,
    data: [],
  });
  const [formData,setFormData] = useState({
    open: false,
    data: {
        name:'',
        date: '',
        status: '',
        priority: ''
    }
  })
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:9900/api/tasks")
      .then((res) => {
        console.log(res.data);
        setData((prev) => ({ ...prev, data: res.data }));
        setFilteredData(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const task = e.target.value;
    if (task !== "") {
      const d = data.data.filter((item:{
        task: string
      }) => item.task == task);
      setFilteredData(d);
    } else {
      setFilteredData(data.data);
    }
  };

  const handleClick = (d) => {
    setFormData({
        open:true,
        data:d
    })
    axios.post('http://localhost:9900/api/tasks/add',formData).then(res=>console.log(res)).catch(err=>console.error(err))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData.data);
    axios.post('http://localhost:9900/api/tasks/add',formData).then(res=>console.log(res)).catch(err=>console.error(err))
  }

  return (
    <div>
      <div className="py-8 max-w-5xl mx-auto">
        <h1 className="text-center text-5xl text-main font-bold uppercase">
          Todo List
        </h1>
        <div className="flex justify-between mt-7">
          <button
            className="bg-indigo-500 text-white text-lg px-5 py-2 rounded"
            onClick={() => setFormData((prev) => ({ ...prev, open: true }))}
          >
            Add Task
          </button>
          <select
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          >
            <option value="">All</option>
            <option value="1">Completed</option>
            <option value="0">pending</option>
          </select>
        </div>

        <div className="mt-5">
          {filteredData.map((item, i) => {
            return (
              <div key={i} className="mt-4">
                <Tasks data={item} setData={setData} handleClick={handleClick} />
              </div>
            );
          })}
        </div>
        <Forms formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Home;
