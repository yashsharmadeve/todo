import { useState } from "react"
import Forms from '../components/forms/Forms';

const Home = () => {
    const [data,setData] = useState({
        pending: false,
        open: false,
        data: []
    });

    const fetchData = () => {
        
    }
    return (
        <div>
            <div className="py-8 max-w-5xl mx-auto">
                <h1 className="text-center text-5xl text-main font-bold uppercase">Todo List</h1>
                <div className="flex justify-between mt-7">
                    <button className="bg-indigo-500 text-white text-lg px-5 py-2 rounded" onClick={() => setData(prev=>({...prev,open: true}))}>
                        Add Task
                    </button>
                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                        <option value="">All</option>
                        <option value="1">Completed</option>
                        <option value="0">pending</option>
                    </select>
                </div>

                <div className="mt-5">
                    
                </div>
                <Forms open={data.open} setOpen={setData} />
            </div>
        </div>
    )
}

export default Home