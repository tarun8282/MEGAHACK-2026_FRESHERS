import api from './index';

export interface MCDepartment {
    id: string;
    name: string;
    category_slug: string;
    helpline: string | null;
    email: string | null;
    sla_hours: number;
}

export interface MCComplaint {
    id: string;
    complaint_number: string;
    title: string;
    category: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    status: string;
    created_at: string;
    sla_deadline: string;
    resolved_at: string | null;
    ward_number: string;
    assigned_department_id: string;
    city_id: string;
}

export interface MCDashboardData {
    departments: MCDepartment[];
    complaints: MCComplaint[];
}

export const fetchMCDashboard = async (cityId: string): Promise<MCDashboardData> => {
    const response = await api.get<{ success: boolean; data: MCDashboardData }>(
        `/mc/dashboard?city_id=${encodeURIComponent(cityId)}`
    );
    if (!response.data.success) throw new Error('Failed to fetch MC dashboard data');
    return response.data.data;
};
