<template>
  <v-dialog
    v-model="showDeleteModal"
    max-width="500px"
  >
    <v-card class="pa-4">
      <v-card-title class="text-h5 ml-2 mr-auto mt-4">
        Supprimer
      </v-card-title>
      <v-card-text class="pb-12">
        Êtes-vous sûr de vouloir supprimer ce client?
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="bg-warning-darken-1 rounded-pill px-4 mr-4"
          @click="handleModal"
        >
          Supprimer
        </v-btn>
        <v-btn
          class="bg-background-lighten-1 rounded-pill px-4 mr-4"
          @click="showDeleteModal = false"
        >
          Annuler
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineProps } from 'vue';

const emit = defineEmits(['deleteClient', 'deleteVehicle', 'deleteRental']);
const props = defineProps({
  target: {
    type: String,
    default: ''
  },
});

const handleModal = () => {
    console.log('::', props.target);
  if (props.target === "Clients") {
    emit('deleteClient');
  } else if (props.target === "Vehicules") {
    emit('deleteVehicle');
  } else if (props.target === "Reservations") {
    emit('deleteRental');
  }
};
</script>