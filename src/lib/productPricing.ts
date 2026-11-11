import { CartProduct } from "@/service/cart/types";
import { BikeProduct, BikeSizeVariant } from "@/types/product";

export interface VariantPricingResult {
    currentPrice: number;
    originalPrice: number | null;
    hasDiscount: boolean;
    discountPercent: number;
    isOutOfStock: boolean;
    stockCount: number;
    hasAnyStockAcrossSizes: boolean;
    activeVariant?: BikeSizeVariant;
}

export interface BikePriceDisplayResult {
    label: string;
    current: number;
    originalPrice: number | null;
    discountPercent: number;
    isRange: boolean;
}

export interface CartItemPricingResult {
    unitPrice: number;
    originalUnitPrice: number;
    hasDiscount: boolean;
    discountPercent: number;
}

function normalizeDiscountPercent(
    rawPrice: number,
    discountPrice: number,
    explicitPercent?: string | number
): number {
    const parsedExplicit = Number(explicitPercent);
    if (Number.isFinite(parsedExplicit) && parsedExplicit > 0) {
        return Math.round(parsedExplicit * 100) / 100;
    }
    if (rawPrice > 0 && discountPrice > 0 && discountPrice < rawPrice) {
        return Math.round(((rawPrice - discountPrice) / rawPrice) * 10000) / 100;
    }
    return 0;
}

export function isVariantOutOfStock(variant: Pick<BikeSizeVariant, "is_out_of_stock" | "stock" | "is_available">): boolean {
    return Boolean(variant.is_out_of_stock) || Number(variant.stock ?? 0) <= 0 || variant.is_available === false;
}

/**
 * Returns the initial size to preselect on a bike: prefers the first in-stock size variant.
 */
export function getInitialSelectedBikeSize(bike: Pick<BikeProduct, "sizes" | "bike_sizes">): string {
    if (bike.bike_sizes && bike.bike_sizes.length > 0) {
        const inStockVariant = bike.bike_sizes.find((v) => !isVariantOutOfStock(v));
        return inStockVariant ? inStockVariant.size : bike.bike_sizes[0].size;
    }
    return bike.sizes?.[0] || "";
}

/**
 * Returns true if every size variant is out of stock, or falls back to base bike stock flags.
 */
export function isBikeAllSizesOutOfStock(
    bike: Pick<BikeProduct, "is_out_of_stock" | "stock" | "bike_sizes">
): boolean {
    if (bike.bike_sizes && bike.bike_sizes.length > 0) {
        return bike.bike_sizes.every((v) => isVariantOutOfStock(v));
    }
    return Boolean(bike.is_out_of_stock) || Number(bike.stock ?? 0) <= 0;
}

/**
 * Computes active price, discount, and stock details for the currently selected bike size.
 */
export function getBikeVariantPricing(
    bike: Pick<
        BikeProduct,
        "price" | "stock" | "is_out_of_stock" | "is_discount" | "discount_price" | "discount_percentage" | "bike_sizes"
    >,
    selectedSize?: string
): VariantPricingResult {
    const variants = bike.bike_sizes ?? [];
    const activeVariant = selectedSize ? variants.find((v) => v.size === selectedSize) : undefined;
    const hasVariantPrice = activeVariant !== undefined && Number(activeVariant.price) > 0;

    const priceSource = hasVariantPrice ? activeVariant : bike;
    const rawPrice = Number(priceSource.price) || 0;
    const rawDiscountPrice = Number(priceSource.discount_price) || 0;
    const hasDiscount = Boolean(priceSource.is_discount) && rawDiscountPrice > 0;
    const currentPrice = hasDiscount ? rawDiscountPrice : rawPrice;
    const originalPrice = hasDiscount ? rawPrice : null;
    const discountPercent = hasDiscount
        ? normalizeDiscountPercent(rawPrice, rawDiscountPrice, priceSource.discount_percentage)
        : 0;

    const hasAnyStockAcrossSizes =
        variants.length > 0
            ? variants.some((v) => !isVariantOutOfStock(v))
            : !Boolean(bike.is_out_of_stock) && Number(bike.stock ?? 0) > 0;

    if (activeVariant) {
        const stockCount = Number(activeVariant.stock ?? 0);
        return {
            currentPrice,
            originalPrice,
            hasDiscount,
            discountPercent,
            isOutOfStock: isVariantOutOfStock(activeVariant),
            stockCount,
            hasAnyStockAcrossSizes,
            activeVariant,
        };
    }

    const baseStock = Number(bike.stock ?? 0);
    return {
        currentPrice,
        originalPrice,
        hasDiscount,
        discountPercent,
        isOutOfStock: Boolean(bike.is_out_of_stock) || baseStock <= 0,
        stockCount: baseStock,
        hasAnyStockAcrossSizes,
    };
}

/**
 * Formats catalog card pricing ("From ₹XX,XXX" when bike size prices vary, exact price otherwise).
 */
