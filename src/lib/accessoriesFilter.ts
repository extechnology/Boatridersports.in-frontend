import { AccessoriesActiveFilterState, AccessoryProduct } from "@/types/product";

export type AccessoriesFilterArrayKey = Exclude<
    keyof AccessoriesActiveFilterState,
    "search" | "min_price" | "max_price"
>;

export const ACCESSORY_FILTER_ARRAY_KEYS: AccessoriesFilterArrayKey[] = [
    "brand",
    "category",
    "sub_category",
    "model_no",
    "model_name",
    "speed",
    "tire_type",
    "hub_width",
    "valve_type",
    "size",
    "ml",
    "color",
    "bike_mounted_type",
    "material",
    "warranty",
    "special_tag",
];

export const BIKE_FILTER_ARRAY_KEYS = [
    "brand",
    "category",
    "color",
    "size",
    "wheel_size",
    "material",
    "suspension",
    "rear_suspension_travel",
    "special_tag",
] as const;

export const FILTER_PARAM_LABELS: Record<string, string> = {
    name: "Search",
    brand: "Brand",
    category: "Category",
    sub_category: "Sub Category",
    model_no: "Model No.",
    model_name: "Model Name",
    speed: "Speed",
    tire_type: "Tire Type",
    hub_width: "Hub Width",
    valve_type: "Valve Type",
    size: "Size",
    ml: "Volume",
    color: "Color",
    bike_mounted_type: "Mount",
    material: "Material",
    warranty: "Warranty",
    wheel_size: "Wheel Size",
    suspension: "Suspension",
    rear_suspension_travel: "Rear Travel",
    special_tag: "Tag",
};

interface SearchParamsLike {
    getAll(name: string): string[];
    get(name: string): string | null;
}

/**
 * Extracts multi-value query params supporting both repeating keys (?brand=A&brand=B)
 * and legacy comma-separated values (?brand=A,B).
 */
export function getParamValues(searchParams: SearchParamsLike, key: string): string[] {
    const rawValues = searchParams.getAll(key);
    const seen = new Set<string>();
    const result: string[] = [];

    for (const raw of rawValues) {
        const parts = raw.includes(",") ? raw.split(",") : [raw];
        for (const part of parts) {
            const trimmed = part.trim();
            if (trimmed && !seen.has(trimmed)) {
                seen.add(trimmed);
                result.push(trimmed);
            }
        }
    }

    return result;
}

export function parseAccessoriesFiltersFromSearchParams(
    searchParams: SearchParamsLike
): AccessoriesActiveFilterState {
    const minRaw = searchParams.get("min_price");
    const maxRaw = searchParams.get("max_price");
    const minParsed = minRaw !== null && minRaw !== "" ? Number(minRaw) : undefined;
    const maxParsed = maxRaw !== null && maxRaw !== "" ? Number(maxRaw) : undefined;

    return {
        search: searchParams.get("name") || "",
        brand: getParamValues(searchParams, "brand"),
        category: getParamValues(searchParams, "category"),
        sub_category: getParamValues(searchParams, "sub_category"),
        model_no: getParamValues(searchParams, "model_no"),
        model_name: getParamValues(searchParams, "model_name"),
        speed: getParamValues(searchParams, "speed"),
        tire_type: getParamValues(searchParams, "tire_type"),
        hub_width: getParamValues(searchParams, "hub_width"),
        valve_type: getParamValues(searchParams, "valve_type"),
        size: getParamValues(searchParams, "size"),
        ml: getParamValues(searchParams, "ml"),
        color: getParamValues(searchParams, "color"),
        bike_mounted_type: getParamValues(searchParams, "bike_mounted_type"),
        material: getParamValues(searchParams, "material"),
        warranty: getParamValues(searchParams, "warranty"),
        special_tag: getParamValues(searchParams, "special_tag"),
        min_price: minParsed !== undefined && Number.isFinite(minParsed) ? minParsed : undefined,
        max_price: maxParsed !== undefined && Number.isFinite(maxParsed) ? maxParsed : undefined,
    };
}

/**
 * Constructs the API query string for `/product/products-filtered/` with repeating array keys.
 */
