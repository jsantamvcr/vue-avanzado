<script setup lang="ts">

import LoadingModal from '@/shared/components/LoadingModal.vue';
import useClient from '@/clients/composables/useClient';
import { useRoute } from 'vue-router';
import { watch } from 'vue';
import router from '@/router';

const route = useRoute();
const {
  client,
  isError,
  updateClient,
  isUpdatedSuccess,
  isUpdating
} = useClient(+route.params.id)

watch(isError, () => {
  if (isError.value) {
    router.replace('/clients');
  }
})

</script>

<template>
  <h3 v-if="isUpdating">Guardando ...</h3>
  <h3 v-if="isUpdatedSuccess">Guardado</h3>


  <LoadingModal v-if="false"/>
  <div v-if="client">

    <h1>{{ client.name }}</h1>

    <form @submit.prevent="updateClient(client)">
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
          :disabled="isUpdating"
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