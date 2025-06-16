import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Client } from "@/clients/interfaces/client";

export const useClientsStore = defineStore('clients', () => {

    const currentPage = ref<number>(1);
    const totalPages = ref<number>(5);
    const clients = ref<Client[]>([]);

    return {
        // State properties
        currentPage,
        totalPages,
        clients,

        // Actions
        setClients(newClients: Client[]) {
            clients.value = newClients;
        },
        setPage(page: number) {
            if (currentPage.value === page) return;
            if (page <= 0) return;
            if (page > totalPages.value) return;

            currentPage.value = page;
        },

        //Getters
        getPageNumbers: computed(
            //return [1,2,3,4,5, n] base on totalPages in state
            () => [...new Array(totalPages.value)].map((v, i) => i + 1)
        )
    }
});
