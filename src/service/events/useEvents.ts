import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    RegisterEventApi,
    GetEventsApi,
    GetEventDetailsApi,
    EventRegistrationPayload,
    EventRegistrationResponse,
} from "./EventsApi";
import { toast } from "sonner";

/**
 * Mutation hook to register for an event (No payment required).
 */
export const useRegisterEvent = () => {
    const queryClient = useQueryClient();

    return useMutation<EventRegistrationResponse, any, EventRegistrationPayload>({
        mutationFn: async (payload: EventRegistrationPayload) => {
            return await RegisterEventApi(payload);
        },
        onSuccess: (data, variables) => {
            const ticketNotice = data?.data?.registrationNumber
                ? `Booking Code: #${data.data.registrationNumber}. `
                : "";
            toast.success("Registration Confirmed! 🎉", {
                description: `${ticketNotice}Your spot for "${variables.eventTitle}" is reserved. Details sent to ${variables.phone}.`,
                duration: 6000,
            });
            // Invalidate events cache to refresh spot counts if needed
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
        onError: (error: any) => {
            const message =
                error?.message ||
                error?.data?.message ||
                "Failed to complete registration. Please check your details and try again.";
            toast.error("Registration Unsuccessful", {
                description: message,
                duration: 5000,
            });
        },
    });
};

/**
 * Query hook to fetch all published events with optional filtering.
 */
export const useEventsList = (params?: { category?: string; search?: string }) => {
    return useQuery({
        queryKey: ["events", params?.category, params?.search],
        queryFn: async () => {
            try {
                return await GetEventsApi(params);
            } catch (error) {
                // Return null on failure so UI falls back gracefully to static data
                console.warn("Backend events API currently unavailable, using fallback data:", error);
                return null;
            }
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    });
};

/**
 * Query hook to fetch single event details.
 */
export const useEventDetails = (idOrSlug: string) => {
    return useQuery({
        queryKey: ["event", idOrSlug],
        queryFn: async () => {
            return await GetEventDetailsApi(idOrSlug);
        },
        enabled: Boolean(idOrSlug),
    });
};

