import {FilerUploadHome} from './component/FileUploadHome'
import { CeleryStatus } from './component/CeleryStatus'

export const FilerUploadUrls = [
    {
        path: "file-upload/",        
        element: <FilerUploadHome />
    },
    {
        path: "celery-status/",
        element: <CeleryStatus />
    }
]