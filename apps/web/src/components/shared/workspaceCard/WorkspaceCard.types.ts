export type WorkspaceCardProps = {
  title: string
  description: string
  action: 'left-click' | 'right-click'
  onAction?: () => void
}
