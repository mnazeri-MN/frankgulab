"use client"

import { useState, useRef, useEffect } from "react"
import { useField } from "@payloadcms/ui"
import type { SelectFieldClientProps } from "payload"
import {
  Bot, BrainCircuit, Zap, Droplets, FlaskConical, Dna, Microscope, Atom,
  TestTube, Cpu, Network, TrendingUp, Magnet, Thermometer, Waves,
  CircuitBoard, Pill, HeartPulse, Syringe, Leaf, Database, Layers, Wrench, Globe,
  type LucideProps,
} from "lucide-react"

type IconComponent = React.ComponentType<LucideProps>

const ICON_OPTIONS: { value: string; label: string; Icon: IconComponent }[] = [
  { value: "Bot",          label: "Robot / Automation",        Icon: Bot },
  { value: "BrainCircuit", label: "Machine Learning / AI",     Icon: BrainCircuit },
  { value: "Zap",          label: "Electrochemistry / Energy", Icon: Zap },
  { value: "Droplets",     label: "Formulation / Fluids",      Icon: Droplets },
  { value: "FlaskConical", label: "Chemistry",                 Icon: FlaskConical },
  { value: "Dna",          label: "Biology / Genetics",        Icon: Dna },
  { value: "Microscope",   label: "Microscopy / Imaging",      Icon: Microscope },
  { value: "Atom",         label: "Physics / Materials",       Icon: Atom },
  { value: "TestTube",     label: "Experiments / Synthesis",   Icon: TestTube },
  { value: "Cpu",          label: "Computing / Hardware",      Icon: Cpu },
  { value: "Network",      label: "Networks / Systems",        Icon: Network },
  { value: "TrendingUp",   label: "Data Analysis",             Icon: TrendingUp },
  { value: "Magnet",       label: "Magnetism",                 Icon: Magnet },
  { value: "Thermometer",  label: "Thermal / Temperature",     Icon: Thermometer },
  { value: "Waves",        label: "Spectroscopy / Waves",      Icon: Waves },
  { value: "CircuitBoard", label: "Electronics",               Icon: CircuitBoard },
  { value: "Pill",         label: "Pharmaceuticals",           Icon: Pill },
  { value: "HeartPulse",   label: "Biomedical / Health",       Icon: HeartPulse },
  { value: "Syringe",      label: "Drug Delivery",             Icon: Syringe },
  { value: "Leaf",         label: "Sustainability / Environment", Icon: Leaf },
  { value: "Database",     label: "Data Management",           Icon: Database },
  { value: "Layers",       label: "Composites / Multilayer",   Icon: Layers },
  { value: "Wrench",       label: "Engineering",               Icon: Wrench },
  { value: "Globe",        label: "Global / Environmental",    Icon: Globe },
]

export function IconSelectField(props: SelectFieldClientProps) {
  const { value, setValue } = useField<string>({ path: props.path })
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selected = ICON_OPTIONS.find((o) => o.value === value)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="field-type select" ref={ref} style={{ position: "relative" }}>
      <label style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
        Icon
      </label>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "100%",
          padding: "8px 12px",
          border: "1px solid var(--theme-elevation-150)",
          borderRadius: 4,
          background: "var(--theme-input-bg)",
          color: "var(--theme-text)",
          fontSize: 13,
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        {selected ? (
          <>
            <selected.Icon size={16} />
            <span>{selected.label}</span>
          </>
        ) : (
          <span style={{ color: "var(--theme-elevation-500)" }}>Select an icon…</span>
        )}
        <span style={{ marginLeft: "auto", color: "var(--theme-elevation-400)", fontSize: 10 }}>▾</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            zIndex: 100,
            marginTop: 4,
            width: "100%",
            maxHeight: 320,
            overflowY: "auto",
            border: "1px solid var(--theme-elevation-150)",
            borderRadius: 4,
            background: "var(--theme-elevation-0)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          }}
        >
          {ICON_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { setValue(opt.value); setOpen(false) }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                padding: "9px 12px",
                border: "none",
                borderBottom: "1px solid var(--theme-elevation-100)",
                background: value === opt.value ? "var(--theme-elevation-50)" : "transparent",
                color: "var(--theme-text)",
                fontSize: 13,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <opt.Icon size={16} style={{ flexShrink: 0, color: value === opt.value ? "var(--theme-elevation-800)" : "var(--theme-elevation-500)" }} />
              <span>{opt.label}</span>
              {value === opt.value && (
                <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--theme-elevation-500)" }}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
