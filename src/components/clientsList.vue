<!-- 
  Lister tous les utilisateurs: done
  Ajouter un utilisateur: done
  Modifier un utilisateur: done
  Supprimer un utilisateur: done
  Rechercher un utilisateur par nom / mail / ID: done
 -->
<template>
  <v-container class="mx-auto my-4">
    <Toolbar
      title="Clients"
      label="Nouveau Client"
      dest="/clients"
      @create-client="showCreateClientModal = true"
    />
    <v-container
      v-if="!isBaseRoute"
      class="bg-surface-darken-1 px-8 py-8 mb-4 rounded-lg"
    >
      <v-search-field
        v-model="searchQuery"
        label="Rechercher un client"
      >
        <template #prepend-inner>
          <v-icon class="px-5">
            mdi-magnify
          </v-icon>
        </template>
      </v-search-field>
    </v-container>
    <v-list class="bg-background-lighten-1 rounded-lg">
      <v-list-item
        v-for="client in filteredClients"
        :key="client.id"
        class="bg-background-lighten-1 mx-4"
        lines="three"
      >
        <v-list-item-title>{{ client.name }}</v-list-item-title>
        <v-list-item-subtitle class="pt-2">
          {{ client.id }}
        </v-list-item-subtitle>
        <v-list-item-subtitle class="pt-2">
          {{ client.email }}
        </v-list-item-subtitle>
        <v-list-item-subtitle class="pt-2">
          {{ client.city }} {{ client.country }}
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
            <v-list class="bg-surface-lighten-1">
              <v-list-item @click="editClient(client)">
                <v-list-item-title>Modifier</v-list-item-title>
              </v-list-item>
              <v-divider />
              <v-list-item @click="confirmDeleteClient(client.id)">
                <v-list-item-title>Supprimer</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-list-item>
    </v-list>
  </v-container>

  <v-dialog
    v-model="showCreateClientModal"
    max-width="500px"
  >
    <v-card class="pa-8">
      <v-card-title class="text-h5 ml-4 mr-auto my-4">
        Nouveau client
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="addClient">
          <v-text-field
            v-model="newClient.name"
            label="Nom complet"
            required
          />
          <v-text-field
            v-model="newClient.email"
            label="Email"
            required
          />
          <v-text-field
            v-model="newClient.address"
            label="Addresse"
          />
          <v-text-field
            v-model="newClient.city"
            label="Ville"
          />
          <v-text-field
            v-model="newClient.country"
            label="Pays"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="bg-success-darken-1 rounded-pill px-4 mr-4"
          @click="addClient"
        >
          Confirmer
        </v-btn>
        <v-btn
          class="bg-background-lighten-1 rounded-pill  px-4 mr-4"
          @click="closeCreateClientModal"
        >
          Annuler
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="showEditClientModal"
    max-width="500px"
  >
    <v-card class="pa-8">
      <v-card-title class="text-h5 ml-4 mr-auto my-4">
        Modifier le Client
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="updateClient">
          <v-text-field
            v-model="newClient.name"
            label="Nom complet"
            required
          />
          <v-text-field
            v-model="newClient.email"
            label="Email"
            required
          />
          <v-text-field
            v-model="newClient.address"
            label="Addresse"
          />
          <v-text-field
            v-model="newClient.city"
            label="Ville"
          />
          <v-text-field
            v-model="newClient.country"
            label="Pays"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="bg-success-darken-1 rounded-pill px-4 mr-4"
          @click="updateClient"
        >
          Mettre à jour
        </v-btn>
        <v-btn
          class="bg-background-lighten-1 rounded-pill  px-4 mr-4"
          @click="closeEditClientModal"
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
        Êtes-vous sûr de vouloir supprimer ce client?
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="bg-warning-darken-1 rounded-pill px-4 mr-4"
          @click="deleteClient"
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
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useClientStore } from "@/stores/clients";
import { v4 as uuidv4 } from "uuid";

const route = useRoute();
const isBaseRoute = computed(() => route.path === "/");

const clientStore = useClientStore();
const showCreateClientModal = ref(false);
const showEditClientModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const searchQuery = ref("");
const newClient = ref({
  id: "",
  name: "",
  email: "",
  address: "",
  city: "",
  country: "",
});
const clientIdToDelete = ref(null);

const filteredClients = computed(() => clientStore.searchClients(searchQuery.value).value);

function addClient() {
  clientStore.addClient({ id: uuidv4(), ...newClient.value });
  closeCreateClientModal();
}

function editClient(client) {
  newClient.value = { ...client };
  isEditing.value = true;
  showEditClientModal.value = true;
}

function updateClient() {
  clientStore.updateClient(newClient.value);
  closeEditClientModal();
}

function confirmDeleteClient(clientId) {
  clientIdToDelete.value = clientId;
  showDeleteModal.value = true;
}

function deleteClient() {
  clientStore.removeClient(clientIdToDelete.value);
  showDeleteModal.value = false;
}

function closeCreateClientModal() {
  newClient.value = {
    id: "",
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
  };
  showCreateClientModal.value = false;
}

function closeEditClientModal() {
  newClient.value = {
    id: "",
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
  };
  isEditing.value = false;
  showEditClientModal.value = false;
}
</script>
