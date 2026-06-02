import { CommonApi } from "@/lib/CommonApi";




// Get Fliter Sidebar
export const GetFliterSidebarApi = async (key: string) => {

    const params = new URLSearchParams({ sidebar: key }).toString();

    return await CommonApi("GET", `/product/products-filter-side-bar/?${params}`);

}



// Get Suggested Products
export const GetSuggestedProductsApi = async () => {

    return await CommonApi("GET", `/product/suggested-product/`);

}



// Get Navbar Data
export const GetNavbarDataApi = async () => {

    return await CommonApi("GET", `/product/navbar-items/`);

}