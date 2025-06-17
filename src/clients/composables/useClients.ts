import { watch, watchEffect } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';
import { useClientsStore } from '@/store/clients';
import clientsApi from '@/api/clients-api';
import type { Client } from '@/clients/interfaces/client';

const getClients = async (page: number): Promise<Client[]> => {

    // await new Promise( resolve => {
    //     setTimeout( () => resolve(true), 1500 )
    // });

    const { data } = await clientsApi.get<Client[]>(`/clients?_page=${page}`);
    return data;
}

const useClients = () => {
    const store = useClientsStore();
    const { currentPage, clients, totalPages } = storeToRefs(store);

    const { isLoading, data } = useQuery({
        queryKey: ['clients', currentPage],
        queryFn: () => getClients(currentPage.value),
        staleTime: 1000 * 60, // 1 minute
    });

    watch(data, (clients) => {
        if (clients)
            store.setClients(clients);
    });

    // watchEffect(() => {
    //     if (clients)
    //         store.setPage(currentPage.value);
    //
    //     if (data.value) {
    //         console.log('asdf',data.value);
    //         store.setClients(data.value);
    //     }
    // });

    return {
        // State properties
        clients,
        currentPage,
        isLoading,
        totalPages,

        // Actions
        getPage(page: number) {
            store.setPage(page);
        }
    }
};

export default useClients;