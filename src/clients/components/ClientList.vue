<script setup lang="ts">
import useClients from '@/clients/composables/useClients';

useClients();

</script>

<template>
  <div>
    <ul>
      <li>
        <RouterLink :to="{
          name: 'client-id',
          params: { id: 1 }
        }">
          Client name
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>