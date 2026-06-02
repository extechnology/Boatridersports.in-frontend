import { useMutation } from "@tanstack/react-query";
import { ContactEnquiryApi } from "@/service/contact/ContactApi";
import { toast } from "sonner";



// Submit Contact Enquiry
export const useContactEnquiry = () => {

    return useMutation({

        mutationFn: async (data: FormData) => {
            return await ContactEnquiryApi(data);
        },

        onSuccess: (data) => {
            toast.success(data?.message || "Your message has been sent! We'll get back to you soon.");
        },

        onError: (error: any) => {
            toast.error(error?.message || "Failed to send message. Please try again.");
        },

    });

}
