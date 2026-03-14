import api from './index';

export interface City {
    id: string;
    state_id: string;
    name: string;
    official_name: string;
}

export const fetchCities = async (stateId?: string): Promise<City[]> => {
    const response = await api.get('/cities', { params: { state_id: stateId } });
    if (response.data && response.data.cities) {
        return response.data.cities;
    }
    return response.data;
};
