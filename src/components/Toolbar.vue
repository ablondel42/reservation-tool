<template>
  <v-toolbar class="pr-4 rounded-t-lg">
    <v-toolbar-title class="text-h5 pl-4">
      {{ title }}
    </v-toolbar-title>
    <v-spacer />
    <div
      v-if="!isBaseRoute"
    >
      <v-btn 
        class="mr-4 bg-secondary-darken-2"
        :fab="true"
        variant="elevated"
        elevation="1"
        @click="handleModal"
      >
        {{ label }}
      </v-btn>
      <v-btn
        to="/"
      >
        <v-icon size="24">
          mdi-arrow-left
        </v-icon>
      </v-btn>
    </div>
    <v-btn
      v-else
      :to="dest"
    >
      <v-icon size="24">
        mdi-arrow-right
      </v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const emit = defineEmits(['createClient', 'createVehicle', 'createRental']);
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  dest: {
    type: String,
    default: ''
  },
});

const handleModal = () => {
  if (props.title === "Clients") {
    emit('createClient');
  } else if (props.title === "Vehicules") {
    emit('createVehicle');
  } else if (props.title === "Reservations") {
    emit('createRental');
  }
};

const route = useRoute();
const isBaseRoute = computed(() => route.path === "/");
</script>