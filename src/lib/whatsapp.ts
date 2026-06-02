const PRODUCT_ENQUIRY_WHATSAPP_NUMBER = "919526511511";

interface ProductEnquiryMessageParams {
    productName: string;
    quantity?: number;
    color?: string;
    size?: string;
}

export const createProductEnquiryWhatsAppUrl = ({
    productName,
    quantity = 1,
    color,
    size,
}: ProductEnquiryMessageParams) => {
    const messageLines = [
        "Hi Boatrider Sports,",
        "",
        "I would like to enquire about this product.",
        `Product: ${productName}`,
        `Quantity: ${quantity}`,
        color ? `Color: ${color}` : null,
        size ? `Size: ${size}` : null,
        "",
        "Please share availability, pricing, and purchase details.",
    ].filter(Boolean);

    return `https://wa.me/${PRODUCT_ENQUIRY_WHATSAPP_NUMBER}?text=${encodeURIComponent(messageLines.join("\n"))}`;
};
