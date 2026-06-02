export interface FilterState {
  categories: string[];
  subCategories: string[];
  brands: string[];
  colors: string[];
  sizes: string[];
  wheelSizes: string[];
  materials: string[];
  suspensions: string[];
  priceRange: [number, number];
}

export const initialFilterState: FilterState = {
  categories: [],
  subCategories: [],
  brands: [],
  colors: [],
  sizes: [],
  wheelSizes: [],
  materials: [],
  suspensions: [],
  priceRange: [0, 500000],
};
