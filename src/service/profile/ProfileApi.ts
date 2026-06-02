import { CommonApi } from "@/lib/CommonApi";

// Get user addresses
export const GetUserAddressesApi = async () => {
    return await CommonApi("GET", `/profile/get-user-address/`);
}

// Add user address
export const AddUserAddressApi = async (data: FormData) => {
    return await CommonApi("POST", `/profile/add-user-address/`, data);
}

// Update user address
export const UpdateUserAddressApi = async (data: FormData) => {
    return await CommonApi("PUT", `/profile/update-user-address/`, data);
}

// Delete user address
export const DeleteUserAddressApi = async (unique_id: string) => {
    const params = new URLSearchParams({ unique_id }).toString();
    return await CommonApi("DELETE", `/profile/delete-user-address/?${params}`);
}
