import WorkspaceCard from '../shared/workspaceCard/WorkspaceCard'

const Workspace = ({
  onNotification,
}: {
  onNotification: (text: string | null) => void
}) => {
  const showNotification = (message: string) => {
    onNotification(message)

    setTimeout(() => {
      onNotification(null)
    }, 1800)
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <WorkspaceCard
        title="Left Click interaction"
        description="Point at the button and use an index pinch."
        action="left-click"
        onAction={() => showNotification('Left click detected')}
      />

      <WorkspaceCard
        title="Right Click interaction"
        description="Point at the button and use an rock gesture."
        action="right-click"
        onAction={() => showNotification('Right click detected')}
      />
    </div>
  )
}

export default Workspace
