export async function serverFetch<T>(url: string, options?: RequestInit & { next?: { revalidate?: number } }): Promise<T> {

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) {
        throw new Error("API_URL is not defined");
    }

    const res = await fetch(`${baseUrl}${url}`, {
        ...options,      
    });

    if (!res.ok) {
        throw new Error(`Fetch failed: ${res.status}`);
    }

    return res.json();
}
