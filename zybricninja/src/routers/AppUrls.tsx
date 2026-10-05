import {useRoutes} from "react-router-dom";
import { DataScienceUrls } from "../datascience/DataScienceUrls";
import { FilerUploadUrls } from "../fileupload/FilerUploadUrls";

const routes = [
    {
        path: "/",
        children: [
            {
                index: true,
                element: <h1>Homes</h1>
            },
            ...DataScienceUrls,
            ...FilerUploadUrls
        ]
    },
    
]


export default function AppUrls(){
    return useRoutes(routes);
}


