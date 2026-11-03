import { CommonApi } from "@/lib/CommonApi";

export interface EventRegistrationPayload {
    eventId: string;
    eventTitle: string;
    fullName: string;
    phone: string;
    email: string;
    participants: number;
    bikeType: string;
    experienceLevel: string;
    emergencyContact?: string;
    notes?: string;
    agreedToTerms: boolean;
}

export interface EventRegistrationResponse {
    success: boolean;
    message: string;
    data?: {
        registrationId: string;
        registrationNumber: string;
        eventId: string;
        eventTitle: string;
        fullName: string;
        phone: string;
        email: string;
        participants: number;
        status: "confirmed" | "waitlist";
        createdAt: string;
    };
}

/**
 * Register a participant for a cycling event.
 * Note: No payment gateway required. Directly confirms registration.
 */
export const RegisterEventApi = async (
    data: EventRegistrationPayload
): Promise<EventRegistrationResponse> => {
    return await CommonApi("POST", `/events/register/`, data);
};

/**
 * Fetch all published cycling events (with optional filtering).
 */
export const GetEventsApi = async (params?: { category?: string; search?: string }) => {
    const query = new URLSearchParams();
    if (params?.category && params.category !== "All") {
        query.append("category", params.category);
    }
    if (params?.search && params.search.trim()) {
        query.append("search", params.search.trim());
    }

    const queryString = query.toString();
    const endpoint = queryString ? `/events/?${queryString}` : `/events/`;
    return await CommonApi("GET", endpoint);
};

/**
 * Fetch single event details by id or slug.
 */
export const GetEventDetailsApi = async (idOrSlug: string) => {
    return await CommonApi("GET", `/events/${idOrSlug}/`);
};

