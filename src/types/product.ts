

// Base Product Interface
export interface BaseProduct {
    id: number;
    unique_id: string;
    name: string;
    description: string;
    category: string;
    brand: string;
    price: string;
    stock: number;
    is_available: boolean;
    is_out_of_stock: boolean;
    is_discount: boolean;
    discount_price: string;
    discount_percentage: string;
    special_tag: "Best Seller" | "New Arrival" | "Trending" | "Limited";
    is_dark?: boolean;
    background_color: string | null;
    text_color: string | null;
    created: string | Date;
    online_purchase_enabled: boolean
}



// Bike Product Interface
export interface BikeColorImage {
    color: string;
    bike_images: string[];
    color_code: string[];
}


export interface BikePoster {
    poster: string;
    title: string;
    description: string;
}


export interface BikeDownload {
    file: string;
    title: string;
}


export interface BikeSpecLabel {
    label: string;
    bike_spec_values: BikeSpecValue[];
}

export interface BikeSpecValue {
    name: string;
    value: string;
}


export interface BikeProduct extends BaseProduct {

    wheel_size: string[];
    material: string[];
    suspension: string[];
    rear_suspension_travel: string[];

    product_type: "bike";

    is_featured: boolean;
    featured_image: string | null;

    youtube_link: string | null;
    youtube_video_id: string | null;

    sizes: string[];

    bike_colors: BikeColorImage[];

    bike_spec_labels: BikeSpecLabel[];

    bike_posters: BikePoster[];
    bike_downloads: BikeDownload[];

}



// Accessory Product
export interface AccessoryProduct extends BaseProduct {

    product_type: "accessories";
    sub_category: string;
    accessory_images: string[];

}



// pagination
export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
    total_pages: number;
    current_page: number;
}



// sidebar  
export interface BikeSidebarColor {
    name: string;
    code: string[];
}


export interface BaseSideBar {
    categories: string[];
    brands: string[];
    special_tags: string[];
}


export interface BikeSidebarResponse extends BaseSideBar {
    sizes: string[];
    wheel_sizes: string[];
    materials: string[];
    suspensions: string[];
    rearSuspensionTravel: string[];
    colors: BikeSidebarColor[];
    product_type: "bike";
}


export interface AccessoriesSidebarResponse extends BaseSideBar {
    sub_categories: string[];
    product_type: "accessories";
}


export type SidebarResponse = BikeSidebarResponse | AccessoriesSidebarResponse;





// Navbar Product Item
export interface NavbarProductItem {
    unique_id: string;
    product_type: "bike" | "accessories";
    name: string;
    image: string | null;
    price: number;
    brand: string | null;
    is_discound: boolean;
    discount_price: number;
    discount_percentage: number;
}

// Category inside bikes / accessories
export interface NavbarCategory {
    title: string;
    image: string | null;
    items: NavbarProductItem[];
}

// Root navbar response
export interface NavbarProductsResponse {
    bikes: NavbarCategory[];
    accessories: NavbarCategory[];
}
