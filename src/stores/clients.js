import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { dummyClients } from './data';

export const useClientStore = defineStore('clients', () => {
  const clients = ref(dummyClients);

  const clientCount = computed(() => clients.value.length);

  function addClient(client) {
    clients.value.push(client);
  }

  function removeClient(clientId) {
    clients.value = clients.value.filter((client) => client.id !== clientId);
  }

  function updateClient(updatedClient) {
    const index = clients.value.findIndex((client) => client.id === updatedClient.id);
    if (index !== -1) {
      clients.value[index] = updatedClient;
    }
  }

  const clientsByName = (name) =>
    computed(() => clients.value.filter((client) => client.name.includes(name)));

  const searchClients = (query) =>
    computed(() => clients.value.filter((client) =>
      client.id.toLowerCase().includes(query.toLowerCase()) ||
      client.name.toLowerCase().includes(query.toLowerCase()) ||
      client.email.toLowerCase().includes(query.toLowerCase()) ||
      client.city.toLowerCase().includes(query.toLowerCase())
    ));

  return {
    clients,
    clientCount,
    addClient,
    removeClient,
    updateClient,
    clientsByName,
    searchClients,
  };
});
