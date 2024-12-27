import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { dummyRentals } from './data';

export const useReservationStore = defineStore('rentals', () => {
  const rentals = ref(dummyRentals);

  const rentalCount = computed(() => rentals.value.length);

  const rentalsByClient = (clientId) =>
    computed(() => rentals.value.filter((rental) => rental.clientId === clientId));

  const rentalsByVehicle = (vehicleId) =>
    computed(() => rentals.value.filter((rental) => rental.vehicleId === vehicleId));

  const rentalsByDateRange = (startDate, endDate) =>
    computed(() =>
      rentals.value.filter(
        (rental) =>
          new Date(rental.startDate) >= new Date(startDate) &&
          new Date(rental.endDate) <= new Date(endDate)
      )
    );

  function addReservation(rental) {
    rentals.value.push(rental);
  }

  function removeReservation(rentalId) {
    rentals.value = rentals.value.filter(
      (rental) => rental.id !== rentalId
    );
  }

  function updateReservation(updatedReservation) {
    const index = rentals.value.findIndex(
      (rental) => rental.id === updatedReservation.id
    );
    if (index !== -1) {
      rentals.value[index] = updatedReservation;
    }
  }

  const searchRentals = (query) =>
    computed(() => rentals.value.filter((rental) =>
      rental.id.toLowerCase().includes(query.toLowerCase()) ||
      rental.clientId.toLowerCase().includes(query.toLowerCase()) ||
      rental.vehicleId.toLowerCase().includes(query.toLowerCase()) ||
      rental.model.toLowerCase().includes(query.toLowerCase()) ||
      rental.clientName.toLowerCase().includes(query.toLowerCase()) ||
      new Date(rental.startDate).toLocaleDateString().includes(query) ||
      new Date(rental.endDate).toLocaleDateString().includes(query)
    ));

  function formatDateForInput(date) {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  }

  function getClientName(clientId, clients) {
    const client = clients.find((client) => client.id === clientId);
    return client ? client.name : "Unknown Client";
  }

  function getVehicleName(vehicleId, vehicles) {
    const vehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);
    return vehicle ? vehicle.model : "Unknown Vehicle";
  }

  return {
    rentals,
    rentalCount,
    rentalsByClient,
    rentalsByVehicle,
    rentalsByDateRange,
    addReservation,
    removeReservation,
    updateReservation,
    searchRentals,
    formatDateForInput,
    getClientName,
    getVehicleName,
  };
});
