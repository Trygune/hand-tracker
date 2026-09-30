import { ScanFace } from 'lucide-react'

type ControlMode = 'browser' | 'desktop'

type TrackingProps = {
  hands: number
  mode: ControlMode
  onModeChange: (mode: ControlMode) => void
}

const Tracking = ({ hands, mode, onModeChange }: TrackingProps) => {
  const isDesktop = mode === 'desktop'

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
        <ScanFace className="size-3.5" />
        Tracking
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500">Hands detected</span>

          <span className="font-mono text-xs font-semibold text-zinc-900">
            {hands}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500">Control mode</span>

          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-medium ${
                !isDesktop ? 'text-blue-600' : 'text-zinc-400'
              }`}
            >
              Browser
            </span>

            <button
              type="button"
              onClick={() => onModeChange(isDesktop ? 'browser' : 'desktop')}
              className="relative h-5 w-9 rounded-full bg-zinc-200 transition"
            >
              <span
                className={`absolute top-0.5 size-4 rounded-full bg-white shadow-sm transition-transform ${
                  isDesktop ? 'translate-x-0' : '-translate-x-4'
                }`}
              />
            </button>

            <span
              className={`text-xs font-medium ${
                isDesktop ? 'text-blue-600' : 'text-zinc-400'
              }`}
            >
              Desktop
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Tracking
