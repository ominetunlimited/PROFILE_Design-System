You are continuing work on an existing Figma design system for **PROFILE** — a Professional
Identity Operating System, not a social network, resume site, or job board. Before adding or
changing anything, first understand what already exists in this file. This is a continuation
task, not a restart: preserve every screen, component, and style that is already built and
usable. Only add what is missing, and only improve what is inconsistent with the system
defined below.

---

## PHASE 1 — AUDIT (do this first, before designing anything)

Go through every page, frame, and component currently in this file and produce a short audit
list with three columns: **Built / Partially Built / Missing**, checked against the complete
inventory in "REQUIRED SURFACES" below. For anything marked Partially Built, note specifically
what's missing (e.g. "Sign In screen exists but has no error/loading state," "Trust Score ring
exists as a static image, not a component with states"). Do not silently skip this step — post
the audit list before starting Phase 2, so gaps are visible before work begins.

---

## PHASE 2 — DESIGN SYSTEM (apply consistently to everything, existing and new)

### Colour tokens

```
Royal Blue   #0057D9   — primary actions, links, active nav, main CTAs (~30% of any screen)
Deep Blue    #003A8C   — headers, hero gradients, enterprise surfaces (~15%)
Trust Cyan   #00E5FF   — Trust Score, verification, Trust Center accents ONLY (~7%)
Gold         #F4B400   — premium/awards/featured/Master-tier badges ONLY (~3% max)
Warm Coral   #FF6F59   — first-login greeting, milestone/celebration moments ONLY (<1%, rarest color in the system — never for trust, verification, or routine actions)
White        #FFFFFF
Graphite     #1E293B   — primary text/icons/borders
Near-black   #0A0E1A   — high-contrast mode only, not pure black
Success      #00C853
Warning      #F59E0B   — distinct from Gold, never double-duty
Danger       #DC2626
Info         #0EA5E9
```

Gradients: primary = 135deg Royal Blue → Deep Blue. Trust = 135deg Deep Blue → Trust Cyan.

**Dark mode** (four-step surface system, not flat two-tone):
`bg #060E1C · surface-0 #0C1829 (base cards) · surface-1 #0F1F35 (elevated/modals) · surface-2 #142440 (highest elevation)`
Borders: `rgba(255,255,255,.07)` default, `.12` strong. Text: `.90 / .65 / .40 / .18` for primary/secondary/tertiary/disabled.

**Light mode:** bg `#F8FAFC` · cards `#FFFFFF` · border `#E5E7EB` · corner gradient `135deg rgba(0,58,140,.08)→transparent`.

Every screen must work correctly in both modes — build with mode-swap in mind from the start, not as an afterthought.

### Typography

- **Inter** — primary UI font, all body/headline text
- **IBM Plex Sans** — technical/data-dense UI (schemas, verification identifiers, tables)
- **JetBrains Mono** — Trust IDs, verification hashes, copyright codes, code samples

Use a fluid type scale (clamp-based): xs→hero, roughly 12px up to 72px at the hero headline, scaling smoothly across breakpoints rather than jumping at fixed widths.

### Spacing & geometry

4px base grid. Radius: cards 12px · inputs 8px · badges 20px (pill) · buttons 8px · modals 16px · avatars fully round. Respect a clear elevation order: background → base → card → sticky → drawer → modal → toast → tooltip, each with appropriately increasing shadow/z-index.

### Logo — PLACEHOLDER REQUIRED

Do not invent or generate a logo. Insert a clean, neutral **placeholder component** everywhere
the logo appears (auth screens, hero, nav bar, loading states), sized and positioned correctly
per the rules below, clearly labeled "PROFILE LOGO — PLACEHOLDER" so it's obviously swappable
later:

- Minimum size: 24px height in icon contexts, 32px in navigation/headers
- Full-size, centered placement on auth/hero screens; small corner mark on every other page
- Provide the placeholder in three states as separate variants: full-colour, monochrome-white
  (for dark surfaces), monochrome-graphite (for light, low-emphasis contexts)
- Clear space: reserve at least 0.25× the logo's height on all sides — don't let other elements
  crowd it even as a placeholder

### Iconography

One consistent icon set throughout (Lucide-style line icons) — never mix icon families. Standard sizing and stroke width across all instances.

### Motion (apply as component states/prototyping, not just static frames)

- Standard transitions: fade-up on scroll-reveal, staggered children (~0.1s stagger), card hover (scale 1.01 + soft shadow lift), modal open/close (scale 0.95→1 + fade, 200ms/150ms)
- Loading state: skeleton shimmer placeholders — **never a raw spinner** anywhere in the product
- The Trust Score ring specifically: animates via stroke-dashoffset; on a first-ever view it animates from 0, on every return visit it animates from the person's last-seen score (so growth is visually felt) — build this as two distinct prototype states, not one
- Verified badges: a subtle, slow, repeating pulse (2s ease-in-out) — confident, never flashy
- Respect `prefers-reduced-motion` — every animated component needs a reduced-motion variant

