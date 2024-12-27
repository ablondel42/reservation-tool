<!-- 
  Lister toutes les reservations: done
  Ajouter une reservation: done
  Modifier une reservation: done
  Supprimer une reservation: done
  Rechercher une reservation: done
  Filtrer les reservations par client / vehicule / entre deux dates: done
  Trier les reservations par plus recent / plus ancien: todo
 -->
<template>
  <v-container class="mx-auto my-4">
    <Toolbar
      title="Reservations"
      label="Nouvelle reservation"
      dest="/rentals"
      @create-rental="showCreateRentalModal = true"
    />
    <v-container
      v-if="!isBaseRoute"
      class="bg-surface-darken-1 px-8 py-8 mb-4 rounded-lg"
    >
      <v-search-field
        v-model="searchQuery"
        label="Rechercher une reservation"
      >
        <template #prepend-inner>
          <v-icon class="px-5">
            mdi-magnify
          </v-icon>
        </template>
      </v-search-field>
    </v-container>
    <v-list
      :items="filteredRentals"
      class="bg-background-lighten-1 rounded-lg"
    >
      <v-container
        v-if="!isBaseRoute"
        class="mt-0 pt-0 bg-secondary-darken-4 rounded-t-lg"
      >
        <v-row
          align="center"
          class="pt-2"
        >
          <v-col cols="auto">
            <v-icon
              class="ml-4"
              variant="text"
              size="24"
            >
              mdi-filter-outline
            </v-icon>
          </v-col>
          <v-col cols="auto">
            <v-date-field
              v-model="filterStartDate"
              label="Date de début"
            />
          </v-col>
          <v-col cols="auto">
            <v-date-field
              v-model="filterEndDate"
              label="Date de fin"
            />
          </v-col>
          <v-spacer />
        </v-row>
      </v-container>
      <v-list-item
        v-for="rental in filteredRentals"
        :key="rental.id"
        class="bg-background-lighten-1 mx-4"
        lines="three"
      >
        <v-list-item-title>
          Reservation No: {{ rental.id }}
        </v-list-item-title>
        <v-list-item-subtitle class="pt-2">
          Vehicule: {{ rental.model }} - {{ rental.vehicleId }}
        </v-list-item-subtitle>
        <v-list-item-subtitle class="pt-2">
          Client: {{ rental.clientName }} - {{ rental.clientId }}
        </v-list-item-subtitle>
        <v-list-item-subtitle class="pt-2">
          Periode: {{ formatDate(rental.startDate) }} - {{ formatDate(rental.endDate) }}
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
              <v-list-item @click="editReservation(rental)">
                <v-list-item-title>Modifier</v-list-item-title>
              </v-list-item>
              <v-list-item @click="confirmDeleteReservation(rental.id)">
                <v-list-item-title>Supprimer</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-list-item>
    </v-list>
  </v-container>

  <v-dialog
    v-model="showCreateRentalModal"
    max-width="500px"
  >
    <v-card class="pa-8">
      <v-card-title class="text-h5 ml-4 mr-auto my-4">
        Nouvelle reservation
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="addReservation">
          <v-select
            v-model="newReservation.clientId"
            :items="clients"
            item-title="name"
            item-value="id"
            label="Client"
          />
          <v-select
            v-model="newReservation.vehicleId"
            :items="vehicles"
            item-title="model"
            item-value="id"
            label="Vehicule"
          />
          <v-text-field
            v-model="newReservation.startDate"
            label="Date de début"
            type="date"
          />
          <v-text-field
            v-model="newReservation.endDate"
            label="Date de fin"
            type="date"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="bg-success-darken-1 rounded-pill px-4 mr-4"
          @click="addReservation"
        >
          Confirmer
        </v-btn>
        <v-btn
          class="bg-background-lighten-1 rounded-pill  px-4 mr-4"
          @click="closeCreateRentalModal"
        >
          Annuler
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="showEditRentalModal"
    max-width="500px"
  >
    <v-card class="pa-8">
      <v-card-title class="text-h5 ml-2 mr-auto mt-4">
        Modifier la reservation
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="updateReservation">
          <v-select
            v-model="currentReservation.clientId"
            :items="clients"
            item-title="name"
            item-value="id"
            label="Client"
          />
          <v-select
            v-model="currentReservation.vehicleId"
            :items="vehicles"
            item-title="model"
            item-value="id"
            label="Vehicule"
          />
          <v-text-field
            v-model="currentReservation.startDate"
            label="Date de début"
            type="date"
          />
          <v-text-field
            v-model="currentReservation.endDate"
            label="Date de fin"
            type="date"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="bg-success-darken-1 rounded-pill px-4 mr-4"
          @click="updateReservation"
        >
          Mettre à jour
        </v-btn>
        <v-btn
          class="bg-background-lighten-1 rounded-pill  px-4 mr-4"
          @click="closeEditRentalModal"
        >
          Annuler
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="showDeleteRentalModal"
    max-width="500px"
  >
    <v-card class="pa-4">
      <v-card-title class="text-h5 ml-2 mr-auto mt-4">
        Supprimer
      </v-card-title>
      <v-card-text class="pb-12">
        Êtes-vous sûr de vouloir supprimer cette reservation?
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="bg-warning-darken-1 rounded-pill px-4 mr-4"
          @click="deleteReservation"
        >
          Supprimer
        </v-btn>
        <v-btn 
          class="bg-background-lighten-1 rounded-pill px-4 mr-4"
          @click="showDeleteRentalModal = false"
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
import { useClientStore } from "@/stores/clients";
import { useVehicleStore } from "@/stores/vehicles";
import { useReservationStore } from "@/stores/rentals";
import { v4 as uuidv4 } from "uuid";

