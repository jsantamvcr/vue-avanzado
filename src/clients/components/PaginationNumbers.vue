<script setup lang="ts">
import { ref, toRef, watch } from 'vue';

interface Props {
  totalPages: number;
  currentPage: number;
}

/*Mejor manejar los Emits en una interfaz para su facil uso
* Puedo tener mas de una interfaz de Emits
* */
interface Emits {
  (e: 'pageChanged', page: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const currentPage = toRef(props, 'currentPage');
const totalPages = toRef(props, 'totalPages');

const totalPageNumbers = ref<number[]>([])

watch(totalPages, () => {
  totalPageNumbers.value = [...new Array(totalPages.value)].map((v, i) => i + 1)
}, { immediate: true });

</script>

<template>
  <div>
    <button
        :disabled="currentPage == 1"
        @click="emit('pageChanged', currentPage -1)"
    >{{ '<<' }}
    </button>
    <button v-for="number of totalPageNumbers"
            :key="number"
            :class="{ active: currentPage === number }"
            @click="emit('pageChanged', number)"
    >{{ number }}
    </button>
    <button
        :disabled="currentPage == totalPages"
        @click="emit('pageChanged', currentPage +1)"
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