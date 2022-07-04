import {defineStore} from "pinia";


export interface CurrentTime{
    locale: {default: string, all: string[]},
    time: string | null,
    date: string | null
}

const useCurrentTimeStore = defineStore('currentTime', {
    state: () : CurrentTime => ({
        locale: {
            default: "",
            all: []
        },
        time: null,
        date: null
    }),

    getters: {
        getCurrentLocale: (state) : string => state.locale.default,
        getAllLocale: (state) : string[] => state.locale.all,
        getTime: (state) : string | null => state.time,
        getDate: (state) : string | null => state.date
    },

    actions: {
        setDefaultLocale(locale : string){
            this.locale = {
                ...this.locale,
                default: locale
            }
        },

        setAllLocale(locales : string[]){
            this.locale = {
                ...this.locale,
                all: locales
            }
        },
        setDateTime(time: string, date : string){
            this.time = time
            this.date = date
        }
    }
})

export default useCurrentTimeStore