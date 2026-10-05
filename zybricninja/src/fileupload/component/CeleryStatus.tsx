import { axiosInstance } from '../../api/axios';
import { celeryStatusapi } from '../../api/fileupload';
import { useEffect, useState } from 'react';


export const CeleryStatus = () =>{
    const [queueStatus, setQueueStatus] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await CeleryStatusApi();
                setQueueStatus(response.data);
                console.log('Celery Status Response:', response.data);
            } catch (error) {
                console.error('Error fetching Celery status:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className="mx-6 mt-4 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                    <tr>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Count</th>
                        <th className="px-6 py-3">Task</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {Object.entries(queueStatus ?? {}).map(
                        ([status, data]: [string, any]) => (
                            <tr key={status} className="bg-white hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                        {status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">{data.count}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {data.tasks.map((task: any) => (
                                        <div key={task.task_id}>
                                            {task.task_name}
                                        </div>
                                    ))}
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}
 

const CeleryStatusApi = async()=>{
  try{
    const response = await axiosInstance.Get(celeryStatusapi);
    if (response.statusText !== 'OK') {
      throw new Error('File upload failed');
    }
    return response;
  }catch(error){
    console.error('Error uploading file:', error);
    throw error;
  }
}
