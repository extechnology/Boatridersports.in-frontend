import Image from "next/image";

export default function ProductLoading() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-black">
            <div className="relative flex flex-col items-center">
                <div className="relative w-32 h-32 animate-pulse">
                    <Image
                        src="/black-logo.png"
                        alt="Loading..."
                        fill
                        className="object-contain dark:hidden"
                        priority
                    />
                    <Image
                        src="/white-logo.png"
                        alt="Loading..."
                        fill
                        className="object-contain hidden dark:block"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
