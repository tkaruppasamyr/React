import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";

class Axios{

    readonly axiosinstance:AxiosInstance;

    constructor(){
        this.axiosinstance = axios.create({
            baseURL: 'http://127.0.0.1:8000',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        this.initializeInterceptors();
    }

    private initializeInterceptors(){
        const a = this.axiosinstance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                // You can modify the request config here if needed
                return config;
            },
            (error) => {
                // Handle request error here
                return Promise.reject(error);
            }
        )
        console.log("what is interceptors", a);
    }

    public async Post(url:string, data:any){
        return await this.axiosinstance.post(url, data);
    }

    public async Get(url:string){        
        return await this.axiosinstance.get(url);
    }

    public async Put(url:string, data:any){
        return await this.axiosinstance.put(url, data);
    }

    public async Delete(url:string){
        return await this.axiosinstance.delete(url);
    }

    public async Patch(url:string, data:any){
        return await this.axiosinstance.patch(url, data);
    }
}

export const axiosInstance = new Axios();