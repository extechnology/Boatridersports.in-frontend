

// Base Product Interface
export interface BaseProduct {
    id: number;
    unique_id: string;
    name: string;
    description: string;
    category: string;
    brand: string;
    price: string | number;
    stock: number;
    is_available: boolean;
    is_out_of_stock: boolean;
    is_discount: boolean;
    discount_price: string | number;
    discount_percentage: string | number;
    special_tag?: string | null;
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


export interface BikeSizeVariant {
    id: number;
    size_id: number;
    size: string;
    price: string | number;
    stock: number;
    is_available: boolean;
    is_out_of_stock: boolean;
    is_discount: boolean;
    discount_price: string | number;
    discount_percentage: string | number;
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
    bike_sizes?: BikeSizeVariant[];

    bike_colors: BikeColorImage[];

    bike_spec_labels: BikeSpecLabel[];

    bike_posters: BikePoster[];
    bike_downloads: BikeDownload[];

}



// Accessory Product
export interface AccessoryImage {
    id: number;
    image: string;
}

export interface AccessoryProduct extends Omit<BaseProduct, "brand"> {

    product_type: "accessories";
    model_name?: string | null;
    model_no?: string | null;
    brand?: string | null;
    sub_category: string;
    accessory_images: (string | AccessoryImage)[];

    // Specific Filter / Spec Attributes
    speed?: string | null;
    tire_type?: string | null;
    hub_width?: string | null;
    valve_type?: string | null;
    size?: string | null;
    ml?: string | null;
    color?: string | null;
    bike_mounted_type?: string | null;
    material?: string | null;
    warranty?: string | null;
    shipping_charge?: string;

}

export type AccessoryItem = AccessoryProduct;



// pagination
export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
    total_pages?: number;
    current_page?: number;
}



// sidebar  
export interface BikeSidebarColor {
    name: string;
    code: string[];
}

export interface MrpRange {
    min_price: number;
    max_price: number;
}


export interface BaseSideBar {
    categories: string[];
    brands: string[];
    special_tags: string[];
    mrp_range?: MrpRange;
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
    product_type: "accessories";
    sub_categories: string[];
    model_numbers?: string[];
    model_names?: string[];
    speeds?: string[];
    tire_types?: string[];
    hub_widths?: string[];
    valve_types?: string[];
    sizes?: string[];
    ml?: string[];
    colors?: string[];
    bike_mounted_types?: string[];
    materials?: string[];
    warranties?: string[];
}

export type AccessoriesFilterSidebarData = AccessoriesSidebarResponse;

export interface AccessoriesActiveFilterState {
    search: string;
    brand: string[];
    category: string[];
    sub_category: string[];
    model_no: string[];
    model_name: string[];
    speed: string[];
    tire_type: string[];
    hub_width: string[];
    valve_type: string[];
    size: string[];
    ml: string[];
    color: string[];
    bike_mounted_type: string[];
    material: string[];
    warranty: string[];
    special_tag: string[];
    min_price?: number;
    max_price?: number;
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
