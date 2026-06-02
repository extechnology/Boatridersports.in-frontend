interface Props {
    onRetry: () => void;
}

export default function FilterSidebarError({ onRetry }: Props) {
    return (
        <div className="p-6 text-center">
            <p className="text-sm text-red-500 mb-4">
                Failed to load filters
            </p>
            <button
                onClick={onRetry}
                className="text-sm font-semibold underline"
            >
                Retry
            </button>
        </div>
    );
}
