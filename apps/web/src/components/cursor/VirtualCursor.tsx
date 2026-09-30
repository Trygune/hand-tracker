import { motion } from 'motion/react'
import {
  CircleDot,
  Hand,
  HandGrab,
  Mouse,
  MousePointer2,
  MousePointerClick,
  MousePointerSquareDashed,
} from 'lucide-react'
import type { CursorPosition, InteractionType } from '@hand-tracker/core'

type VirtualCursorProps = {
  position: CursorPosition
  gesture: InteractionType
}

const VirtualCursor = ({ position, gesture }: VirtualCursorProps) => {
  return (
    <motion.div
      className="pointer-events-none fixed z-9999 -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${position.x * 100}vw`,
        top: `${position.y * 100}vh`,
      }}
      animate={{
        scale: [1, 1.08, 1],
      }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {gesture === 'mouse' && (
        <MousePointer2
          size="24"
          strokeWidth="2.5px"
          className="fill-white text-blue-500"
        />
      )}
      {gesture === 'none' && (
        <Hand
          size="22"
          strokeWidth="2px"
          className="fill-white text-blue-500"
        />
      )}
      {gesture === 'left-click' && (
        <MousePointerClick
          size="32"
          strokeWidth="2px"
          className="fill-white text-blue-500"
        />
      )}
      {gesture === 'right-click' && (
        <MousePointerSquareDashed
          size="24"
          strokeWidth="2.5px"
          className="fill-white text-blue-500"
        />
      )}
      {gesture === 'scroll' && (
        <Mouse
          size="24"
          strokeWidth="2.5px"
          className="fill-white text-blue-500"
        />
      )}
      {gesture === 'drag' && (
        <HandGrab
          size="22"
          strokeWidth="2px"
          className="fill-white text-blue-500"
        />
      )}
      {gesture === 'select' && (
        <CircleDot
          size="22"
          strokeWidth="2px"
          className="fill-white text-blue-500"
        />
      )}
    </motion.div>
  )
}

export default VirtualCursor
