<script setup lang="ts">

import LoadingModal from '@/shared/components/LoadingModal.vue';
import useClient from '@/clients/composables/useClient';
import { useRoute } from 'vue-router';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import type { Client } from '@/clients/interfaces/client';
import clientsApi from '@/api/clients-api';
import { watch } from 'vue';
import router from '@/router';

const route = useRoute();
const { isLoading, client, isError } = useClient(+route.params.id)
const queryClient = useQueryClient();


const updateClient = async (client: Client): Promise<Client> => {

  /*simulate*/
  // await new Promise((resolve) => {
  //   setTimeout(resolve, 2000);
  // })

  const { data } = await clientsApi.patch<Client>(`/clients/${client.id}`, client);

  // const queries = queryClient.getQueryCache().findAll(['clients?page=', { exact: false }]);
  // queries.forEach(query => query.reset())
  // queries.forEach(query => query.fetch())

  return data;
}

const clientMutation = useMutation({
  mutationFn: updateClient,
  onSuccess: (data) => {
    console.info('Client updated successfully:');
  },
  onError: (error) => {
    console.error('Error updating client:');
  }
})

watch(clientMutation.isSuccess, () => {
  setTimeout(() => {
    clientMutation.reset();
  }, 2000)
})

watch(isError, () => {
  if (isError.value) {
    router.replace('/clients');
  }
})


</script>

<template>
  <h3 v-if="clientMutation.isPending.value">Guardando ...</h3>
  <h3 v-if="clientMutation.isSuccess.value">Guardado</h3>


  <LoadingModal v-if="false"/>
  <div v-if="client">

    <h1>{{ client.name }}</h1>

    <form @submit.prevent="clientMutation.mutate(client)">
      <div>
        <input
            type="text"
            placeholder="Client Name"
            v-model="client.name"
        >
        <br>
        <input
            type="text"
            placeholder="Address"
            v-model="client.address"
        >
      </div>

      <button
          type="submit"
          :disabled="clientMutation.isPending.value"
      >Save
      </button>

    </form>
  </div>

  <br><br>
  <hr>

  <pre><code>
{{ JSON.stringify(client, null, 2) }}
  </code></pre>

</template>

<style scoped>

input {
  width: 100%;
  margin-bottom: 16px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid var(--color-border);
  background-color: hsla(160, 100%, 37%, 0.2);
  color: var(--color-text);
}

button {
  background-color: transparent;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  margin-right: 5px;
  cursor: pointer;
  transition: all 0.5s;
}

button:disabled {
  background-color: var(--color-background-soft);
  opacity: 0.6;
  cursor: not-allowed;
  color: #666;
  border: 1px solid #999;
}

button:hover {
  background-color: hsla(160, 100%, 37%, 0.2);
  transition: all 0.5s;
}

code {
  display: block;
  padding: 10px;
  background-color: var(--color-background-soft);
  border-radius: 5px;
  margin-top: 10px;
}
</style>