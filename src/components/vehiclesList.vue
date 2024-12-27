<!-- eslint-disable vue/attribute-hyphenation -->
<!--
  Lister tous les vehicules: done
  Ajouter un vehicule: done
  Modifier un vehicule: done
  Supprimer un vehicule: done
  Rechercher un vehicule par modele / annee / ID: done
  Filtrer les vehicules par disponibilite: done
-->
<template>
  <v-container class="mx-auto my-4">
    <Toolbar
      title="Vehicules"
      label="Nouveau Vehicule"
      dest="/vehicles"
      @create-vehicle="showCreateVehicleModal = true"
    />
    <v-container
      v-if="!isBaseRoute"
      class="bg-surface-darken-1 px-8 py-8 rounded-b-lg"
    >
      <v-search-field
        v-model="searchQuery"
        label="Rechercher un vehicule"
      >
        <template #prepend-inner>
          <v-icon class="px-5">
            mdi-magnify
          </v-icon>
        </template>
      </v-search-field>
    </v-container>

    <v-container
      v-if="!isBaseRoute"
      class="mt-4 bg-secondary-darken-4 py-4 px-0 rounded-t-lg"
    >
      <v-chip-group
        v-model="availabilityFilter"
        selectedClass="bg-secondary-darken-2"
        size="small"
        class="px-8 py-0"
        mandatory
        filter
      >
        <v-chip value="all">
          Tous: {{ vehicleStore.vehicleCount }}
        </v-chip>
        <v-chip value="available">
          Disponibles: {{ vehicleStore.availableCount }}
        </v-chip>
        <v-chip value="unavailable">
          Indisponibles {{ vehicleStore.unavailableCount }}
        </v-chip>
      </v-chip-group>
    </v-container>

    <v-list class="bg-background-lighten-1 rounded-b-lg">
      <v-list-item
        v-for="vehicle in filteredVehicles"
        :key="vehicle.id"
        class="bg-background-lighten-1 mx-4"
        lines="three"
      >
        <v-list-item-title>{{ vehicle.model }}</v-list-item-title>
        <v-list-item-subtitle class="pt-2">
          Vehicule No: {{ vehicle.id }}
        </v-list-item-subtitle>
        <v-list-item-subtitle class="pt-2">
          Année: {{ vehicle.year }}
        </v-list-item-subtitle>
        <v-list-item-subtitle class="pt-2">
          Statut: {{ vehicle.isAvailable ? 'Disponible' : 'Indisponible' }}
        </v-list-item-subtitle>
        <template #append>
          <v-menu location="start">
            <template #activator="{ props }">
              <v-btn
                icon
                variant="plain"
                v-bind="props"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="editVehicle(vehicle)">
                <v-list-item-title>Modifier</v-list-item-title>
              </v-list-item>
              <v-list-item @click="confirmDeleteVehicle(vehicle.id)">
                <v-list-item-title>Supprimer</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-list-item>
    </v-list>
  </v-container>

  <v-dialog
    v-model="showCreateVehicleModal"
    max-width="500px"
  >
    <v-card class="pa-8">
      <v-card-title class="text-h5 ml-4 mr-auto my-4">
        Ajouter un vehicule
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="addVehicle">
          <v-text-field
            v-model="newVehicle.model"
            label="Modele"
          />
          <v-text-field
            v-model="newVehicle.year"
            label="Année"
            type="number"
          />
          <v-switch
            v-model="newVehicle.isAvailable"
            label="Disponible"
            class="mr-4"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="bg-success-darken-1 rounded-pill px-4 mr-4"
          @click="addVehicle"
        >
          Ajouter
        </v-btn>
        <v-btn
          class="bg-background-lighten-1 rounded-pill px-4 mr-4"
          @click="closeCreateVehicleModal"
        >
          Annuler
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="showEditVehicleModal"
    max-width="500px"
  >
    <v-card class="pa-8">
      <v-card-title class="text-h5 ml-4 mr-auto my-4">
        Modifier le vehicule
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="updateVehicle">
          <v-text-field
            v-model="newVehicle.model"
            label="Modele"
          />
          <v-text-field
            v-model="newVehicle.year"
            label="Année"
            type="number"
          />
          <v-switch
            v-model="newVehicle.isAvailable"
            label="Disponible"
            class="mr-4"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="bg-success-darken-1 rounded-pill px-4 mr-4"
          @click="updateVehicle"
        >
          Mettre à jour
        </v-btn>
        <v-btn
          class="bg-background-lighten-1 rounded-pill  px-4 mr-4"
          @click="closeEditVehicleModal"
        >
          Annuler
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="showDeleteModal"
    max-width="500px"
  >
    <v-card class="pa-4">
      <v-card-title class="text-h5 ml-2 mr-auto mt-4">
        Supprimer
      </v-card-title>
      <v-card-text class="pb-12">
        Êtes-vous sûr de vouloir supprimer ce vehicule?
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="bg-warning-darken-1 rounded-pill px-4 mr-4"
          @click="deleteVehicle"
        >
          Confirmer
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
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useVehicleStore } from "@/stores/vehicles";
import { v4 as uuidv4 } from "uuid";

const route = useRoute();
const isBaseRoute = computed(() => route.path === "/");

const vehicleStore = useVehicleStore();
const vehicles = computed(() => vehicleStore.vehicles);
const showCreateVehicleModal = ref(false);
const showEditVehicleModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const searchQuery = ref("");
const availabilityFilter = ref("all");
const newVehicle = ref({
  id: "",
  model: "",
  year: "",
  isAvailable: true,
});
const vehicleIdToDelete = ref(null);

const filteredVehicles = computed(() => {
  return vehicles.value.filter(vehicle => {
    const matchesSearchQuery = vehicle.model.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      vehicle.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      vehicle.year.toString().includes(searchQuery.value.toLowerCase());
    const matchesAvailability = availabilityFilter.value === "all" ||
      (availabilityFilter.value === "available" && vehicle.isAvailable) ||
      (availabilityFilter.value === "unavailable" && !vehicle.isAvailable);
    return matchesSearchQuery && matchesAvailability;
  });
});

function addVehicle() {
  vehicleStore.addVehicle({
    id: uuidv4(),
    model: newVehicle.value.model,
    year: newVehicle.value.year,
    isAvailable: newVehicle.value.isAvailable,
  });
  closeCreateVehicleModal();
}

function editVehicle(vehicle) {
  newVehicle.value = { ...vehicle };
  isEditing.value = true;
  showEditVehicleModal.value = true;
}

function updateVehicle() {
  vehicleStore.updateVehicle(newVehicle.value);
  closeEditVehicleModal();
}

function confirmDeleteVehicle(vehicleId) {
  vehicleIdToDelete.value = vehicleId;
  showDeleteModal.value = true;
}

function deleteVehicle() {
  vehicleStore.removeVehicle(vehicleIdToDelete.value);
  showDeleteModal.value = false;
}

function closeCreateVehicleModal() {
  newVehicle.value = {
    id: "",
    model: "",
    year: "",
    isAvailable: true,
  };
  showCreateVehicleModal.value = false;
}

function closeEditVehicleModal() {
  newVehicle.value = {
    id: "",
    model: "",
    year: "",
    isAvailable: true,
  };
  isEditing.value = false;
  showEditVehicleModal.value = false;
}
</script>
