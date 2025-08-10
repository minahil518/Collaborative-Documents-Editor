export default function EditGuard({ locked, children }: { locked: boolean; children: React.ReactNode }) {
  const stopAll = (e: React.SyntheticEvent) => {
    if (!locked) return
    e.preventDefault()
    e.stopPropagation()
  }

  const onKeyDown: React.KeyboardEventHandler = (e) => {
    if (!locked) return
    const nav = ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End','PageUp','PageDown','Tab','Escape']
    const isNav = nav.includes(e.key)
    const isCopy = (e.metaKey || e.ctrlKey) && ['c','a'].includes(e.key.toLowerCase())
    if (isNav || isCopy) return
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div
      onBeforeInput={stopAll}
      onPaste={stopAll}
      onDrop={stopAll}
      onCut={stopAll}
      onKeyDown={onKeyDown}
    >
      {children}
    </div>
  )
}