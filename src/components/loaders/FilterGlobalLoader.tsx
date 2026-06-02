import { AnimatePresence, motion } from "framer-motion";



export default function FilterGlobalLoader({ text }: { text?: string }) {


    return (

        <AnimatePresence>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-999 bg-white/60 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center"
            >
                <div className="flex flex-col items-center gap-3">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-300 border-t-black dark:border-t-white" />
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        {text}
                    </p>
                </div>
            </motion.div>

        </AnimatePresence>

    );
}