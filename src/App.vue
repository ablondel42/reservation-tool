<template>
  <v-app>
    <v-app-bar app class="px-4">
      <v-app-bar-nav-icon @click="drawer = !drawer">
        <v-icon size="42">mdi-menu</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="text-h4">
        VrumVrum
      </v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-item
          link
          to="/"
        >
          <v-list-item-title>Acceuil</v-list-item-title>
        </v-list-item>
        <v-list-item
          link
          to="/clients"
        >
          <v-list-item-title>Clients</v-list-item-title>
        </v-list-item>
        <v-list-item
          link
          to="/vehicles"
        >
          <v-list-item-title>Vehicules</v-list-item-title>
        </v-list-item>
        <v-list-item
          link
          to="/rentals"
        >
          <v-list-item-title>Reservations</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';

const drawer = ref(false);
</script>
