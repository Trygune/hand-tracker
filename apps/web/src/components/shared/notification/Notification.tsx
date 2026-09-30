import { motion, AnimatePresence } from 'motion/react'
import { Check, MousePointer2 } from 'lucide-react'
import type { NotificationProps } from './Notification.types'

const Notification = ({ visible, message }: NotificationProps) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
          className="fixed right-5 top-10 z-9999 w-[calc(100%-2.5rem)] max-w-sm"
        >
          <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-lg">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Check className="size-4" strokeWidth={2.5} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-zinc-900">
                Interaction successful
              </p>

              <p className="mt-0.5 flex items-center gap-1 text-xs text-zinc-500">
                <MousePointer2 className="size-3" />
                {message}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Notification
