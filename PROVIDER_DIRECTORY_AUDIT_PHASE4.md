# Provider directory audit — Phase 4

Snapshot: 25 November 2026. The directory currently contains 119 public rows with evidence links. It is explicitly unranked and does not claim that every row is a distinct Indian legal entity.

## Verification result

- 119 rows parsed from the public table.
- 128 unique provider URLs were checked with a read-only HEAD request; 98 returned a 2xx/3xx response in this environment and 30 were blocked, timed out, certificate-failed or otherwise not confirmed.
- LinkedIn pages commonly return 403 to automated checks; that is not treated as proof that the company page is invalid.
- Known manual-review examples include Netcore, Reverie, Verloop, Airtel Business, BIK and several LinkedIn pages. They remain evidence links, not verified recommendations.
- Fully verified provider profiles: 0. A profile becomes verified only after identity, official product scope, India availability, source date and relevant segment are individually checked by an editor.

## Quality rule

Do not expand toward 1,000 by generating thin pages or treating a brand, product and parent company as separate companies. Deduplicate parent entities, retain source dates, label vendor-reported claims and publish only profiles that pass the evidence checklist.
