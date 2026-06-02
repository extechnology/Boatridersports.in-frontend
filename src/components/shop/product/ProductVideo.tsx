"use client";



// props type
interface ProductVideoProps {
    videoId: string;
}



export function ProductVideo({ videoId }: ProductVideoProps) {

    if (!videoId) return null;


    return (

        <div className="w-full aspect-video overflow-hidden border border-zinc-200 dark:border-zinc-800">

            <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1`}
                title="Product Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                allowFullScreen
            />

        </div>

    );


}
