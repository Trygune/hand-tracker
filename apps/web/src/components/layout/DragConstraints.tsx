import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

const DragConstraints = () => {
  const constraintsRef = useRef<HTMLDivElement>(null)
  const dragElementRef = useRef<HTMLDivElement>(null)

  const [position, setPosition] = useState({
    x: 10,
    y: 10,
  })

  const dragOffset = useRef({
    x: 0,
    y: 0,
  })

  const dragging = useRef(false)

  const clampPosition = (x: number, y: number) => {
    const container = constraintsRef.current
    const element = dragElementRef.current

    if (!container || !element) {
      return { x, y }
    }

    const maxX = container.clientWidth - element.offsetWidth
    const maxY = container.clientHeight - element.offsetHeight

    return {
      x: Math.max(0, Math.min(x, maxX)),
      y: Math.max(0, Math.min(y, maxY)),
    }
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = constraintsRef.current

    if (!container) return

    const rect = container.getBoundingClientRect()

    dragOffset.current = {
      x: event.clientX - rect.left - position.x,
      y: event.clientY - rect.top - position.y,
    }

    dragging.current = true
  }

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      if (!dragging.current) return

      const container = constraintsRef.current

      if (!container) return

      const rect = container.getBoundingClientRect()

      const x = event.clientX - rect.left - dragOffset.current.x

      const y = event.clientY - rect.top - dragOffset.current.y

      setPosition(clampPosition(x, y))
    }

    const handleUp = () => {
      dragging.current = false
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [])

  return (
    <motion.div
      ref={constraintsRef}
      className="relative mt-4 min-h-180 w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
    >
      <motion.div
        ref={dragElementRef}
        className="absolute flex size-34 items-center justify-center rounded-2xl bg-blue-500 text-center text-sm font-medium text-white"
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        Drag Me
        <div
          onMouseDown={handleMouseDown}
          className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing"
        />
      </motion.div>
    </motion.div>
  )
}

export default DragConstraints
