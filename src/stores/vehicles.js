import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { dummyVehicles } from './data';

export const useVehicleStore = defineStore('vehicles', () => {
  const vehicles = ref(dummyVehicles);

  const vehicleCount = computed(() => vehicles.value.length);
  const availableCount = computed(() => vehicles.value.filter((v) => v.isAvailable).length);
  const unavailableCount = computed(() => vehicles.value.filter((v) => !v.isAvailable).length);

  const availableVehicles = computed(() =>
    vehicles.value.filter((vehicle) => vehicle.isAvailable)
  );

  const vehiclesByType = (type) =>
    computed(() => vehicles.value.filter((vehicle) => vehicle.type === type));

  function addVehicle(vehicle) {
    vehicles.value.push(vehicle);
  }

  function removeVehicle(vehicleId) {
    vehicles.value = vehicles.value.filter((vehicle) => vehicle.id !== vehicleId);
  }

  function updateVehicle(updatedVehicle) {
    const index = vehicles.value.findIndex((vehicle) => vehicle.id === updatedVehicle.id);
    if (index !== -1) {
      vehicles.value[index] = updatedVehicle;
    }
  }

  const searchVehicles = (query) =>
    computed(() => vehicles.value.filter((vehicle) =>
      vehicle.model.toLowerCase().includes(query.toLowerCase()) ||
      vehicle.year.toString().includes(query.toLowerCase())
    ));

  return {
    vehicles,
    vehicleCount,
    availableVehicles,
    availableCount,
    unavailableCount,
    vehiclesByType,
    addVehicle,
    removeVehicle,
    updateVehicle,
    searchVehicles,
  };
});
