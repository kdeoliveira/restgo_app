<template>
  
    <v-card class="mx-auto">
    <v-card-title>
      Current Time
    </v-card-title>
    <v-card-text>
      <div class="flex" v-if="date_time.date.length">
        <span>
          {{date_time.time}}
        </span>
        <span>
          {{date_time.date}}
        </span>
      </div>
      <div class="flex" v-else>
        Awaiting response from socket
      </div>
    </v-card-text>
    <v-card-text>
      Date fetched via websocket (Ping every 60 sec)
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">

import { onMounted, reactive, ref } from 'vue';
import worker from "@/lib/worker"
import webWorker from '@/lib/webWorker';

const clock = webWorker(worker)
const seconds = ref(1)

const updateClock = () => {
  clock.postMessage(seconds.value)
  //Main thread listening for any message event
  clock.addEventListener('message', e => {
        seconds.value = e.data;
})
}

onMounted(() => {
  updateClock()
})

const date_time = reactive({
  date: "",
  time: ""
})


var conn = new WebSocket("ws://localhost:8000/ws")

conn.onmessage = function(evt){
  const data = JSON.parse(evt.data)
  if(data){
    date_time.date = data.date
    date_time.time = data.time
  }
}

</script>

<style scoped>

.flex {
  display: flex;
  justify-content: space-around;
  align-items: center;
  align-content: center;
}

.flex>* {
  font-size: 16px !important;
}

</style>
