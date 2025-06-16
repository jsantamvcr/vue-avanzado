<script setup lang="ts">
import ClientList from "@/clients/components/ClientList.vue";
import PaginationNumbers from '@/clients/components/PaginationNumbers.vue';
import useClients from '@/clients/composables/useClients';
import LoadingModal from '@/shared/components/LoadingModal.vue';

const { isLoading, clients, currentPage, totalPages, getPage } = useClients()

</script>


<template>
  <h1>client list</h1>

  <!--Paginacion-->
  <PaginationNumbers
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-changed="getPage"
  />

  <!--Lista de clientes-->
  <ClientList :clients="clients.data"/>

  <!--Loading-->
  <LoadingModal v-if="isLoading"/>


</template>

<style scoped>
div {
  margin-bottom: 5px;
  padding: 5px;
}

button {
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid var(--color-border);
}
</style>