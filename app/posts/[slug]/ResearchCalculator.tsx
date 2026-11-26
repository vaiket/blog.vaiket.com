'use client'

import { useState } from 'react'

export default function ResearchCalculator() {
  const [minutes, setMinutes] = useState(50000)
  const [variable, setVariable] = useState(1.5)
  const [fixed, setFixed] = useState(25000)
  const [arrivalRate, setArrivalRate] = useState(20)
  const [duration, setDuration] = useState(4)
  const total = Math.max(0, minutes) * Math.max(0, variable) + Math.max(0, fixed)
  const format = (value: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(value)
  return <section className="research-calculator" aria-labelledby="cost-calculator-title"><h4 id="cost-calculator-title">Illustrative cost and capacity calculator</h4><p>Uses the article’s example: ₹1.50 variable cost per connected minute and ₹25,000 monthly fixed expense. These are assumptions, not Vaiket pricing or measured capacity.</p><div className="calculator-fields"><label>Connected minutes per month<input type="number" min="1" value={minutes} onChange={e => setMinutes(Number(e.target.value))} /></label><label>Variable cost per minute (₹)<input type="number" min="0" step="0.05" value={variable} onChange={e => setVariable(Number(e.target.value))} /></label><label>Fixed monthly expense (₹)<input type="number" min="0" step="500" value={fixed} onChange={e => setFixed(Number(e.target.value))} /></label><label>New connected calls per minute<input type="number" min="0" value={arrivalRate} onChange={e => setArrivalRate(Number(e.target.value))} /></label><label>Average duration (minutes)<input type="number" min="0" value={duration} onChange={e => setDuration(Number(e.target.value))} /></label></div><div className="calculator-result"><span>Estimated monthly expense <strong>₹{format(total)}</strong></span><span>Cost per connected minute <strong>₹{minutes > 0 ? format(total / minutes) : '—'}</strong></span><span>Average active calls <strong>{format(Math.max(0, arrivalRate) * Math.max(0, duration))}</strong></span></div><p>Average active calls use the simplified steady-state relationship in section 56. Bursts, transfers, and provider limits require separate capacity planning.</p></section>
}
