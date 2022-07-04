<template>
  <v-app>
    <v-layout>
      <v-app-bar
          color="primary"
      >
        <template #image>
          <v-img
              gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
          ></v-img>
        </template>

        

        <v-app-bar-title>REST APP</v-app-bar-title>

        <v-spacer></v-spacer>
        <router-link :to="{name: 'home'}" custom v-slot="{hread, navigate}" v-if="currentRoute == 'sync'">
          <v-btn icon @click="navigate">
            <v-icon>mdi-timelapse</v-icon>
          </v-btn>
        </router-link>
        <router-link :to="{name: 'sync'}" custom v-slot="{hread, navigate}" v-else>
          <v-btn icon @click="navigate">
            <v-icon>mdi-database-sync-outline</v-icon>
          </v-btn>
        </router-link>
        <v-btn icon @click="handlerOnRefresh">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-app-bar>

      <v-main>
        <v-snackbar v-model="apiDisconnected" centered>
            Unable to fetch the date and time.
        </v-snackbar>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">

import useCurrentTimeStore from "@/stores";
import { computed, onMounted, ref,  watch,  watchEffect } from "vue";
import { useRoute } from "vue-router";
import webWorker from "./lib/webWorker";
import ApiService from "./service";
import worker from "@/lib/worker"


const currentRoute = computed(() => useRoute().name)

const currentTimeStore = useCurrentTimeStore();

const apiDisconnected = ref<boolean>(currentTimeStore.getTime == null)


const checkConnection = webWorker(worker)

const updateConnectionStatus = () => {
        
  checkConnection.postMessage(apiDisconnected.value)
  
  
    //Main thread listening for any message event
  checkConnection.addEventListener('message', evt => {

    apiDisconnected.value = evt.data
  })
  
}

watch(apiDisconnected, () => {
  
  handlerOnRefresh()
  checkConnection.postMessage(apiDisconnected.value)

})


const handlerOnRefresh = () => {



      ApiService.fetchAllLocale("locale").then(
      (x) => {
        console.log(x)
        currentTimeStore.setAllLocale(x.locale)
        currentTimeStore.setDefaultLocale(x.default)
        
      }
      ).catch(
        (e) => {
          console.error(e)
        }
      )
    

    ApiService.fetchCurrentTime("time", currentTimeStore.getCurrentLocale).then(
      (x) => {
        currentTimeStore.setDateTime(x.time, x.date)
      }
    ).catch(
      (e) => {
        console.error(e)
      }
    )
  
}


onMounted(() => {
  updateConnectionStatus()
})


</script>

<style lang="scss" scoped>

</style>