// src/api/helpers.ts
import api from "./api";

// Types matching backend/UI needs
export interface Doctor {
    id: number;
    name: string;
    speciality?: string; // Backend field might be 'speciality' or 'specialty', checking usage
    // Add other fields that might be projected or needed by UI if backend sends them
    [key: string]: any;
}

export interface Slot {
    id: number;
    doctor_id: number;
    start_time: string;
    duration_min: number;
    is_booked: boolean;
    [key: string]: any;
}

export async function createDoctor(payload: {
    name: string;
    speciality?: string;
    bio?: string;
    hospital?: string;
    photo_url?: string;
    tags?: string[];
    experience?: number;
}) {
    const res = await api.post("/admin/doctors", payload);
    return res.data;
}

export async function deleteDoctor(id: number | string) {
    const res = await api.delete(`/admin/doctors/${id}`);
    return res.data;
}

export async function createSlot(form: {
    doctorId: number | string;
    startTime: string; // datetime-local value or ISO
    durationMin: number | string;
    totalCapacity?: number | string;
}) {
    const payload = {
        doctor_id: Number(form.doctorId),
        start_time: new Date(form.startTime).toISOString(),
        duration_min: Number(form.durationMin),
        total_capacity: Number(form.totalCapacity ?? 1),
    };
    const res = await api.post("/admin/slots", payload);
    return res.data;
}

export async function getSlots() {
    const res = await api.get("/slots");
    return res.data;
}

export async function getDoctors() {
    try {
        const res = await api.get("/doctors");
        return res.data;
    } catch (e) {
        console.warn("GET /doctors failed", e);
        return [];
    }
}

export async function bookSlot(slotId: number | string, name: string, phone: string) {
    const res = await api.post("/bookings", {
        slot_id: Number(slotId),
        user_name: name,
        user_phone: phone,
    });
    return res.data;
}