export function getBikePriceDisplay(
    bike: Pick<
        BikeProduct,
        "price" | "is_discount" | "discount_price" | "discount_percentage" | "bike_sizes"
    >
): BikePriceDisplayResult {
    const variants = bike.bike_sizes ?? [];

    const pricedEntries = variants
        .map((variant) => {
            const rawPrice = Number(variant.price) || 0;
            if (rawPrice <= 0) return null;
            const rawDiscount = Number(variant.discount_price) || 0;
            const hasDiscount = Boolean(variant.is_discount) && rawDiscount > 0;
            const effective = hasDiscount ? rawDiscount : rawPrice;
            const discountPercent = hasDiscount
                ? normalizeDiscountPercent(rawPrice, rawDiscount, variant.discount_percentage)
                : 0;
            return {
                effective,
                rawPrice,
                hasDiscount,
                discountPercent,
            };
        })
        .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

    if (pricedEntries.length > 0) {
        const prices = pricedEntries.map((e) => e.effective);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        const isRange = min !== max;
        const minEntry = pricedEntries.find((e) => e.effective === min) ?? pricedEntries[0];
        const maxDiscount = Math.max(...pricedEntries.map((e) => e.discountPercent), 0);

        return {
            label: isRange
                ? `From ₹${min.toLocaleString("en-IN")}`
                : `₹${min.toLocaleString("en-IN")}`,
            current: min,
            originalPrice: !isRange && minEntry.hasDiscount ? minEntry.rawPrice : null,
            discountPercent: isRange ? maxDiscount : minEntry.discountPercent,
            isRange,
        };
    }

    // Fallback to base bike pricing
    const rawPrice = Number(bike.price) || 0;
    const rawDiscount = Number(bike.discount_price) || 0;
    const hasDiscount = Boolean(bike.is_discount) && rawDiscount > 0;
    const current = hasDiscount ? rawDiscount : rawPrice;
    const discountPercent = hasDiscount
        ? normalizeDiscountPercent(rawPrice, rawDiscount, bike.discount_percentage)
        : 0;

    return {
        label: `₹${current.toLocaleString("en-IN")}`,
        current,
        originalPrice: hasDiscount ? rawPrice : null,
        discountPercent,
        isRange: false,
    };
}

/**
 * Resolves unit price, original MRP, and discount for a cart or checkout line item,
 * prioritizing size-specific prices (`effective_price`, `size_discount_price`, `size_price`).
 */
export function getCartItemPricing(item: CartProduct): CartItemPricingResult {
    const product = item.bike || item.accessory;
    if (!product) {
        return { unitPrice: 0, originalUnitPrice: 0, hasDiscount: false, discountPercent: 0 };
    }

    if (item.bike) {
        const matchedVariant = item.size?.size
            ? item.bike.bike_sizes?.find((v) => v.size === item.size?.size)
            : undefined;

        const hasExplicitEffective = item.effective_price !== undefined && item.effective_price !== null && Number(item.effective_price) > 0;
        const hasExplicitSizeDiscount = item.size_discount_price !== undefined && item.size_discount_price !== null && Number(item.size_discount_price) > 0;
        const hasExplicitSizePrice = item.size_price !== undefined && item.size_price !== null && Number(item.size_price) > 0;

        let unitPrice: number;
        let originalUnitPrice: number;

        if (hasExplicitEffective || hasExplicitSizePrice || hasExplicitSizeDiscount) {
            originalUnitPrice = hasExplicitSizePrice
                ? Number(item.size_price)
                : (matchedVariant && Number(matchedVariant.price) > 0 ? Number(matchedVariant.price) : Number(item.bike.price) || 0);

            unitPrice = hasExplicitEffective
                ? Number(item.effective_price)
                : hasExplicitSizeDiscount
                    ? Number(item.size_discount_price)
                    : originalUnitPrice;
        } else if (matchedVariant && Number(matchedVariant.price) > 0) {
            const vDisc = Boolean(matchedVariant.is_discount) && Number(matchedVariant.discount_price) > 0;
            originalUnitPrice = Number(matchedVariant.price);
            unitPrice = vDisc ? Number(matchedVariant.discount_price) : originalUnitPrice;
        } else {
            const baseDisc = Boolean(item.bike.is_discount) && Number(item.bike.discount_price) > 0;
            originalUnitPrice = Number(item.bike.price) || 0;
            unitPrice = baseDisc ? Number(item.bike.discount_price) : originalUnitPrice;
        }

        const hasDiscount = originalUnitPrice > unitPrice && unitPrice > 0;
        const explicitPercent = matchedVariant ? matchedVariant.discount_percentage : (!hasExplicitSizePrice && !hasExplicitEffective ? item.bike.discount_percentage : undefined);
        const discountPercent = hasDiscount
            ? normalizeDiscountPercent(originalUnitPrice, unitPrice, explicitPercent)
            : 0;

        return { unitPrice, originalUnitPrice, hasDiscount, discountPercent };
    }

    // Accessory item
    const accessory = item.accessory!;
    const originalUnitPrice = Number(accessory.price) || 0;
    const hasExplicitEffective = item.effective_price !== undefined && item.effective_price !== null && Number(item.effective_price) > 0;
    const accDisc = Boolean(accessory.is_discount) && Number(accessory.discount_price) > 0;
    const unitPrice = hasExplicitEffective
        ? Number(item.effective_price)
        : accDisc
            ? Number(accessory.discount_price)
            : originalUnitPrice;
    const hasDiscount = originalUnitPrice > unitPrice && unitPrice > 0;
    const discountPercent = hasDiscount
        ? normalizeDiscountPercent(originalUnitPrice, unitPrice, accessory.discount_percentage)
        : 0;

    return { unitPrice, originalUnitPrice, hasDiscount, discountPercent };
}

