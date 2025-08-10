import React from "react";

type OfflineToggleProps = {
  isOffline: boolean;
  onToggle: (offline: boolean) => void;
  disabled?: boolean;
  className?: string;
};

export default function OfflineToggle({
  isOffline,
  onToggle,
  disabled = false,
  className,
}: OfflineToggleProps) {

  const toggle = () => !disabled && onToggle(!isOffline);
  const onKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (disabled) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onToggle(!isOffline);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOffline}
      aria-label={isOffline ? "Disable offline mode" : "Enable offline mode"}
      aria-disabled={disabled || undefined}
      onClick={toggle}
      onKeyDown={onKeyDown}
      className={`offline-toggle ${className ?? ""}`}
      data-state={isOffline ? "offline" : "online"}
      disabled={disabled}
    >
      <span className="ot-track" />      
      <span className="ot-thumb" aria-hidden="true" />
      <span className="ot-glow" aria-hidden="true" />
      <span className="ot-label">{isOffline ? "Offline" : "Online"}</span>
    </button>
  );
}
