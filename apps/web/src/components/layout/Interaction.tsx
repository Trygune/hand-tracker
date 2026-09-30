import type { InteractionType } from '@hand-tracker/core'
import { Hand, MousePointer2, Sparkles } from 'lucide-react'

type InteractionProps = {
  interaction: InteractionType
  isTracking: boolean
}

const Interaction = ({ interaction, isTracking }: InteractionProps) => {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
        <Sparkles className="size-3.5" />
        Current interaction
      </div>

      <div className="mt-5 flex items-center gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          {interaction === 'none' ? (
            <Hand className="size-5" />
          ) : (
            <MousePointer2 className="size-5" />
          )}
        </div>

        <div className="min-w-0">
          <p className="truncate text-lg font-semibold capitalize">
            {interaction.replace('-', ' ')}
          </p>

          <p className="mt-0.5 text-xs text-zinc-500">
            {isTracking ? 'Detected interaction' : 'Waiting for camera'}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Interaction
