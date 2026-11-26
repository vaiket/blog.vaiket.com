'use client'

import { useMemo, useState } from 'react'

export type ResearchToolKind = 'whatsapp-pricing' | 'ai-calling' | 'rcs-budget' | 'provider-compare' | 'sip-capacity' | 'automation-roi'

const inr = (value: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(Math.max(0, value))
const safe = (value: number) => Number.isFinite(value) && value > 0 ? value : 0

function Field({ label, value, onChange, min = 0, step = 1 }: { label: string; value: number; onChange: (value: number) => void; min?: number; step?: number }) {
  return <label className="research-tool-field">{label}<input type="number" min={min} step={step} value={value} onChange={event => onChange(safe(Number(event.target.value)))} /></label>
}

function Calculator({ kind }: { kind: Exclude<ResearchToolKind, 'provider-compare'> }) {
  const [volume, setVolume] = useState(kind === 'sip-capacity' ? 20 : 10000)
  const [unitCost, setUnitCost] = useState(kind === 'rcs-budget' ? 0.35 : kind === 'ai-calling' ? 1.8 : 0.85)
  const [fixed, setFixed] = useState(kind === 'automation-roi' ? 25000 : 10000)
  const [benefit, setBenefit] = useState(75000)
  const [minutes, setMinutes] = useState(4)
  const result = useMemo(() => {
    const v = safe(volume), unit = safe(unitCost), fixedCost = safe(fixed), b = safe(benefit), duration = safe(minutes)
    if (kind === 'sip-capacity') return { primary: v * duration, secondary: v * duration * 1.25, primaryLabel: 'Estimated active calls', secondaryLabel: 'With 25% headroom' }
    if (kind === 'automation-roi') return { primary: b - (v * unit + fixedCost), secondary: b > 0 ? ((b - (v * unit + fixedCost)) / b) * 100 : 0, primaryLabel: 'Illustrative monthly net value (₹)', secondaryLabel: 'Net value as % of benefit' }
    return { primary: v * unit + fixedCost, secondary: v > 0 ? (v * unit + fixedCost) / v : 0, primaryLabel: 'Illustrative monthly cost (₹)', secondaryLabel: 'Effective cost per unit (₹)' }
  }, [benefit, fixed, kind, minutes, unitCost, volume])
  const labels = kind === 'ai-calling' ? ['Connected minutes', 'Variable stack per minute (₹)', 'Platform, support and transfer fees (₹)'] : kind === 'rcs-budget' ? ['Billable messages or conversations', 'Illustrative rate per unit (₹)', 'Platform and campaign fees (₹)'] : kind === 'automation-roi' ? ['Automated transactions per month', 'Variable cost per transaction (₹)', 'Implementation and software (₹)'] : kind === 'sip-capacity' ? ['New connected calls per minute', 'Unused for capacity model', 'Average call duration (minutes)'] : ['Messages per month', 'Illustrative Meta/provider cost per message (₹)', 'Platform and seat fees (₹)']
  return <div className="research-tool-card"><div className="research-tool-fields"><Field label={labels[0]} value={volume} onChange={setVolume} /><Field label={labels[1]} value={unitCost} onChange={setUnitCost} min={0} step={0.05} /><Field label={labels[2]} value={kind === 'sip-capacity' ? minutes : fixed} onChange={kind === 'sip-capacity' ? setMinutes : setFixed} min={0} step={kind === 'sip-capacity' ? 0.5 : 500} />{kind === 'automation-roi' && <Field label="Monthly benefit or avoided cost (₹)" value={benefit} onChange={setBenefit} min={0} step={1000} />}</div><div className="research-tool-results"><span>{result.primaryLabel}<strong>{kind === 'sip-capacity' ? inr(result.primary) : `₹${inr(result.primary)}`}</strong></span><span>{result.secondaryLabel}<strong>{kind === 'sip-capacity' ? inr(result.secondary) : kind === 'automation-roi' ? `${inr(result.secondary)}%` : `₹${inr(result.secondary)}`}</strong></span></div><p className="research-tool-note">Editable assumptions only. Confirm current provider, Meta, carrier, tax, transfer and implementation terms before using this for a purchase or capacity decision.</p><p className="research-tool-source"><a href={kind === 'rcs-budget' ? 'https://developers.google.com/rcs/business-messaging' : kind === 'ai-calling' || kind === 'sip-capacity' ? 'https://exotel.com/' : kind === 'automation-roi' ? 'https://app.vaiket.com/docs' : 'https://developers.facebook.com/docs/whatsapp/pricing'} target="_blank" rel="noreferrer">Source assumptions</a> · Snapshot: 25 Nov 2026</p></div>
}

function ProviderCompare() {
  const [focus, setFocus] = useState('team')
  const rows = [{ name: 'Application platform', team: 'Shared inbox and campaign workflow', developer: 'Check API, webhooks and export', cost: 'Subscription plus message charges' }, { name: 'CPaaS/API platform', team: 'May need a separate operator UI', developer: 'Strong integration surface to verify', cost: 'Usage, support and integration' }, { name: 'Direct platform API', team: 'Build or integrate an inbox', developer: 'Maximum implementation control', cost: 'Engineering, hosting and Meta/carrier' }]
  return <div className="research-tool-card"><label className="research-tool-field">Buyer focus<select value={focus} onChange={event => setFocus(event.target.value)}><option value="team">Team operations</option><option value="developer">Developer control</option><option value="cost">Cost model</option></select></label><div className="research-tool-compare">{rows.map(row => <div key={row.name}><strong>{row.name}</strong><span>{row[focus as keyof typeof row]}</span></div>)}</div><p className="research-tool-note">This is a decision aid, not a provider ranking. Validate the selected vendor's current documentation and contract.</p><p className="research-tool-source"><a href="https://www.whatsapp.com/business/platform" target="_blank" rel="noreferrer">Official platform reference</a> · Snapshot: 25 Nov 2026</p></div>
}

export default function ResearchTools({ kind }: { kind: ResearchToolKind }) {
  const titles: Record<ResearchToolKind, string> = { 'whatsapp-pricing': 'WhatsApp workload calculator', 'ai-calling': 'AI calling cost calculator', 'rcs-budget': 'RCS messaging budget calculator', 'provider-compare': 'Provider comparison aid', 'sip-capacity': 'SIP capacity calculator', 'automation-roi': 'Automation ROI calculator' }
  return <section className="research-tool" aria-labelledby={`research-tool-${kind}`}><h3 id={`research-tool-${kind}`}>{titles[kind]}</h3><p>Use the controls to test your own assumptions. Values are not live Vaiket pricing, a carrier quote or a performance guarantee.</p>{kind === 'provider-compare' ? <ProviderCompare /> : <Calculator kind={kind} />}</section>
}
