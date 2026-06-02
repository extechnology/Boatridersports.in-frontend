"use client"

import React, {
  useEffect,
  useMemo,
  useState,
} from "react"
import { AnimatePresence, motion } from "framer-motion"

// Define the structure for our logo objects
interface Logo {
  name: string
  id: number
  img: string
}

// Utility function to randomly shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Utility function to distribute logos across multiple columns
const distributeLogos = (allLogos: Logo[], columnCount: number): Logo[][] => {
  const columns: Logo[][] = Array.from({ length: columnCount }, () => [])

  // Create enough copies of logos to fill all columns adequately
  const minLogosPerColumn = Math.max(3, Math.ceil(allLogos.length / columnCount))

  // Shuffle and repeat logos to ensure each column has enough items
  const shuffled = shuffleArray(allLogos)
  const expandedLogos = []

  while (expandedLogos.length < columnCount * minLogosPerColumn) {
    expandedLogos.push(...shuffled)
  }

  // Distribute evenly across columns
  expandedLogos.forEach((logo, index) => {
    columns[index % columnCount].push(logo)
  })

  return columns
}

interface LogoColumnProps {
  logos: Logo[]
  index: number
}

const LogoColumn: React.FC<LogoColumnProps> = React.memo(
  ({ logos, index }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const cycleInterval = 2000
    const columnDelay = index * 200

    useEffect(() => {
      // Initial delay for staggered start
      const initialTimeout = setTimeout(() => {
        // Start the interval after the initial delay
        const intervalId = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % logos.length)
        }, cycleInterval)

        return () => clearInterval(intervalId)
      }, columnDelay)

      return () => clearTimeout(initialTimeout)
    }, [logos.length, cycleInterval, columnDelay])

    const currentLogo = logos[currentIndex]

    return (
      <motion.div
        className="w-24 h-14 md:w-48 md:h-24 overflow-hidden relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * 0.1,
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentLogo.id}-${currentIndex}`}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ y: "10%", opacity: 0, filter: "blur(8px)" }}
            animate={{
              y: "0%",
              opacity: 1,
              filter: "blur(0px)",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                mass: 1,
                bounce: 0.2,
                duration: 0.5,
              },
            }}
            exit={{
              y: "-20%",
              opacity: 0,
              filter: "blur(6px)",
              transition: {
                type: "tween",
                ease: "easeIn",
                duration: 0.3,
              },
            }}
          >
            <img
              src={currentLogo.img}
              alt={currentLogo.name}
              className="w-20 h-20 md:w-52 md:h-52 max-w-full max-h-full object-contain"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    )
  }
)

LogoColumn.displayName = "LogoColumn"

function LogoCarousel({ columnCount = 6, data }: { columnCount?: number; data: string[] }) {
  const [logoSets, setLogoSets] = useState<Logo[][]>([])

  const allLogos: Logo[] = useMemo(
    () => data.map((logo, index) => ({ name: logo, id: index + 1, img: logo })),
    [data]
  )

  useEffect(() => {
    const distributedLogos = distributeLogos(allLogos, columnCount)
    setLogoSets(distributedLogos)
  }, [allLogos, columnCount])

  return (
    <div className="flex space-x-4 p-8">
      {logoSets.map((logos, index) => (
        <LogoColumn
          key={index}
          logos={logos}
          index={index}
        />
      ))}
    </div>
  )
}


export { LogoCarousel }