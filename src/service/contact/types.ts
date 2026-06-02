// Contact Enquiry Form Types

export interface ContactEnquiryPayload {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}


export interface ContactEnquiryResponse {
    message: string;
}
