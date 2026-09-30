import { Activity } from 'lucide-react'

const Fps = ({ fps }: { fps: number }) => {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div>
        <h2 className="text-sm font-semibold text-zinc-950">Camera</h2>

        <p className="mt-0.5 text-xs text-zinc-500">
          Position your hand inside the camera frame.
        </p>
      </div>

      <div className="hidden items-center gap-1.5 text-xs text-zinc-400 sm:flex">
        <Activity className="size-3.5" />
        {fps} FPS
      </div>
    </div>
  )
}
export default Fps
