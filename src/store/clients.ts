import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Client } from "@/clients/interfaces/client";

const useClientsStore = defineStore('clientsStore', () => {

    const currentPage = ref<number>(1);
    const totalPages = ref<number>(5);
    const clients = ref<Client[]>([]);

    return {
        // State properties
        currentPage,
        totalPages,
        clients,

        // Getters (COMPUTED PROPERTIES)
        /*squareCount: computed( () => count.value * count.value ),*/

        // Actions
        setClient(newClients: Client[]) {
            clients.value = newClients;
        },

        setPage(newPage: number) {
            if (currentPage.value === newPage) return;

            currentPage.value = newPage;
        }


    }
});

export default useClientsStore;