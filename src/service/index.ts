import Service from "@/lib/decorator";
import request from "@/lib/request";



export default class ApiService{

    @Service({
        path: import.meta.env.VITE_API_HOST
    })
    public static async getStatus(path: string){
        try{
            const x = await request.get(path, {
                credentials: true
            });

            if(x.valid){
                return x.result
            }
        }catch(e : any){
            return e
        }
    }

    @Service({
        path: import.meta.env.VITE_API_HOST
    })
    public static async fetchCurrentTime(path: string, locale: string){
        try{
            const x = await request.get(path, {
                query: {
                    locale
                },
                credentials: true
            });

            if(x.valid){
                return x.result
            }
        }catch(e : any){
            return e
        }
    }

    @Service({
        path: import.meta.env.VITE_API_HOST
    })
    public static async fetchAllLocale(path: string){
        try{
            const x = await request.get(path, {
                credentials: true
            });

            if(x.valid){
                return x.result
            }
        }catch(e : any){
            return e
        }
    }
}