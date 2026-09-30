import type { LucideIcon } from 'lucide-react'

export type StatusItemProps = {
  label: string
  value: string
  status?: 'default' | 'success' | 'warning'
  icon?: LucideIcon
}
