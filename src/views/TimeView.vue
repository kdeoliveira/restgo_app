<template>
  <v-card class="mx-auto">
    <v-card-title>
      Current Time
    </v-card-title>
    <v-card-text>
      <div class="flex">
        <span>
          {{ useCurrentTime.getDate }}
        </span>
        <span>
          {{ useCurrentTime.getTime }}
        </span>
      </div>
    </v-card-text>
    <v-card-text>
      <v-select :items="items" label="Format" outlined v-model.trim="selected"></v-select>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="() => {
        useCurrentTime.setDefaultLocale(selected)
      }">
        Fetch
      </v-btn>
    </v-card-actions>
  </v-card>



</template>

<script lang="ts" setup>
// Components
import ApiService from "@/service";
import useCurrentTimeStore from "@/stores";

import { ref, watchEffect } from "vue";

const useCurrentTime = useCurrentTimeStore()

const items = ref<string[]>([])

const selected = ref<string>("")



watchEffect(() => {
    ApiService.fetchCurrentTime("time", useCurrentTime.getCurrentLocale).then(
      (x) => {
        selected.value = useCurrentTime.getCurrentLocale
        items.value = useCurrentTime.getAllLocale
        useCurrentTime.setDateTime(x.time, x.date)
      }
    ).catch(
      (e) => {
        console.error(e)
      }
    )
})

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

.flex_container {
  display: flex;
  justify-content: space-evenly;
}
</style>