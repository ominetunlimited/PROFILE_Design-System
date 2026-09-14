## PROFILE: FINAL DESIGN AUDIT, COMPLETION AND SYSTEM ALIGNMENT

Continue from the existing PROFILE Figma design. Do not redesign the product from scratch.

Audit the entire existing Figma file against the current PROFILE product vision and bring the design to a complete, implementation-ready state that can be merged cleanly with the Claude-built version of PROFILE.

### 1. Preserve and improve

* Keep the strongest existing visual decisions, layouts, branding and components.
* Remove outdated, duplicated, incomplete or inconsistent elements.
* Standardise spacing, typography, colours, icons, buttons, cards, forms, navigation and responsive behaviour.
* Use the approved PROFILE logo, colours and visual identity consistently.
* Do not introduce unnecessary features that are outside the PROFILE product vision.

### 2. Complete the full product structure

Design and connect every required screen, page, tab, modal, drawer, state and user flow, including:

* Hero / Welcome
* About
* Blog
* News
* Sign Up
* Sign In
* Email Verification
* Terms and Privacy
* Home / Activity Feed
* Search
* Notifications
* Messages
* Communities
* Learning
* Opportunities
* Career
* CV
* Portfolio
* Profile
* Edit Profile
* Verification
* Attribution
* Identity
* Skills
* Tools
* Experience
* Education
* Projects
* Publications
* Documents
* Marketplace
* Store Hub
* Create Store
* Store/Profile pages
* Organisation accounts
* Organisation admin
* Account switching
* Settings
* Help / Support
* Privacy and security
* Empty states
* Loading states
* Error states
* Success states
* Confirmation dialogs
* Permission states
* Mobile navigation
* Desktop navigation

### 3. Core PROFILE journey

Make the product architecture clearly reflect:

Activity → Verification → Attribution → Identity → CV / Portfolio → Opportunity

The interface must make this progression understandable without forcing the user through unnecessary steps.

### 4. Account creation

Design the complete account creation flow:

1. Legal name / Organisation name
2. Email
3. Password
4. Verify email with 6-digit code
5. Terms and Privacy acceptance
6. Username creation using @username format
7. Account setup
8. Profile completion

Support both:

* Individual accounts
* Organisation / company accounts

An organisation account must be able to be created from a personal account without requiring a previously verified individual account.

Include the complete organisation administration experience, including account switching and organisation management.

### 5. Profile architecture

The Profile page must clearly separate:

* Identity
* Verification
* Attribution
* Skills
* Tools
* Experience
* Education
* Projects
* Publications
* Portfolio
* CV
* Opportunities

A profile should function as a professional identity and portfolio, not simply as a social-media profile.

Make Portfolio and CV clearly distinct.

### 6. Activity / social layer

Complete the Activity system with:

* Create Activity
* Text
* Images
* Videos
* Documents
* Links
* Self-tagging
* Tagging people
* Tagging organisations
* Tagging skills
* Tagging tools
* Comment
* Share
* Reactions
* Follow
* Connect
* Save
* Report
* Delete
* Edit
* Visibility controls

The tagging and search system must recognise:

* Full names
* @usernames
* Organisations
* Institutions
* Skills
* Tools

Examples should work conceptually for names such as Chicago State, @chicago and recognised tools such as ChatGPT.

### 7. Opportunities

Complete the Opportunities and Career experience with:

* Opportunity discovery
* Search
* Filters
* Categories
* Opportunity details
* Application
* Saved opportunities
* Application status
* Recommended opportunities
* Employer / organisation information
* Profile-based matching

### 8. Marketplace

Complete the Marketplace architecture as:

Marketplace → Store Hub → Individual Store

Include:

* Browse
* Search
* Categories
* Store profiles
* Products/services
* Seller profile
* Create Store
* Edit Store
* Store management
* Product/service creation
* Product/service details
* Orders/inquiries where applicable

### 9. Navigation

Create a consistent navigation system for desktop, tablet and mobile.

Desktop should clearly support the main PROFILE areas without overcrowding the interface.

Mobile should use an appropriate bottom navigation / compact navigation system.

Every page must have an obvious way to:

* Go back
* Return home
* Move to the previous logical step
* Access the main navigation
* Exit a modal or workflow

No dead ends. No dead buttons. No screens that leave the user trapped.

### 10. Components and design system

Create or organise a reusable PROFILE design system containing:

* Colours
* Typography
* Spacing
* Grid
* Buttons
* Inputs
* Selects
* Checkboxes
* Radio buttons
* Tabs
* Navigation
* Cards
* Profile cards
* Opportunity cards
* Store cards
* Activity cards
* Modals
* Drawers
* Dropdowns
* Tooltips
* Badges
* Avatars
* Verification indicators
* Toasts
* Alerts
* Empty states
* Loading states
* Error states

Use reusable components and variants rather than separate manually designed copies.

### 11. Responsive design

Every major screen must have:

* Desktop version
* Tablet behaviour
* Mobile version

Ensure layouts adapt properly rather than simply shrinking desktop screens.

### 12. Implementation readiness

Organise the Figma file so a developer using Claude can understand it immediately.

Use:

* Clear page names
* Clear frame names
* Consistent component names
* Consistent layer names
* Reusable components
* Variants
* Auto Layout
* Variables where appropriate
* Design tokens
* Prototype connections
* Clear interaction states

Do not leave unexplained visual elements.

Every important button must have a defined destination or interaction.

Every important form must have its relevant states.

Every major workflow must be represented.

### 13. Claude compatibility

The final Figma structure must be implementation-friendly and easy to compare with the existing Claude-built PROFILE interface.

Where an existing Claude design and the Figma design represent the same feature, favour the strongest version and preserve functional consistency.

Do not create two competing versions of the same feature.

The final result should allow the Figma design to serve as the visual/design authority while Claude serves as the implementation layer.

### 14. Final audit

Before considering the design complete, perform a full product audit.

Check:

* Missing screens
* Missing pages
* Missing tabs
* Missing buttons
* Broken navigation
* Duplicate components
* Inconsistent spacing
* Inconsistent typography
* Inconsistent colours
* Missing mobile states
* Missing desktop states
* Missing empty states
* Missing loading states
* Missing error states
* Missing confirmation states
* Missing authentication states
* Missing account-switching states
* Missing organisation states
* Missing CV/Portfolio states
* Missing Marketplace states
* Missing Profile states
* Missing search states
* Missing notification states
* Missing messaging states

Fix everything found during the audit.

Do not stop at attractive screens.

The objective is a complete, coherent, connected and implementation-ready PROFILE product design that can be merged directly with the Claude-built version without unnecessary redesign or reconstruction.
