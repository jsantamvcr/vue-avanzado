<script setup lang="ts">
import useClients from '@/clients/composables/useClients';

const { getPage, totalPages, currentPage } = useClients()

</script>

<template>
  <div>
    <button
        :disabled="currentPage == 1"
        @click="getPage(currentPage -1)"
    >{{ '<<' }}
    </button>
    <button v-for="number of totalPages"
            :key="number"
            :class="{ active: currentPage === number }"
            @click="getPage(number)"
    >{{ number }}
    </button>
    <button
        :disabled="currentPage == totalPages"
        @click="getPage(currentPage +1)"
    >{{ '>>' }}
    </button>
  </div>
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
  color: var(--color-text);
  margin-right: 5px;
  cursor: pointer;
  transition: all 0.5s;
}

button:hover {
  background-color: hsla(160, 100%, 37%, 0.2);
  transition: all 0.5s;
}

button:disabled {
  cursor: not-allowed;
}

.active {
  background-color: hsla(160, 100%, 37%, 0.2);
  transition: all 0.5s;
  cursor: default;
}

</style>