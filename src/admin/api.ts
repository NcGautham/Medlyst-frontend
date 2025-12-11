const API_BASE_URL = '/api';

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
}

export interface Slot {
  id: number;
  doctorId: number;
  date: string;
  time: string;
}

export interface CreateDoctorPayload {
  name: string;
  specialty: string;
}

export interface CreateSlotPayload {
  doctorId: number;
  date: string;
  time: string;
}

export const adminApi = {
  createDoctor: async (data: CreateDoctorPayload): Promise<Doctor> => {
    const response = await fetch(`${API_BASE_URL}/admin/doctors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create doctor');
    }
    
    return response.json();
  },

  createSlot: async (data: CreateSlotPayload): Promise<Slot> => {
    const response = await fetch(`${API_BASE_URL}/admin/slots`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create slot');
    }
    
    return response.json();
  },

  getSlots: async (): Promise<Slot[]> => {
    const response = await fetch(`${API_BASE_URL}/slots`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch slots');
    }
    
    return response.json();
  },

  getDoctors: async (): Promise<Doctor[]> => {
    const response = await fetch(`${API_BASE_URL}/doctors`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch doctors');
    }
    
    return response.json();
  },
};
