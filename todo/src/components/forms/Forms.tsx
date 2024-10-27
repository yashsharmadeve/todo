import { Close } from '@mui/icons-material'
import { Dispatch, SetStateAction } from 'react';

interface FormDataProps {
    pending: boolean,
    open: boolean,
}

interface FormsProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<FormDataProps>>
}

const Forms = ({ formData, setFormData, handleSubmit }: FormsProps) => {
    return (
        <div className={`fixed w-full h-screen left-0 top-0 items-center justify-center bg-slate-300 bg-opacity-35 ${formData.open ? 'flex' : 'hidden'}`}>
            <form className="bg-white p-5 rounded min-w-[400px] relative pt-7">
                <div className='absolute top-2 right-2 bg-red-600 text-white rounded-full cursor-pointer h-6 flex items-center justify-center w-6' onClick={() => setFormData(prev => ({ ...prev, open: false, data: {} }))}>
                    <Close fontSize='small' />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                    <input value={formData.data.name}
                        onChange={(e) => {
                            setFormData(prev => ({
                                ...prev,
                                data: {
                                    ...prev.data,
                                    name: e.target.value
                                }
                            }))
                        }}
                        type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="task" className="block mb-2 text-sm font-medium text-gray-900 ">Due Date</label>
                    <div className="relative max-w-sm">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                        </div>
                        <input
                            value={formData.data.date}
                            onChange={(e) => {
                                setFormData(prev => ({
                                    ...prev,
                                    data: {
                                        ...prev.data,
                                        date: e.target.value
                                    }
                                }))
                            }}
                            id="default-datepicker" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 " placeholder="Select date" />
                    </div>
                </div>
                <div className='mb-5'>
                    <label htmlFor="task" className="block mb-2 text-sm font-medium text-gray-900 ">Status</label>
                    <select
                        value={formData.data.status}
                        onChange={(e) => {
                            setFormData(prev => ({
                                ...prev,
                                data: {
                                    ...prev.data,
                                    status: e.target.value
                                }
                            }))
                        }}
                        className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    >
                        <option disabled>--Select value--</option>
                        <option value="0">pending</option>
                        <option value="1">Completed</option>
                    </select>
                </div>
                <div className="inline-flex items-center mb-5">
                    <label className="flex items-center cursor-pointer relative">
                        <input
                            type="checkbox"
                            checked={formData.data.priority}
                            onChange={(e)=>{
                                const d = e.target.checked ? 1 : 0
                                setFormData(prev => ({
                                    ...prev,
                                    data: {
                                        ...prev.data,
                                        priority: d
                                    }
                                }))
                            }}
                            className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                            id="check"
                        />
                        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="1"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </span>
                    </label>
                    <span className='ml-3'>Priority</span>
                </div>
                <button type="submit" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    )
}

export default Forms