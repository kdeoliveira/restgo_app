<template>






    <v-card
        class="mx-auto"

    >
      <v-card-title >
        Time Format
      </v-card-title>
      <v-card-text>
        <div class="flex">
        <span>
        {{useCurrentTime.getDate}}
        </span>
          <span>
        {{useCurrentTime.getTime}}
      </span>
        </div>
      </v-card-text>
      <v-card-text>
        <v-select
            :items="items"
            label="Format"
            outlined
            v-model.trim="selected"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="() => {
          useCurrentTime.setLocale(selected)
          useCurrentTime.fetchCurrentTime(selected)

        }">
          Fetch
        </v-btn>
      </v-card-actions>
    </v-card>



</template>

<script lang="ts" setup>
// Components
import useCurrentTimeStore from "@/stores";
import {VPic} from "vuetify"
import {ref, watch} from "vue";

const useCurrentTime = useCurrentTimeStore()

const items = ref([
  "en_US",
  "fr_FR",
    "pt_PT",
    "es_ES"
])



const selected = ref<string>(useCurrentTime.getLocale)


</script>

<style scoped>
.flex{
  display: flex;
  justify-content: space-around;
  align-items: center;
  align-content: center;
}

.flex > *{
  font-size: 16px !important;
}

.flex_container{
  display: flex;
  justify-content: space-evenly;
}

</style>