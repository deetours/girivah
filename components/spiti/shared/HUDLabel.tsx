"use client"

interface HUDLabelProps {
  label: string
  value: string | number
  unit?: string
  color?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function HUDLabel({
  label,
  value,
  unit,
  color = "white",
  size = "md",
  className = "",
}: HUDLabelProps) {
  const sizeClasses = {
    sm: { label: "text-[8px]", value: "text-sm" },
    md: { label: "text-[9px]", value: "text-xl" },
    lg: { label: "text-[9px]", value: "text-3xl" },
  }

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <span
        className="font-mono tracking-[0.3em] uppercase text-white/40"
        style={{ fontSize: sizeClasses[size].label }}
      >
        {label}
      </span>
      <span
        className="font-display font-bold tabular-nums"
        style={{ color, fontSize: sizeClasses[size].value }}
      >
        {value}
        {unit && (
          <span className="text-[0.5em] tracking-[0.2em] ml-1 opacity-60">{unit}</span>
        )}
      </span>
    </div>
  )
}
