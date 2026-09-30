import { Move } from 'lucide-react'
import GestureRow from '../shared/gestureRow/GestureRow'

const Guide = () => {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
        <Move className="size-3.5" />
        Gesture guide
      </div>

      <div className="mt-4 space-y-2">
        <GestureRow gesture="Point" action="Move cursor" />

        <GestureRow gesture="Index pinch" action="Left click" />

        <GestureRow gesture="Rock" action="Right click" />

        <GestureRow gesture="Peace" action="Scroll" />

        <GestureRow gesture="Open Hand" action="Drag" />

        <GestureRow gesture="Fist" action="Select" />
      </div>
    </section>
  )
}

export default Guide
