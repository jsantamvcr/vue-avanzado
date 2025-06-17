import { ref, watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import clientsApi from '@/api/clients-api';
import type { Client } from '@/clients/interfaces/client';
import type { AxiosError } from 'axios';

const getClient = async (id: number): Promise<Client> => {
    const { data } = await clientsApi.get<Client>(`/clients/${id}`);
    return data
}


const useClient = (id: number) => {

    const client = ref<Client>();

    const { isLoading, data, isError } = useQuery({
        queryKey: ['client', id],
        queryFn: () => getClient(id),
        retry: false,
    });

    /*we need to watch some values */
    watch(data, () => {
        if (data.value) {
            client.value = { ...data.value };
        }
    }, { immediate: true });


    return {
        // State properties
        client,
        isLoading,
        isError

        // Actions

    }
}


export default useClient;