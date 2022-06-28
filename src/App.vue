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

        <v-btn icon @click="handlerOnRefresh">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">

import useCurrentTimeStore from "@/stores";

const currentTimeStore = useCurrentTimeStore();

const handlerOnRefresh = () => {
  console.log(currentTimeStore.getLocale)
  currentTimeStore.fetchCurrentTime(currentTimeStore.getLocale)
}


</script>

<style lang="scss" scoped>

</style>