### Interactive states — every interactive element needs ALL of these as documented variants

- **Buttons:** default, hover, focus, pressed, loading, success, error, disabled
- **Tabs:** default, hover, active, selected, disabled
- **Inputs:** default, focus, valid, invalid, filled, disabled
- **Cards:** default, hover (elevation + 1.01 scale)
- **Icons:** default, hover, focus, touch

### Accessibility (non-negotiable, build it in, don't retrofit)

WCAG 2.2 AA minimum: visible focus states (not just default `:focus`), 4.5:1 text contrast minimum, full keyboard-navigable component structure, adequate touch targets on mobile, and every icon/badge needs an accessible label noted in the component description.

---

## PHASE 3 — REQUIRED SURFACES (the full inventory — audit against this, then build what's missing)

### A. Public / Pre-auth
- Hero/landing screen — centered logo placeholder, headline, mission line, three CTAs (Create PROFILE / Sign In / Explore PROFILE), subtle low-opacity animated background icon field (never floating cards, never readable text in the background)
- Explore PROFILE hub — About, Vision, Mission, Trust Principles, How Verification Works, Security, FAQ, Developers/API, Investors
- Global footer (consistent across every public page)

### B. Authentication
- Sign In — unified smart input (email/@username/phone auto-detect), password field with strength meter, social auth buttons, remember-me, forgot-password link
- Sign Up (routes into onboarding)
- Password recovery flow (email link, phone OTP, trusted-device confirmation steps)

### C. Onboarding (5 steps + 1 conditional sub-step)
1. Account type (Individual: Professional/Competence/Hybrid, or Organisation) + Career Stage picker
2. Account info + email verification (6-digit code screen)
3. Consent (two grouped agreement checkboxes)
4. "What brings you to PROFILE" (multi-select goal chips)
5. Profile setup (photo, cover photo, username with live availability check, headline) + AI/manual/hybrid generation choice
6. Conditional Journey Setup — academic stage picker OR independent-craft stage picker, branching by account type
- Post-registration progress tracker (persistent, dismissible checklist widget)

### D. Core Navigation Shell
- Mobile bottom nav (5 destinations: Home, Connections, **Create Activity** as an emphasized center button, Opportunity, CV/Portfolio)
- Top app bar (avatar → Profile Drawer, centered universal search, notification bell, message icon, hamburger → full ecosystem menu)
- Desktop three-column layout (left sidebar nav, center feed/content, right sidebar: Trust Score, suggested connections, recommended opportunities)
- Profile Drawer (short: My Profile, Edit Profile, My CV, My Portfolio, Switch Workspace, Sign Out)
- Hamburger/ecosystem menu (full secondary module list)

### E. Home & Activity
- Home feed with **Daily Return Engine** widget at the top (greeting + 2–4 ranked recommendation cards with estimated impact)
- Activity card component (avatar, verified badge, pathway badge, activity-type badge, Trust Score ring, title/description, skill/tool tags, media thumbnail with copyright ID, six professional reactions, comment section, self-tag button)
- Record Activity / Post Composer (type picker, required/optional fields, media upload with progress, CV/Portfolio include toggles, visibility selector)

### F. Trust Center (flagship system)
- Trust Center home (module grid: Identity, Academic, Employment, Professional Licence, Trade/Competence, Certification, Custom)
- Verification submission flow (identifier fields, document upload, live status timeline: Submitted → Received → Institution Notified → Under Review → Approved → Verified/Rejected/Appeal)
- Credential Vault (list of stored, verified credentials with QR/verification links)
- Trust Passport (shareable, per-link visibility presets)
- Trust Score detail view (dimension breakdown, tier ring, "why this changed" transparency log)
- Badge gallery

### G. Security & Trust Center (§37.26 — distinct from Trust Center above)
- Security overview/dashboard
- Active sessions & devices list (with per-session revoke)
- Security Timeline (chronological account-security history)
- Recovery Center (recovery method management, incl. trusted-contact setup)
- Connected Applications console (OAuth/API grants, revoke/view-scope)
- Privacy controls (granular per-field visibility)
- Data export & account deletion flow (consequences screen → confirmation → recovery-window state)
- Security Education Center (short topic cards)

### H. CV / Portfolio / Career Engine
- CV builder (template gallery of 10, section toggles, live preview, drag-reorder)
- Portfolio builder (project gallery, item detail with evidence/skills/tools/attribution)
- Cover Letter generator (tone selector, linked-opportunity context)
- Creator Hub view (for creative/technical professionals — featured items, commerce listings)