export function buildAccessoriesFilterQuery(
    filters: AccessoriesActiveFilterState,
    page: number = 1
): string {
    const params = new URLSearchParams();
    params.append("type", "accessories");
    params.append("page", page.toString());

    if (filters.search?.trim()) {
        params.append("name", filters.search.trim());
    }

    ACCESSORY_FILTER_ARRAY_KEYS.forEach((key) => {
        const values = filters[key];
        if (Array.isArray(values)) {
            values.forEach((val) => {
                if (val) params.append(key, val);
            });
        }
    });

    if (typeof filters.min_price === "number" && Number.isFinite(filters.min_price)) {
        params.append("min_price", filters.min_price.toString());
    }
    if (typeof filters.max_price === "number" && Number.isFinite(filters.max_price)) {
        params.append("max_price", filters.max_price.toString());
    }

    return params.toString();
}

/**
 * Normalizes product image lists whether the API returns `string[]` or `{ id, image }[]`.
 */
export function normalizeImageList(
    images?: (string | { image?: string | null } | null | undefined)[] | null
): string[] {
    if (!Array.isArray(images)) return [];
    const result: string[] = [];

    for (const entry of images) {
        if (typeof entry === "string") {
            const trimmed = entry.trim();
            if (trimmed) result.push(trimmed);
        } else if (entry && typeof entry === "object" && typeof entry.image === "string") {
            const trimmed = entry.image.trim();
            if (trimmed) result.push(trimmed);
        }
    }

    return result;
}

const ACCESSORY_SPEC_FIELDS: Array<{
    key: keyof AccessoryProduct;
    label: string;
}> = [
    { key: "model_name", label: "Model Name" },
    { key: "model_no", label: "Model No." },
    { key: "category", label: "Category" },
    { key: "sub_category", label: "Sub Category" },
    { key: "speed", label: "Speed" },
    { key: "tire_type", label: "Tire Type" },
    { key: "hub_width", label: "Hub Width" },
    { key: "valve_type", label: "Valve Type" },
    { key: "size", label: "Size" },
    { key: "ml", label: "Volume" },
    { key: "color", label: "Color" },
    { key: "bike_mounted_type", label: "Mount Type" },
    { key: "material", label: "Material" },
    { key: "warranty", label: "Warranty" },
];

export function getAccessorySpecEntries(
    product: Partial<AccessoryProduct>
): Array<{ label: string; value: string }> {
    const entries: Array<{ label: string; value: string }> = [];

    for (const field of ACCESSORY_SPEC_FIELDS) {
        const raw = product[field.key];
        if (typeof raw === "string" && raw.trim()) {
            entries.push({ label: field.label, value: raw.trim() });
        }
    }

    return entries;
}

const CARD_CHIP_FIELDS: Array<keyof AccessoryProduct> = [
    "speed",
    "tire_type",
    "ml",
    "size",
    "valve_type",
    "hub_width",
    "bike_mounted_type",
    "material",
    "warranty",
];

export function getAccessoryCardChips(product: Partial<AccessoryProduct>, limit: number = 3): string[] {
    const chips: string[] = [];

    for (const key of CARD_CHIP_FIELDS) {
        const raw = product[key];
        if (typeof raw === "string" && raw.trim() && !chips.includes(raw.trim())) {
            chips.push(raw.trim());
            if (chips.length >= limit) break;
        }
    }

    return chips;
}

export function formatFilterPrice(value: number): string {
    if (!Number.isFinite(value)) return "₹0";
    if (value >= 100000) {
        return `₹${(value / 100000).toFixed(1)}L`;
    }
    return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

const COLOR_NAME_MAP: Record<string, string> = {
    black: "#111827",
    "matte black": "#1f2937",
    white: "#ffffff",
    red: "#dc2626",
    orange: "#f97316",
    silver: "#cbd5e1",
    grey: "#6b7280",
    gray: "#6b7280",
    "matte grey": "#64748b",
    "matte gray": "#64748b",
    blue: "#2563eb",
    navy: "#1e3a8a",
    green: "#16a34a",
    yellow: "#eab308",
    gold: "#d97706",
    pink: "#ec4899",
    purple: "#9333ea",
    brown: "#78350f",
    tan: "#d2b48c",
    beige: "#f5f5dc",
    teal: "#0d9488",
    cyan: "#06b6d4",
    clear: "linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)",
    transparent: "linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)",
};

export function getColorSwatchStyle(colorName: string): string | null {
    const normalized = colorName.trim().toLowerCase();
    if (COLOR_NAME_MAP[normalized]) return COLOR_NAME_MAP[normalized];

    for (const [key, css] of Object.entries(COLOR_NAME_MAP)) {
        if (normalized.includes(key)) return css;
    }

    return null;
}

