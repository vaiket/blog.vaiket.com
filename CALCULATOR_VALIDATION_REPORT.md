# Interactive calculator validation

Snapshot: 25 November 2026. The calculators are decision aids, not live quotes.

| Tool | Formula | Boundary checks |
|---|---|---|
| WhatsApp workload | `volume × unitCost + fixed` and effective unit cost | Empty, negative and non-finite inputs clamp to zero. |
| AI calling | `connected minutes × variable cost + fixed` | Same non-negative input handling; excludes carrier, transfer, tax and human review unless entered. |
| RCS budget | `billable units × illustrative rate + fixed` | Same non-negative input handling; rate must be replaced with a current quote. |
| SIP capacity | `calls per minute × average duration`, then 25% headroom | Zero duration/volume is valid; headroom is an explicit modelling assumption. |
| Automation ROI | `benefit − (transactions × variable cost + fixed)` and percentage of benefit | Zero benefit returns 0%; negative/blank values cannot create a false positive. |
| Provider comparison | qualitative rows by buyer focus | Explicitly not a ranking; user must verify current vendor terms. |

Source links and snapshot dates now appear inside each tool. Current Meta, Google RCS, Exotel and Vaiket documentation must be checked before purchase or capacity decisions.