### I. Discovery & Opportunity
- Universal/global search results (people, orgs, jobs, skills, credentials — trust-ranked, never popularity-ranked)
- Opportunity Hub (job/contract/scholarship/fellowship listings, filters incl. career-stage clusters)
- Student Opportunity Hub & Graduate Launchpad (sub-routed views)
- One-tap "Apply with PROFILE" flow
- Application tracking Kanban (Applied → Shortlisted → Interview → Offer → Hired)
- Direct Connect (freelancer-initiated business pitch flow)

### J. Marketplace & Commerce
- Marketplace storefront (My Store toggle state)
- Service/product listing detail
- Escrow/checkout flow
- **Orders & Billing** page (order history, downloadable invoices, saved payment methods, subscription/plan management with renewal date + cancel flow)
- Ads/promotion campaign builder

### K. Messaging
- Conversation list (tabbed: All/Unread/Recruiters/Institutions/etc.)
- Thread view supporting text, files, proposals, contracts, schedule cards, work-submission cards

### L. References (§40.5)
- Request-a-reference flow (choose referee, relationship, linked evidence, purpose)
- Referee dashboard (pending/completed/declined, template picker)
- Recommendation letter viewer (formatted, verification badge, QR, delivery-destination picker)

### M. Learning & Community
- PROFILE Academy course catalog + course detail
- Communities/Groups directory + group detail
- Collab Hub (project rooms, task board, contributor tracking)

### N. Analytics
- Individual analytics dashboard (opportunity conversion headline metric + supporting charts)
- Organisation analytics dashboard

### O. Profile Pages
- Public individual profile (header, Trust Score ring, badges row, stats, activity/portfolio/skills/tools/reviews sections)
- Public organisation profile (logo, verified badge, staff, programmes, partners)

### P. Settings
- Tabbed settings shell: Profile, Privacy & Visibility, Notifications, CV & Export, Security, Language & Region, Premium Plans (incl. Orders & Billing entry), and — for organisations — Team (roles/permissions) and Billing

### Q. Organisation / Institution / Recruiter Surfaces
- Organisation dashboard, routed by hub type (Institutional / Business / Regulatory / Community hub — each with a different module emphasis, not one generic dashboard)
- Institution Hub (schema builder, bulk credential ingestion, verification review console with Approve/Reject/Escalate actions)
- Recruiter/Hiring Dashboard (candidate pipeline Kanban, trust-filtered search, side-by-side compare)
- Institution Excellence Dashboard (aggregate alumni outcomes, embeddable widget preview)

### R. Admin
- Admin Centre (moderation queue, fraud/risk & integrity module, verification queue oversight, audit log viewer)
- **PROFILE Mission Control** — owner-facing dashboard: Daily Briefing card (greeting, key metrics, notable signals, ranked recommendations with estimated impact), Intelligence domain summary tiles (Growth, Trust, Security, Business, Infrastructure, etc.), and a "Today's Priorities" ranked decision list (target: single digits, never a raw alert feed)

### S. Persistent / Cross-cutting Components
- **PROFILE Copilot** panel — a persistent, dockable AI panel present platform-wide, context-aware header showing what it currently understands (page/goal/trust level), suggestion cards, clear "AI-assisted" labeling on any generated content
- Empty states for every list/feed surface (illustration + explanation + clear CTA — never a blank screen)
- Toast/notification component
- Skeleton loading states for every major content type (card, list, profile header, chart)
- Offline/error/reconnecting states

---

## PHASE 4 — BEAUTIFICATION & UPGRADE PASS

Once every required surface from Phase 3 exists, do a second pass across the **entire** file:

1. **Consistency sweep** — every button, card, badge, and input should trace back to one shared component, not a one-off copy. Flag and merge any duplicate/near-duplicate components you find.
2. **Hierarchy & whitespace** — check that primary actions are visually dominant, secondary actions recede, and no screen feels cramped or unbalanced; increase breathing room where density is fighting the fluid type scale above.
3. **Colour discipline** — audit every screen against the usage percentages in Phase 2. Flag any screen where Trust Cyan, Gold, or Warm Coral is used more than its stated ceiling, or used for something outside its defined meaning (e.g. Gold appearing on something that isn't Master-tier/premium).
4. **Micro-interactions** — add the hover/pressed/focus states from Phase 2 to any component still shown as a single static frame.
5. **Empty/loading/error completeness** — every data-driven screen needs all three states designed, not just the "happy path" with data.
6. **Responsive check** — verify every screen has a defined behaviour at mobile (320–767px), tablet (768–1023px), and desktop (1440px+), not just one fixed frame size.
7. **Dark/light parity** — every finished screen needs both mode variants; flag anything still light-mode-only.

---

## DELIVERABLE

End with an updated audit summary in the same Built/Partially Built/Missing format as Phase 1,
now showing everything as Built, plus a short changelog of what was added or upgraded in this
pass. Do not remove or restructure anything from the original file beyond what's explicitly
called for above — this is an extension and completion pass, not a redesign.