# Changelog

All notable changes to the Calcula UAT web application are documented in this file.

## [2.0.0] - 2026

### Overview

Calcula UAT Web v2.0.0 is the research-software release prepared for reproducible educational experimentation and scientific dissemination.

The application is implemented with Next.js and React and communicates directly with Cloud Firestore through the Firebase JavaScript SDK.

### Added

- Detailed project README.
- Firebase setup documentation.
- Firestore data-model documentation.
- Web architecture documentation.
- MIT software license.
- Software citation metadata through `CITATION.cff`.
- Firebase configuration template through `.env.example`.
- Functional landing page describing the current Calcula UAT capabilities.
- Software-specific privacy notice aligned with the current data model.

### Changed

- Updated the project version to `2.0.0`.
- Externalized Firebase web configuration through environment variables.
- Improved session handling so browser storage retains only the institutional key after successful access.
- Improved validation of protected and unauthenticated routes.
- Updated the analytics interface terminology to distinguish:

```text
First attempt
```

from:

```text
Multiple attempts
```

rather than incorrectly describing stored completed interactions as correct versus incorrect.

- Corrected labels for the relationship between attempts and elapsed response time.
- Corrected response-time intervals so boundary values at 60 and 180 seconds are included.
- Replaced the unfinished home page with a Calcula UAT-specific landing page.
- Simplified the navigation and footer to expose only functional software routes and relevant repository information.
- Replaced the generic institutional privacy text with a description aligned with the information actually processed by Calcula UAT.

### Removed

- Unfinished student-management routes.
- Unfinished user-account route.
- Development-only test route.
- Development-only data-deletion placeholder route.
- Unused `NoSSR` component.
- Unused Firebase Authentication context.
- Unused Firebase Authentication initialization.
- Unused Firestore helper function.
- Placeholder navigation links.
- Placeholder telephone and social-media footer content.

### Security and session handling

Calcula UAT Web v2.0.0 no longer intentionally stores the institutional password in browser `localStorage`.

After successful access validation, the browser session stores the institutional key used by the current research prototype.

This mechanism is still not equivalent to managed identity authentication and should be replaced before production-scale deployment.

### Analytics interpretation

Documents in the `responses` collection represent problems that were ultimately completed correctly.

Therefore, the current analytics interface distinguishes between:

```text
First attempt
```

and:

```text
Multiple attempts
```

rather than between correct and incorrect completed responses.

### Data compatibility

The interaction field:

```text
attemps
```

is retained in version 2.0.0 for compatibility with the current mobile client and existing Firestore data.

### Known limitations

Calcula UAT Web v2.0.0 is a research software prototype.

The current institutional access mechanism is intended for controlled research and demonstration environments.

Production deployment requires managed authentication, identity-based authorization, appropriate Firestore security rules, broader accessibility evaluation, and deployment hardening.
