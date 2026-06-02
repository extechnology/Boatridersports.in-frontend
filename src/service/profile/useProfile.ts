import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AddUserAddressApi, DeleteUserAddressApi, GetUserAddressesApi, UpdateUserAddressApi } from "./ProfileApi";
import { UserAddress } from "./types";





// Get Addresses
export const useGetAddresses = () => {

    return useQuery<UserAddress[]>({

        queryKey: ["user-addresses"],

        queryFn: async () => {
            const data = await GetUserAddressesApi();
            return data as UserAddress[];
        },

        staleTime: 0,

    });

};




// Add Address
export const useAddAddress = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (data: FormData) => {

            return await AddUserAddressApi(data);

        },

        onSuccess: (data: any) => {

            queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
            toast.success(data?.message || "Address added successfully!");

        },

        onError: (error: any) => {

            toast.error(error?.message || "Failed to add address");

        }

    });

};



// Update Address
export const useUpdateAddress = () => {

    const queryClient = useQueryClient();


    return useMutation({

        mutationFn: async (data: FormData) => {
            return await UpdateUserAddressApi(data);
        },

        onSuccess: (data: any) => {

            queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
            queryClient.invalidateQueries({ queryKey: ["check-login"] });
            toast.success(data?.message || "Address updated successfully!");

        },

        onError: (error: any) => {

            toast.error(error?.message || "Failed to update address");

        }

    });

};



// Delete Address
export const useDeleteAddress = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (unique_id: string) => {
            return await DeleteUserAddressApi(unique_id);
        },

        onSuccess: (data: any) => {

            queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
            queryClient.invalidateQueries({ queryKey: ["check-login"] });
            toast.success(data?.message || "Address deleted successfully!");

        },

        onError: (error: any) => {

            toast.error(error?.message || "Failed to delete address");

        }

    });

};
