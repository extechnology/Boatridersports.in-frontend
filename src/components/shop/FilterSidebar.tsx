"use client";


import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { ReadonlyURLSearchParams } from "next/navigation";
import { SidebarResponse } from "@/types/product";




/* ---------------- Filter Section ---------------- */
interface FilterSectionProps {
    title: string;
    isOpen?: boolean;
    children: React.ReactNode;
}



const FilterSection = ({ title, isOpen = true, children }: FilterSectionProps) => {



    const [open, setOpen] = useState(isOpen);



    return (


        <div className="border-b border-zinc-200 dark:border-zinc-800 py-6 last:border-0">


            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full text-left group hover:cursor-pointer"
            >

                <span className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                    {title}
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
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 pb-2 space-y-4">{children}</div>
                    </motion.div>

                )}

            </AnimatePresence>

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



/* ---------------- Component ---------------- */
export default function FilterSidebar({ className, onClose, categoriesData, searchParams, onToggle, onSetRange, onClearAll, }: FilterSidebarProps) {


    const isChecked = (key: string, value: string) => searchParams.get(key)?.split(",").includes(value) ?? false;


    const isBike = categoriesData.product_type === "bike";



    // Categories
    const categories = categoriesData.categories;
    const subCategories = isBike ? [] : categoriesData.sub_categories;
    const brands = categoriesData.brands;
    const sizes = isBike ? categoriesData.sizes : [];
    const wheelSizes = isBike ? categoriesData.wheel_sizes : [];
    const materials = isBike ? categoriesData.materials : [];
    const suspensions = isBike ? categoriesData.suspensions : [];
    const rearSuspensionsTravel = isBike ? categoriesData.rearSuspensionTravel : [];
    const colors = isBike ? categoriesData.colors : [];



    // Price Range
    const [localMin, setLocalMin] = useState(Number(searchParams.get("min_price") || 0));
    const [localMax, setLocalMax] = useState(Number(searchParams.get("max_price") || 600000));

    useEffect(() => {
        setLocalMin(Number(searchParams.get("min_price") || 0));
        setLocalMax(Number(searchParams.get("max_price") || 600000));
    }, [searchParams]);


    const pricePresets = [
        { label: "Under 50k", min: 0, max: 50000 },
        { label: "50k - 1.5L", min: 50000, max: 150000 },
        { label: "1.5L - 3L", min: 150000, max: 300000 },
        { label: "Over 3L", min: 300000, max: 600000 },
    ];



    return (


        <div className={cn("bg-white dark:bg-zinc-900 h-full flex flex-col", className)}>


            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b lg:hidden">
                <h2 className="font-bold text-xl">Filters</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="w-8 h-8" />
                </Button>
            </div>


            <div className="flex-1 overflow-y-auto p-6 lg:p-0 lg:pr-6">



                {/* Categories */}
                {categories?.length > 0 && (

                    <FilterSection title={"Categories"}>

                        {categories?.map((cat: string) => (

                            <div key={cat} className="flex items-center gap-3">

                                <Checkbox
                                    className="hover:cursor-pointer border-2 border-zinc-400 dark:border-zinc-800"
                                    checked={isChecked("category", cat)}
                                    onCheckedChange={() =>
                                        onToggle("category", cat)
                                    }
                                />

                                <span>{cat}</span>

                            </div>

                        ))}

                    </FilterSection>

                )}




                {/* Sub Categories */}
                {subCategories?.length > 0 && (

                    <FilterSection title="Sub Categories">

                        {subCategories?.map((sub: string, idx: number) => (

                            <div key={idx} className="flex items-center gap-3">

                                <Checkbox
                                    className="hover:cursor-pointer border-2 border-zinc-400 dark:border-zinc-800"
                                    checked={isChecked("sub_category", sub)}
                                    onCheckedChange={() => onToggle("sub_category", sub)}
                                />

                                <span>{sub}</span>

                            </div>

                        ))}

                    </FilterSection>

                )}



                {/* Brands */}
                {brands?.length > 0 && (

                    <FilterSection title="Brands">

                        {brands?.map((brand: string) => (

                            <div key={brand} className="flex items-center gap-3">

                                <Checkbox
                                    className="hover:cursor-pointer border-2 border-zinc-400 dark:border-zinc-800"
                                    checked={isChecked("brand", brand)}
                                    onCheckedChange={() =>
                                        onToggle("brand", brand)
                                    }
                                />

                                <span>{brand}</span>

                            </div>

                        ))}

                    </FilterSection>

                )}



                {/* Colors */}
                {colors?.length > 0 && (

                    <FilterSection title="Color">

                        <div className="grid grid-cols-4 gap-3">

                            {colors?.map((c: any) => {

                                const selected = isChecked("color", c?.name);

                                return (

                                    <div
                                        key={c?.name}
                                        onClick={() => onToggle("color", c?.name)}
                                        className="flex flex-col items-center cursor-pointer select-none"
                                    >

                                        <div
                                            className={cn(
                                                "w-9 h-9 rounded-full border-2 flex items-center justify-center relative transition-all",
                                                selected && "ring-2 ring-black dark:ring-white"
                                            )}
                                            style={{
                                                background:
                                                    c?.code?.length === 2
                                                        ? `linear-gradient(180deg, ${c?.code[0]} 50%, ${c?.code[1]} 50%)`
                                                        : c?.code[0],
                                            }}
                                        >

                                            {selected && (
                                                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 dark:bg-white/30">
                                                    <Check
                                                        className={cn(
                                                            "w-4 h-4",
                                                            c?.code[0]?.toLowerCase() === "#ffffff" ||
                                                                c?.name.toLowerCase() === "white"
                                                                ? "text-black dark:text-white"
                                                                : "text-white"
                                                        )}
                                                    />
                                                </div>
                                            )}


                                        </div>


                                        <span
                                            title={c?.name}
                                            className="text-xs mt-1 max-w-10 truncate text-center"
                                        >
                                            {c?.name}
                                        </span>
                                    </div>
                                );
                            })}

                        </div>

                    </FilterSection>

                )}




                {/* Sizes */}
                {sizes?.length > 0 && (

                    <FilterSection title="Size" isOpen={false}>

                        <div className="flex flex-wrap gap-2">

                            {sizes?.map((s: string) => (

                                <button
                                    key={s}
                                    onClick={() => onToggle("size", s)}
                                    className={cn(
                                        "px-4 h-10 rounded-lg border hover:cursor-pointer",
                                        isChecked("size", s)
                                            ? "bg-black text-white dark:bg-white dark:text-black"
                                            : "border-zinc-300"
                                    )}
                                >
                                    {s}

                                </button>

                            ))}

                        </div>

                    </FilterSection>

                )}




                {/* Wheel Size */}
                {wheelSizes?.length > 0 && (

                    <FilterSection title="Wheel Size" isOpen={false}>

                        <div className="flex flex-wrap gap-2">

                            {wheelSizes?.map((s: string) => (

                                <button
                                    key={s}
                                    onClick={() => onToggle("wheel_size", s)}
                                    className={cn(
                                        "px-4 h-10 rounded-lg border hover:cursor-pointer",
                                        isChecked("wheel_size", s)
                                            ? "bg-black text-white dark:bg-white dark:text-black"
                                            : "border-zinc-300"
                                    )}
                                >
                                    {s}

                                </button>

                            ))}

                        </div>

                    </FilterSection>

                )}




                {/* Material */}
                {materials?.length > 0 && (

                    <FilterSection title="Material" isOpen={false}>

                        {materials?.map((m: string) => (

                            <div key={m} className="flex items-center gap-3">

                                <Checkbox
                                    className="hover:cursor-pointer border-2 border-zinc-400 dark:border-zinc-800"
                                    checked={isChecked("material", m)}
                                    onCheckedChange={() => onToggle("material", m)}
                                />

                                <span>{m}</span>

                            </div>

                        ))}

                    </FilterSection>

                )}




                {/* Suspension */}
                {suspensions?.length > 0 && (

                    <FilterSection title="Suspension" isOpen={false}>

                        {suspensions?.map((s: string) => (

                            <div key={s} className="flex items-center gap-3">

                                <Checkbox
                                    className="hover:cursor-pointer border-2 border-zinc-400 dark:border-zinc-800"
                                    checked={isChecked("suspension", s)}
                                    onCheckedChange={() => onToggle("suspension", s)}
                                />

                                <span>{s}</span>

                            </div>

                        ))}

                    </FilterSection>

                )}




                {/* Rear Suspension Travel */}
                {rearSuspensionsTravel?.length > 0 && (

                    <FilterSection title="Rear Suspension Travel" isOpen={false}>

                        {rearSuspensionsTravel?.map((s: string) => (

                            <div key={s} className="flex items-center gap-3">

                                <Checkbox
                                    className="hover:cursor-pointer border-2 border-zinc-400 dark:border-zinc-800"
                                    checked={isChecked("rear_suspension_travel", s)}
                                    onCheckedChange={() => onToggle("rear_suspension_travel", s)}
                                />

                                <span>{s}</span>

                            </div>

                        ))}

                    </FilterSection>

                )}




                {/* Price Range */}
                <FilterSection title="Price Range">
                    <div className="px-1 space-y-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Min Price</span>
                                    <span className="text-sm font-black text-zinc-900 dark:text-zinc-100">
                                        ₹{localMin >= 100000 ? `${(localMin / 100000).toFixed(1)}L` : (localMin / 1000).toFixed(0) + 'k'}
                                    </span>
                                </div>
                                <div className="flex flex-col text-right">
                                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Max Price</span>
                                    <span className="text-sm font-black text-zinc-900 dark:text-zinc-100">
                                        ₹{localMax >= 100000 ? `${(localMax / 100000).toFixed(1)}L` : (localMax / 1000).toFixed(0) + 'k'}
                                    </span>
                                </div>
                            </div>

                            <Slider
                                value={[localMin, localMax]}
                                max={600000}
                                step={5000}
                                onValueChange={([min, max]) => {
                                    setLocalMin(min);
                                    setLocalMax(max);
                                }}
                                onValueCommit={([min, max]) =>
                                    onSetRange("min_price", "max_price", min, max)
                                }
                                className="py-4"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {pricePresets.map((preset) => {
                                const isActive = localMin === preset.min && localMax === preset.max;
                                return (
                                    <button
                                        key={preset.label}
                                        onClick={() => {
                                            setLocalMin(preset.min);
                                            setLocalMax(preset.max);
                                            onSetRange("min_price", "max_price", preset.min, preset.max);
                                        }}
                                        className={cn(
                                            "px-3 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 border",
                                            isActive
                                                ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-lg shadow-black/10 dark:shadow-white/10 scale-105"
                                                : "bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                                        )}
                                    >
                                        {preset.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </FilterSection>


            </div>



            {/* Footer */}
            <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 sticky bottom-0 bg-white dark:bg-zinc-900">

                <Button variant="outline" size="lg" className="w-full border-zinc-400 dark:border-zinc-800 hover:border-zinc-600 dark:hover:border-zinc-600 hover:cursor-pointer" onClick={onClearAll}>
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
