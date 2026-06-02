import { CommonApi } from "@/lib/CommonApi";


// Submit Contact Enquiry
export const ContactEnquiryApi = async (data: FormData) => {

    return await CommonApi("POST", `/contact/contact-enquiry/`, data);

}
