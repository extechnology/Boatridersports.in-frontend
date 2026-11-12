"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, Check, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { ReadonlyURLSearchParams } from "next/navigation";
import {
    AccessoriesSidebarResponse,
    BikeSidebarColor,
    BikeSidebarResponse,
    SidebarResponse,
} from "@/types/product";
import {
    formatFilterPrice,
    getColorSwatchStyle,
    getParamValues,
} from "@/lib/accessoriesFilter";

/* ---------------- Filter Section ---------------- */
interface FilterSectionProps {
    title: string;
    isOpen?: boolean;
    activeCount?: number;
    children: React.ReactNode;
}

const FilterSection = ({ title, isOpen = true, activeCount = 0, children }: FilterSectionProps) => {
    const [open, setOpen] = useState(isOpen || activeCount > 0);

    return (
        <div className="border-b border-zinc-200 dark:border-zinc-800 py-5 last:border-0">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center justify-between w-full text-left group hover:cursor-pointer"
            >
                <span className="font-bold text-base text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    {title}
                    {activeCount > 0 && (
                        <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-[11px] font-bold bg-black text-white dark:bg-white dark:text-black">
                            {activeCount}
                        </span>
                    )}
                </span>

                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-5 h-5 text-zinc-400" />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 pb-1 space-y-5">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/* ---------------- Reusable Sub-Filter Controls ---------------- */
const SubFilterHeader = ({ label, count }: { label: string; count?: number }) => (
    <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {label}
        </h4>
        {count !== undefined && count > 0 && (
            <span className="text-[11px] font-semibold text-zinc-900 dark:text-zinc-100">
                {count} selected
            </span>
        )}
    </div>
);

interface CheckboxFilterListProps {
    label?: string;
    paramKey: string;
    options: string[];
    isChecked: (key: string, value: string) => boolean;
    onToggle: (key: string, value: string) => void;
    searchable?: boolean;
}

const CheckboxFilterList = ({
    label,
    paramKey,
    options,
    isChecked,
    onToggle,
    searchable = false,
}: CheckboxFilterListProps) => {
    const [query, setQuery] = useState("");
    if (!options || options.length === 0) return null;

    const showSearch = searchable && options.length > 6;
    const filteredOptions = showSearch && query.trim()
        ? options.filter((opt) => opt.toLowerCase().includes(query.trim().toLowerCase()))
        : options;

    const selectedCount = options.filter((opt) => isChecked(paramKey, opt)).length;

    return (
        <div className="space-y-2.5">
            {label && <SubFilterHeader label={label} count={selectedCount} />}

            {showSearch && (
                <div className="relative">
                    <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={`Filter ${label?.toLowerCase() ?? "options"}...`}
                        className="w-full h-8 pl-8 pr-7 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => setQuery("")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                            aria-label="Clear list search"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
            )}

            <div className={cn("space-y-2.5", options.length > 7 && "max-h-52 overflow-y-auto pr-1")}>
                {filteredOptions.length === 0 ? (
                    <p className="text-xs text-zinc-400 py-1">No matches found</p>
                ) : (
                    filteredOptions.map((option) => {
                        const checked = isChecked(paramKey, option);
                        return (
                            <label
                                key={option}
                                className="flex items-center gap-2.5 cursor-pointer group text-sm text-zinc-700 dark:text-zinc-300"
                            >
                                <Checkbox
                                    className="hover:cursor-pointer border-2 border-zinc-400 dark:border-zinc-700"
                                    checked={checked}
                                    onCheckedChange={() => onToggle(paramKey, option)}
                                />
                                <span className={cn("leading-snug", checked && "font-semibold text-zinc-950 dark:text-white")}>
                                    {option}
                                </span>
                            </label>
                        );
                    })
                )}
            </div>
        </div>
    );
};

interface PillFilterListProps {
    label?: string;
    paramKey: string;
    options: string[];
    isChecked: (key: string, value: string) => boolean;
    onToggle: (key: string, value: string) => void;
    compact?: boolean;
}

const PillFilterList = ({
    label,
    paramKey,
    options,
    isChecked,
    onToggle,
    compact = false,
}: PillFilterListProps) => {
    if (!options || options.length === 0) return null;

    const selectedCount = options.filter((opt) => isChecked(paramKey, opt)).length;

    return (
        <div className="space-y-2.5">
            {label && <SubFilterHeader label={label} count={selectedCount} />}
            <div className="flex flex-wrap gap-2">
                {options.map((option) => {
                    const active = isChecked(paramKey, option);
                    return (
                        <button
                            key={option}
                            type="button"
                            onClick={() => onToggle(paramKey, option)}
                            className={cn(
                                "rounded-lg border text-xs font-semibold transition-all hover:cursor-pointer",
                                compact ? "px-3 py-1.5" : "px-3.5 h-9",
                                active
                                    ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-sm"
                                    : "bg-zinc-50 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                            )}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

/* ---------------- Accessory Color Swatch Chips ---------------- */
const AccessoryColorFilter = ({
    colors,
    isChecked,
    onToggle,
}: {
    colors: string[];
    isChecked: (key: string, value: string) => boolean;
    onToggle: (key: string, value: string) => void;
}) => {
    if (!colors || colors.length === 0) return null;

    const selectedCount = colors.filter((c) => isChecked("color", c)).length;

    return (
        <div className="space-y-2.5">
            <SubFilterHeader label="Color" count={selectedCount} />
            <div className="flex flex-wrap gap-2">
                {colors.map((colorName) => {
                    const active = isChecked("color", colorName);
                    const swatch = getColorSwatchStyle(colorName);

                    return (
                        <button
                            key={colorName}
                            type="button"
                            onClick={() => onToggle("color", colorName)}
                            className={cn(
                                "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all hover:cursor-pointer",
                                active
                                    ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-sm"
                                    : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                            )}
                        >
                            {swatch && (
                                <span
                                    className="w-3.5 h-3.5 rounded-full border border-zinc-300 dark:border-zinc-600 shrink-0"
                                    style={{ background: swatch }}
                                />
                            )}
                            <span>{colorName}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

/* ---------------- Dynamic Price Range Filter ---------------- */
interface PriceRangeSectionProps {
    boundMin: number;
    boundMax: number;
    searchParams: ReadonlyURLSearchParams;
    onSetRange: (minKey: string, maxKey: string, min: number, max: number) => void;
    presets: Array<{ label: string; min: number; max: number }>;
    embedded?: boolean;
}

const PriceRangeControl = ({
    boundMin,
    boundMax,
    searchParams,
    onSetRange,
    presets,
}: Omit<PriceRangeSectionProps, "embedded">) => {
    const rawMinParam = searchParams.get("min_price");
    const rawMaxParam = searchParams.get("max_price");

    const parsedMin = rawMinParam !== null && rawMinParam !== "" ? Number(rawMinParam) : boundMin;
    const parsedMax = rawMaxParam !== null && rawMaxParam !== "" ? Number(rawMaxParam) : boundMax;

    const clampedUrlMin = Math.max(
        boundMin,
        Math.min(boundMax, Number.isFinite(parsedMin) ? parsedMin : boundMin)
    );
    const clampedUrlMax = Math.min(
        boundMax,
        Math.max(clampedUrlMin, Number.isFinite(parsedMax) ? parsedMax : boundMax)
    );
    const urlKey = `${clampedUrlMin}-${clampedUrlMax}`;

    const [dragState, setDragState] = useState<{ urlKey: string; range: [number, number] } | null>(
        null
    );

    const activeRange =
        dragState && dragState.urlKey === urlKey
            ? dragState.range
            : ([clampedUrlMin, clampedUrlMax] as [number, number]);

    const [displayMin, displayMax] = activeRange;
    const span = Math.max(0, boundMax - boundMin);
    const step = span <= 2000 ? 50 : span <= 20000 ? 100 : span <= 100000 ? 500 : 5000;

    return (
        <div className="px-1 space-y-4">
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                            Min Price
                        </span>
                        <span className="text-sm font-black text-zinc-900 dark:text-zinc-100">
                            {formatFilterPrice(displayMin)}
                        </span>
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                            Max Price
                        </span>
                        <span className="text-sm font-black text-zinc-900 dark:text-zinc-100">
                            {formatFilterPrice(displayMax)}
                        </span>
                    </div>
                </div>

                {span > 0 && (
                    <Slider
                        min={boundMin}
                        max={boundMax}
                        step={step}
                        value={[displayMin, displayMax]}
                        onValueChange={([min, max]) => setDragState({ urlKey, range: [min, max] })}
                        onValueCommit={([min, max]) => {
                            setDragState({ urlKey, range: [min, max] });
                            onSetRange("min_price", "max_price", min, max);
                        }}
                        className="py-3"
                    />
                )}
            </div>

            {presets.length > 0 && span > 0 && (
                <div className="flex flex-wrap gap-2">
                    {presets.map((preset) => {
                        const isActive = displayMin === preset.min && displayMax === preset.max;
                        return (
                            <button
                                key={preset.label}
                                type="button"
                                onClick={() => {
                                    setDragState({ urlKey, range: [preset.min, preset.max] });
                                    onSetRange("min_price", "max_price", preset.min, preset.max);
                                }}
                                className={cn(
                                    "px-3 py-1.5 rounded-full text-[11px] font-bold transition-all duration-200 border hover:cursor-pointer",
                                    isActive
                                        ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-sm"
                                        : "bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                                )}
                            >
                                {preset.label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

/* ---------------- Props ---------------- */
interface FilterSidebarProps {
    className?: string;
    onClose?: () => void;
    categoriesData: SidebarResponse;
    searchParams: ReadonlyURLSearchParams;
    onToggle: (key: string, value: string) => void;
    onSetRange: (
        minKey: string,
        maxKey: string,
        min: number,
        max: number
    ) => void;
    onClearAll: () => void;
}

function buildAccessoryPresets(boundMin: number, boundMax: number) {
    const candidates = [
        { label: "Under ₹1,000", min: boundMin, max: 1000 },
        { label: "₹1k - ₹5k", min: 1000, max: 5000 },
        { label: "₹5k - ₹15k", min: 5000, max: 15000 },
        { label: "Over ₹15k", min: 15000, max: boundMax },
    ];

    return candidates
        .map((preset) => ({
            label: preset.label,
            min: Math.max(boundMin, preset.min),
            max: Math.min(boundMax, preset.max),
        }))
        .filter((preset) => preset.max > preset.min);
}

/* ---------------- Component ---------------- */
export default function FilterSidebar({
    className,
    onClose,
    categoriesData,
    searchParams,
    onToggle,
    onSetRange,
    onClearAll,
}: FilterSidebarProps) {
    const isChecked = (key: string, value: string) =>
        getParamValues(searchParams, key).includes(value);

    const countActiveInKeys = (keys: string[]): number => {
        let count = 0;
        for (const key of keys) {
            if (key === "price_range") {
                if (searchParams.has("min_price") || searchParams.has("max_price")) count += 1;
            } else {
                count += getParamValues(searchParams, key).length;
            }
        }
        return count;
    };

    const isBike = categoriesData.product_type === "bike";

    const mrpMin = categoriesData.mrp_range?.min_price;
    const mrpMax = categoriesData.mrp_range?.max_price;
    const hasMrpRange =
        typeof mrpMin === "number" &&
        typeof mrpMax === "number" &&
        Number.isFinite(mrpMin) &&
        Number.isFinite(mrpMax) &&
        mrpMax > 0;

    const priceBoundMin = hasMrpRange ? Math.max(0, Math.floor(mrpMin)) : 0;
    const priceBoundMax = hasMrpRange
        ? Math.ceil(mrpMax)
        : isBike
          ? 600000
          : 50000;

    const pricePresets = isBike
        ? [
              { label: "Under 50k", min: 0, max: 50000 },
              { label: "50k - 1.5L", min: 50000, max: 150000 },
              { label: "1.5L - 3L", min: 150000, max: 300000 },
              { label: "Over 3L", min: 300000, max: priceBoundMax },
          ]
        : buildAccessoryPresets(priceBoundMin, priceBoundMax);

    const renderBikeFilters = (data: BikeSidebarResponse) => {
        const categories = data.categories ?? [];
        const brands = data.brands ?? [];
        const colors: BikeSidebarColor[] = data.colors ?? [];
        const sizes = data.sizes ?? [];
        const wheelSizes = data.wheel_sizes ?? [];
        const materials = data.materials ?? [];
        const suspensions = data.suspensions ?? [];
        const rearSuspensionsTravel = data.rearSuspensionTravel ?? [];

        return (
            <>
                {categories.length > 0 && (
                    <FilterSection title="Categories" activeCount={countActiveInKeys(["category"])}>
                        <CheckboxFilterList
                            paramKey="category"
                            options={categories}
                            isChecked={isChecked}
                            onToggle={onToggle}
                        />
                    </FilterSection>
                )}

                {brands.length > 0 && (
                    <FilterSection title="Brands" activeCount={countActiveInKeys(["brand"])}>
                        <CheckboxFilterList
                            paramKey="brand"
                            options={brands}
                            isChecked={isChecked}
                            onToggle={onToggle}
                            searchable
                        />
                    </FilterSection>
                )}

                {colors.length > 0 && (
                    <FilterSection title="Color" activeCount={countActiveInKeys(["color"])}>
                        <div className="grid grid-cols-4 gap-3">
                            {colors.map((c) => {
                                const selected = isChecked("color", c.name);
                                return (
                                    <div
                                        key={c.name}
                                        onClick={() => onToggle("color", c.name)}
                                        className="flex flex-col items-center cursor-pointer select-none"
                                    >
                                        <div
                                            className={cn(
                                                "w-9 h-9 rounded-full border-2 flex items-center justify-center relative transition-all",
                                                selected && "ring-2 ring-black dark:ring-white"
                                            )}
                                            style={{
                                                background:
                                                    c.code?.length === 2
                                                        ? `linear-gradient(180deg, ${c.code[0]} 50%, ${c.code[1]} 50%)`
                                                        : c.code?.[0],
                                            }}
                                        >
                                            {selected && (
                                                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 dark:bg-white/30">
                                                    <Check
                                                        className={cn(
                                                            "w-4 h-4",
                                                            c.code?.[0]?.toLowerCase() === "#ffffff" ||
                                                                c.name.toLowerCase() === "white"
                                                                ? "text-black dark:text-white"
                                                                : "text-white"
                                                        )}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <span
                                            title={c.name}
                                            className="text-xs mt-1 max-w-10 truncate text-center"
                                        >
                                            {c.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </FilterSection>
                )}

                {sizes.length > 0 && (
                    <FilterSection title="Size" isOpen={false} activeCount={countActiveInKeys(["size"])}>
                        <PillFilterList
                            paramKey="size"
                            options={sizes}
                            isChecked={isChecked}
                            onToggle={onToggle}
                        />
                    </FilterSection>
                )}

                {wheelSizes.length > 0 && (
                    <FilterSection
                        title="Wheel Size"
                        isOpen={false}
                        activeCount={countActiveInKeys(["wheel_size"])}
                    >
                        <PillFilterList
                            paramKey="wheel_size"
                            options={wheelSizes}
                            isChecked={isChecked}
                            onToggle={onToggle}
                        />
                    </FilterSection>
                )}

                {materials.length > 0 && (
                    <FilterSection
                        title="Material"
                        isOpen={false}
                        activeCount={countActiveInKeys(["material"])}
                    >
                        <CheckboxFilterList
                            paramKey="material"
                            options={materials}
                            isChecked={isChecked}
                            onToggle={onToggle}
                        />
                    </FilterSection>
                )}

                {suspensions.length > 0 && (
                    <FilterSection
                        title="Suspension"
                        isOpen={false}
                        activeCount={countActiveInKeys(["suspension"])}
                    >
                        <CheckboxFilterList
                            paramKey="suspension"
                            options={suspensions}
                            isChecked={isChecked}
                            onToggle={onToggle}
                        />
                    </FilterSection>
                )}

                {rearSuspensionsTravel.length > 0 && (
                    <FilterSection
                        title="Rear Suspension Travel"
                        isOpen={false}
                        activeCount={countActiveInKeys(["rear_suspension_travel"])}
                    >
                        <CheckboxFilterList
                            paramKey="rear_suspension_travel"
                            options={rearSuspensionsTravel}
                            isChecked={isChecked}
                            onToggle={onToggle}
                        />
                    </FilterSection>
                )}

                <FilterSection title="Price Range" activeCount={countActiveInKeys(["price_range"])}>
                    <PriceRangeControl
                        boundMin={priceBoundMin}
                        boundMax={priceBoundMax}
                        searchParams={searchParams}
                        onSetRange={onSetRange}
                        presets={pricePresets}
                    />
                </FilterSection>
            </>
        );
    };

    const renderAccessoryFilters = (data: AccessoriesSidebarResponse) => {
        const brands = data.brands ?? [];
        const categories = data.categories ?? [];
        const subCategories = data.sub_categories ?? [];
        const modelNames = data.model_names ?? [];
        const modelNumbers = data.model_numbers ?? [];
        const speeds = data.speeds ?? [];
        const tireTypes = data.tire_types ?? [];
        const hubWidths = data.hub_widths ?? [];
        const valveTypes = data.valve_types ?? [];
        const sizes = data.sizes ?? [];
        const mlOptions = data.ml ?? [];
        const colors = data.colors ?? [];
        const materials = data.materials ?? [];
        const bikeMountedTypes = data.bike_mounted_types ?? [];
        const warranties = data.warranties ?? [];

        const hasGroup1 = brands.length > 0 || categories.length > 0 || subCategories.length > 0;
        const hasGroup2 = modelNames.length > 0 || modelNumbers.length > 0;
        const hasGroup3 =
            speeds.length > 0 ||
            tireTypes.length > 0 ||
            hubWidths.length > 0 ||
            valveTypes.length > 0;
        const hasGroup4 =
            sizes.length > 0 ||
            mlOptions.length > 0 ||
            colors.length > 0 ||
            materials.length > 0 ||
            bikeMountedTypes.length > 0;

        return (
            <>
                {/* 1. Brand & Categories */}
                {hasGroup1 && (
                    <FilterSection
                        title="Brand & Categories"
                        isOpen={true}
                        activeCount={countActiveInKeys(["brand", "category", "sub_category"])}
                    >
                        <CheckboxFilterList
                            label="Brand"
                            paramKey="brand"
                            options={brands}
                            isChecked={isChecked}
                            onToggle={onToggle}
                            searchable
                        />
                        <CheckboxFilterList
                            label="Category"
                            paramKey="category"
                            options={categories}
                            isChecked={isChecked}
                            onToggle={onToggle}
                        />
                        <CheckboxFilterList
                            label="Sub Category"
                            paramKey="sub_category"
                            options={subCategories}
                            isChecked={isChecked}
                            onToggle={onToggle}
                            searchable
                        />
                    </FilterSection>
                )}

                {/* 2. Model Identifiers */}
                {hasGroup2 && (
                    <FilterSection
                        title="Model Identifiers"
                        isOpen={false}
                        activeCount={countActiveInKeys(["model_name", "model_no"])}
                    >
                        <CheckboxFilterList
                            label="Model Name"
                            paramKey="model_name"
                            options={modelNames}
                            isChecked={isChecked}
                            onToggle={onToggle}
                            searchable
                        />
                        <CheckboxFilterList
                            label="Model No."
                            paramKey="model_no"
                            options={modelNumbers}
                            isChecked={isChecked}
                            onToggle={onToggle}
                            searchable
                        />
                    </FilterSection>
                )}

                {/* 3. Drivetrain & Wheels Specs */}
                {hasGroup3 && (
                    <FilterSection
                        title="Drivetrain & Wheels Specs"
                        isOpen={false}
                        activeCount={countActiveInKeys(["speed", "tire_type", "hub_width", "valve_type"])}
                    >
                        <PillFilterList
                            label="Speed"
                            paramKey="speed"
                            options={speeds}
                            isChecked={isChecked}
                            onToggle={onToggle}
                            compact
                        />
                        <CheckboxFilterList
                            label="Tire Type"
                            paramKey="tire_type"
                            options={tireTypes}
                            isChecked={isChecked}
                            onToggle={onToggle}
                        />
                        <CheckboxFilterList
                            label="Hub Width"
                            paramKey="hub_width"
                            options={hubWidths}
                            isChecked={isChecked}
                            onToggle={onToggle}
                        />
                        <PillFilterList
                            label="Valve Type"
                            paramKey="valve_type"
                            options={valveTypes}
                            isChecked={isChecked}
                            onToggle={onToggle}
                            compact
                        />
                    </FilterSection>
                )}

                {/* 4. Physical & Sizing Specs */}
                {hasGroup4 && (
                    <FilterSection
                        title="Physical & Sizing Specs"
                        isOpen={false}
                        activeCount={countActiveInKeys(["size", "ml", "color", "material", "bike_mounted_type"])}
                    >
                        <PillFilterList
                            label="Size"
                            paramKey="size"
                            options={sizes}
                            isChecked={isChecked}
                            onToggle={onToggle}
                            compact
                        />
                        <PillFilterList
                            label="Volume / Ml"
                            paramKey="ml"
                            options={mlOptions}
                            isChecked={isChecked}
                            onToggle={onToggle}
                            compact
                        />
                        <AccessoryColorFilter
                            colors={colors}
                            isChecked={isChecked}
                            onToggle={onToggle}
                        />
                        <CheckboxFilterList
                            label="Material"
                            paramKey="material"
                            options={materials}
                            isChecked={isChecked}
                            onToggle={onToggle}
                        />
                        <CheckboxFilterList
                            label="Bike Mounted Type"
                            paramKey="bike_mounted_type"
                            options={bikeMountedTypes}
                            isChecked={isChecked}
                            onToggle={onToggle}
                        />
                    </FilterSection>
                )}

                {/* 5. Warranty & Price Range */}
                <FilterSection
                    title={warranties.length > 0 ? "Warranty & Price Range" : "MRP Range"}
                    isOpen={true}
                    activeCount={countActiveInKeys(["warranty", "price_range"])}
                >
                    <PillFilterList
                        label="Warranty"
                        paramKey="warranty"
                        options={warranties}
                        isChecked={isChecked}
                        onToggle={onToggle}
                        compact
                    />
                    <div className="space-y-2.5">
                        <SubFilterHeader
                            label="MRP Range"
                            count={countActiveInKeys(["price_range"])}
                        />
                        <PriceRangeControl
                            boundMin={priceBoundMin}
                            boundMax={priceBoundMax}
                            searchParams={searchParams}
                            onSetRange={onSetRange}
                            presets={pricePresets}
                        />
                    </div>
                </FilterSection>
            </>
        );
    };

    return (
        <div className={cn("bg-white dark:bg-zinc-900 h-full flex flex-col", className)}>
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800 lg:hidden">
                <h2 className="font-bold text-xl">Filters</h2>
                <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close filters">
                    <X className="w-6 h-6" />
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 lg:p-0 lg:pr-6">
                {isBike
                    ? renderBikeFilters(categoriesData)
                    : renderAccessoryFilters(categoriesData)}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 sticky bottom-0 bg-white dark:bg-zinc-900">
                <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-zinc-400 dark:border-zinc-800 hover:border-zinc-600 dark:hover:border-zinc-600 hover:cursor-pointer"
                    onClick={onClearAll}
                >
                    Clear All Filters
                </Button>

                <div className="lg:hidden mt-3">
                    <Button size="lg" className="w-full" onClick={onClose}>
                        Show Results
                    </Button>
                </div>
            </div>
        </div>
    );
}
