// @ts-ignore
import {AbortController} from "node-abort-controller";

export interface Fetch{
    get : (url: string, options: FetchOptions) => FetchReturn,
    post : (url: string, options: FetchOptions) => FetchReturn,
    delete : (url: string, options: FetchOptions) => FetchReturn
}

export type FetchReturn = Promise<{
    valid: boolean,
    status: number,
    result: any
}>

export interface FetchOptions{
    params?: string,
    query?: {[x:string]: string},
    credentials?: boolean,
    headers?: {[x:string]: string},
    timeout?: number,
    notJson?: boolean,
    body?:{[x: string] : any}

}

const internal_fetch = async (url: string, method: "get" | "post" | "delete", options: FetchOptions) => {
    let str = url;
    if(options.params && !url.endsWith("/")) str = url.concat("/");
    str = str.concat(options.params || "");


    if(options.query){

        str = str.concat(
            // @ts-ignore
            Object.entries(options.query).map((val : any,i : number) => {
                if(i === 0)
                    return "?".concat(val.join("="))
                return val.join("=")
            }).join("&")
        )

    }

    const controller = new AbortController();

    const timeout = options.timeout ? setTimeout(() => controller.abort(), options.timeout) : null;
    try {
        const API_HOST="http://127.0.0.1:8000"
        str = API_HOST.concat(str)
        console.log(str)
        const x = await fetch(str, {
            method: method,
            credentials: options.credentials ? "include" : "omit",
            mode: "cors",
            headers: {
                "Content-type": "application/json",
                ...options.headers,
                // "xsrf-token": method === "post" ? csrf.token : ""
            },
            signal: timeout ? controller.signal : undefined,
            body: JSON.stringify(options.body),

        });

        timeout && clearTimeout(timeout)


        if(!x.ok)
            return {
                valid: false,
                status: x.status,
                result: await x.json().then(
                    (j) => {
                        return j;
                    }
                ).catch(
                    (jE) => {
                        return x.statusText
                    }
                )
            }

        return {
            valid: true,
            status: x.status,
            result: await x.json()
        }



    } catch (error : any) {

        return {
            valid: false,
            status: 500,
            result: error.message || error.name
        }
    }
    finally{
        timeout && clearTimeout(timeout)
    }
}


const request : Fetch = {
    get: async (url: string, options: FetchOptions) => internal_fetch(url, "get", options),
    post: async (url: string, options : FetchOptions) => internal_fetch(url, "post", options),
    delete: async (url: string, options : FetchOptions) => internal_fetch(url, "delete", options)

}

export default request;