const route = useRoute();
const isBaseRoute = computed(() => route.path === "/");

const clientStore = useClientStore();
const vehicleStore = useVehicleStore();
const rentalStore = useReservationStore();

const clients = clientStore.clients;
const vehicles = vehicleStore.vehicles;

const showCreateRentalModal = ref(false);
const showEditRentalModal = ref(false);
const showDeleteRentalModal = ref(false);
const isEditing = ref(false);
const searchQuery = ref("");
const filterStartDate = ref("");
const filterEndDate = ref("");

const newReservation = ref({
  id: "",
  clientId: "",
  vehicleId: "",
  model: "",
  clientName: "",
  startDate: "",
  endDate: "",
});

const currentReservation = ref({
  id: "",
  clientId: "",
  vehicleId: "",
  model: "",
  clientName: "",
  startDate: "",
  endDate: "",
});
const reservationIdToDelete = ref(null);

const filteredRentals = computed(() => {
  return rentalStore.searchRentals(searchQuery.value).value.filter(rental => {
    const rentalStartDate = new Date(rental.startDate);
    const rentalEndDate = new Date(rental.endDate);
    const startDateMatch = !filterStartDate.value || rentalStartDate >= new Date(filterStartDate.value);
    const endDateMatch = !filterEndDate.value || rentalEndDate <= new Date(filterEndDate.value);
    return startDateMatch && endDateMatch;
  });
});

function addReservation() {
  rentalStore.addReservation({
    id: uuidv4(),
    clientId: newReservation.value.clientId,
    vehicleId: newReservation.value.vehicleId,
    model: rentalStore.getVehicleName(newReservation.value.vehicleId, vehicles),
    clientName: rentalStore.getClientName(newReservation.value.clientId, clients),
    startDate: newReservation.value.startDate,
    endDate: newReservation.value.endDate,
  });
  closeCreateRentalModal();
}

function editReservation(rental) {
  currentReservation.value = {
    ...rental,
    startDate: rentalStore.formatDateForInput(rental.startDate),
    endDate: rentalStore.formatDateForInput(rental.endDate),
  };
  isEditing.value = true;
  showEditRentalModal.value = true;
}

function updateReservation() {
  rentalStore.updateReservation(currentReservation.value);
  closeEditRentalModal();
}

function confirmDeleteReservation(rentalId) {
  reservationIdToDelete.value = rentalId;
  showDeleteRentalModal.value = true;
}

function deleteReservation() {
  rentalStore.removeReservation(reservationIdToDelete.value);
  showDeleteRentalModal.value = false;
}

function closeCreateRentalModal() {
  newReservation.value = {
    id: "",
    clientId: "",
    vehicleId: "",
    model: "",
    clientName: "",
    startDate: "",
    endDate: "",
  };
  showCreateRentalModal.value = false;
}

function closeEditRentalModal() {
  currentReservation.value = {
    id: "",
    clientId: "",
    vehicleId: "",
    model: "",
    clientName: "",
    startDate: "",
    endDate: "",
  };
  isEditing.value = false;
  showEditRentalModal.value = false;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString();
}
</script>
