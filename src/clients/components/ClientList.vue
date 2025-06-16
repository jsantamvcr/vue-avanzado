<script setup lang="ts">
import useClients from '@/clients/composables/useClients';

const { clients } = useClients();

console.log(clients);

</script>

<template>
  <div>
    <hr>
    <ul>
      <li v-for="client of clients.data" :key="clients.data.id">
        <RouterLink :to="{
          name: 'client-id',
          params: { id: client.id }
        }">
          {{ client.name }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>