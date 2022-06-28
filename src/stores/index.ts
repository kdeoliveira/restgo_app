import {defineStore} from "pinia";
import request from "@/lib/request";


export interface CurrentTime{
    locale: string,
    time: string | null,
    date: string | null
}

const useCurrentTimeStore = defineStore('currentTime', {
    state: () : CurrentTime => ({
        locale: "en_US",
        time: null,
        date: null
    }),

    getters: {
        getLocale: (state) : string => state.locale,
        getTime: (state) : string | null => state.time,
        getDate: (state) : string | null => state.date
    },

    actions: {
        setLocale(locale : string){
            this.locale = locale
        },

        async fetchCurrentTime(locale : string) {
            this.locale = locale
            try {
                const x = await request.get("/time", {
                    query: {
                        locale: locale
                    },
                    credentials: true
                });
                console.log(x)

                if(x.valid){
                    this.time = x.result.time
                    this.date = x.result.date
                }
            } catch (e: any) {
                this.time = null,
                this.locale = "en_US"
            }
        }
    }
})

export default useCurrentTimeStore;