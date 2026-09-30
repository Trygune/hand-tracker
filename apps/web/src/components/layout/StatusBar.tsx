import {
  Activity,
  Hand,
  HandFist,
  MousePointer2,
  MousePointerClick,
  MousePointerSquareDashed,
  Scroll,
} from 'lucide-react'
import { upperCaseFirstLetter } from '../../lib/utility/upper'
import StatusItem from '../shared/statusItem/StatusItem'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import type { InteractionType } from '@hand-tracker/core'

type StatusBarProps = {
  gesture: InteractionType
  status: string
  FPS: number
}

const StatusBar = ({ gesture, status, FPS }: StatusBarProps) => {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(true)

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0
    if (current > previous && current > 150) {
      setHidden(false)
    } else {
      setHidden(true)
    }
  })

  return (
    <motion.div
      className="fixed left-0 top-0 w-full border-b border-zinc-200 bg-white px-5 py-3 z-50 header"
      animate={{
        y: hidden ? -140 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <StatusItem
            label="Gesture"
            value={upperCaseFirstLetter(gesture !== 'mouse' ? gesture : 'None')}
            status={
              !(gesture === 'mouse' || gesture === 'none')
                ? 'success'
                : 'default'
            }
            icon={
              gesture === 'drag'
                ? HandFist
                : gesture === 'left-click'
                  ? MousePointerClick
                  : gesture === 'right-click'
                    ? MousePointerSquareDashed
                    : gesture === 'scroll'
                      ? Scroll
                      : Hand
            }
          />

          <StatusItem
            label="Cursor"
            value={gesture === 'mouse' ? gesture : 'Idle'}
            status={gesture === 'mouse' ? 'success' : 'default'}
            icon={MousePointer2}
          />

          <StatusItem
            label="Tracking"
            value={upperCaseFirstLetter(status)}
            status={
              status == 'requesting'
                ? 'warning'
                : status == 'ready'
                  ? 'success'
                  : 'default'
            }
            icon={Activity}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500">FPS</span>

          <span className="font-mono text-xs font-medium text-zinc-900">
            {FPS}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
export default StatusBar
