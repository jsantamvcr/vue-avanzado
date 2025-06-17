import { computed, ref, watch } from 'vue';
import { useMutation, useQuery } from '@tanstack/vue-query';
import clientsApi from '@/api/clients-api';
import type { Client } from '@/clients/interfaces/client';

const getClient = async (id: number): Promise<Client> => {
    const { data } = await clientsApi.get<Client>(`/clients/${id}`);
    return data
}

const updateClient = async (client: Client): Promise<Client> => {
    const { data } = await clientsApi.patch<Client>(`/clients/${client.id}`, client);
    // const queries = queryClient.getQueryCache().findAll(['clients?page=', { exact: false }]);
    // queries.forEach(query => query.reset())
    // queries.forEach(query => query.fetch())
    return data;
}


const useClient = (id: number) => {

    const client = ref<Client>();

    const { isLoading, data, isError } = useQuery({
        queryKey: ['client', id],
        queryFn: () => getClient(id),
        retry: false,
    });

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
        /*No esa necesario*/
        setTimeout(() => {
            clientMutation.reset();
        }, 2000)
    })

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
        isError,
        clientMutation,

        // Methods
        updateClient: clientMutation.mutate,
        isUpdating: computed(() => clientMutation.isPending.value),
        isUpdatedSuccess: computed(() => clientMutation.isSuccess.value),
        isErrorUpdating: computed(() => clientMutation.isError),


    }
}


export default useClient;