import type { HandLandmark } from '@hand-tracker/core'
import { motion } from 'motion/react'

type HandOverlayProps = {
  hands: HandLandmark[][]
}

const HAND_CONNECTIONS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],

  [0, 5],
  [5, 6],
  [6, 7],
  [7, 8],

  [0, 9],
  [9, 10],
  [10, 11],
  [11, 12],

  [0, 13],
  [13, 14],
  [14, 15],
  [15, 16],

  [0, 17],
  [17, 18],
  [18, 19],
  [19, 20],

  [5, 9],
  [9, 13],
  [13, 17],
]

const FINGERTIP_LANDMARKS = [4, 8, 12, 16, 20]

const HandOverlay = ({ hands }: HandOverlayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="pointer-events-none absolute inset-0 will-change-[opacity]"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {hands.map((hand, handIndex) => (
          <g key={handIndex}>
            {HAND_CONNECTIONS.map(([start, end]) => {
              const startPoint = hand[start]
              const endPoint = hand[end]

              if (!startPoint || !endPoint) {
                return null
              }

              return (
                <line
                  key={`${start}-${end}`}
                  x1={(1 - startPoint.x) * 100}
                  y1={startPoint.y * 100}
                  x2={(1 - endPoint.x) * 100}
                  y2={endPoint.y * 100}
                  className="stroke-blue-400/50"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                />
              )
            })}

            {/* Landmarks */}
            {hand.map((landmark, landmarkIndex) => {
              const isFingertip = FINGERTIP_LANDMARKS.includes(landmarkIndex)

              const x = (1 - landmark.x) * 100
              const y = landmark.y * 100

              return (
                <g key={landmarkIndex}>
                  {isFingertip && (
                    <circle
                      cx={x}
                      cy={y}
                      r="2.8"
                      className="fill-blue-400/10"
                    />
                  )}

                  <circle
                    cx={x}
                    cy={y}
                    r={isFingertip ? 1.5 : 0.65}
                    className={
                      isFingertip
                        ? 'fill-white stroke-blue-400'
                        : 'fill-blue-400/80'
                    }
                    strokeWidth={isFingertip ? 0.4 : 0}
                  />
                </g>
              )
            })}
          </g>
        ))}
      </svg>
    </motion.div>
  )
}

export default HandOverlay
