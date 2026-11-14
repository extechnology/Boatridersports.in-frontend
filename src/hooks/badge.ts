



export type BadgeTag =
    | "Best Seller"
    | "Bestseller"
    | "New Arrival"
    | "Trending"
    | "Limited"
    | "Pro Choice"
    | (string & {});


export const getBadgeStyle = (tag?: BadgeTag | null) => {

    switch (tag) {

        case "Best Seller":
        case "Bestseller":
            return "bg-linear-to-r from-amber-300 to-yellow-500 text-black shadow-amber-500/30";

        case "New Arrival":
            return "bg-linear-to-r from-emerald-400 to-teal-500 text-white shadow-emerald-500/30";

        case "Trending":
            return "bg-linear-to-r from-violet-500 to-purple-600 text-white shadow-purple-500/30";

        case "Limited":
            return "bg-linear-to-r from-rose-500 to-red-600 text-white shadow-red-500/30";

        case "Pro Choice":
            return "bg-linear-to-r from-sky-500 to-blue-600 text-white shadow-blue-500/30";

        default:
            return "bg-zinc-200 text-zinc-800";

    }

};
