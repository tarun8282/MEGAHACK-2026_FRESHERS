import api from './index';

export interface State {
    id: string;
    name: string;
    code: string;
}

export const fetchStates = async (): Promise<State[]> => {
    const response = await api.get('/states');
    if (response.data && response.data.states) {
        return response.data.states;
    }
    return response.data;
};
