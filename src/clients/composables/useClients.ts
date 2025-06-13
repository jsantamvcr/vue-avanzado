import { useQuery } from '@tanstack/vue-query';
import type { Client } from '@/clients/interfaces/client';
import clientsApi from '@/api/clients-api';

const getClients = async (): Promise<Client[]> => {

    console.log('Fetching clients...');
    const { data } = await clientsApi.get<Client[]>('/clients?_page=1');
    return data;
}

const useClients = () => {
    const { isLoading, data } = useQuery<Client[]>({
        queryKey: ['clients', { page: 1 }],
        queryFn: getClients,
    })

    return {
        isLoading,
        clients: data,
    }
}

export default useClients;