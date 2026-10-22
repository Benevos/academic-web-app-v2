# Calcula UAT v2.0.0 Release Checklist

This checklist documents the verification steps required before publishing Calcula UAT v2.0.0 as the research software release associated with the SoftwareX manuscript.

Calcula UAT consists of two coordinated repositories:

- Web application: `academic-web-app-v2`
- Android mobile application: `academic-mobile-app`

## 1. Version consistency

### Web application

- [x] `package.json` version is `2.0.0`.
- [x] `package-lock.json` project version is `2.0.0`.
- [x] `CITATION.cff` reports software version `2.0.0`.
- [x] `CHANGELOG.md` contains the v2.0.0 release information.
- [x] README identifies the software as Calcula UAT v2.0.0.

### Mobile application

- [x] `pubspec.yaml` version is `2.0.0+1`.
- [x] `CITATION.cff` reports software version `2.0.0`.
- [x] `CHANGELOG.md` contains the v2.0.0 release information.
- [x] README identifies the software as Calcula UAT v2.0.0.

The Android build number `+1` is an internal mobile build identifier and does not change the public software release version, which is v2.0.0.

## 2. Licensing and citation

### Web

- [x] MIT `LICENSE` file included.
- [x] `CITATION.cff` included.
- [x] Repository authors aligned with the manuscript author list.

### Mobile

- [x] MIT `LICENSE` file included.
- [x] `CITATION.cff` included.
- [x] Repository authors aligned with the manuscript author list.

A DOI or SoftwareX article citation should not be added to `CITATION.cff` until a persistent identifier is actually available.

## 3. Firebase configuration

### Web

- [x] Firebase configuration removed from hard-coded source values.
- [x] Firebase configuration read from environment variables.
- [x] `.env.example` included.
- [x] `.env.local` is not committed to the repository.
- [x] Firebase setup documented in `docs/FIREBASE_SETUP.md`.

### Mobile

- [x] Android application identifier is `uat.uamm.calculauat`.
- [x] Firebase Android configuration is aligned with the Android application identifier.
- [x] Firebase setup documented in `docs/FIREBASE_SETUP.md`.
- [x] Firestore local persistence is explicitly enabled.
- [x] Unsupported platform directories were removed from the v2.0.0 research release.

## 4. Architecture and data model

### Web

- [x] Architecture documented in `docs/ARCHITECTURE.md`.
- [x] Firestore data model documented in `docs/DATA_MODEL.md`.
- [x] `solution` documented as a one-based answer index.
- [x] Example data included under `examples/`.
- [x] `attemps` spelling documented as an existing compatibility field.

### Mobile

- [x] Architecture documented in `docs/ARCHITECTURE.md`.
- [x] Offline behavior documented.
- [x] Response data fields documented.
- [x] One-based solution indexing documented.

## 5. Web automated validation

The Web CI workflow performs:

- [x] `npm ci`
- [x] `npm run lint`
- [x] `npm run build`

Latest validation status before release:

- [x] Web CI completed successfully.

Testing scope is documented in:

`docs/TESTING.md`

## 6. Mobile automated validation

The Mobile CI workflow performs:

- [x] `flutter pub get`
- [x] `flutter analyze`
- [x] `flutter build apk --debug`

Latest validation status before release:

- [x] Mobile CI completed successfully.

Testing scope is documented in:

`docs/TESTING.md`

## 7. Core web functionality

Before creating the v2.0.0 release, perform a final manual smoke test of the following workflows:

- [ ] Register an institution.
- [ ] Reject a duplicated institutional key.
- [ ] Log in with a valid institutional key and password.
- [ ] Reject an invalid password.
- [ ] Create a category.
- [ ] Create one or more subcategories.
- [ ] Create a mathematical problem.
- [ ] Verify four possible answers.
- [ ] Verify correct-answer indexing from `1` to `4`.
- [ ] Edit an existing problem.
- [ ] Rename a category and verify associated problems remain consistent.
- [ ] Prevent deletion of a subcategory that is still used by a problem.
- [ ] Filter problems.
- [ ] Filter the real `all`/General subcategory independently from the "show all" filter.
- [ ] Delete a problem and verify associated response records are removed.
- [ ] Delete a category and verify its problems and associated responses are removed.
- [ ] Open the statistics dashboard.
- [ ] Verify total valid responses.
- [ ] Verify average response time.
- [ ] Verify first-attempt versus multiple-attempt counts.
- [ ] Verify response-time intervals.
- [ ] Verify attempts-versus-time scatter plot.

## 8. Core mobile functionality

Before creating the v2.0.0 release, perform a final manual smoke test of the following workflows:

- [ ] Launch the application on Android.
- [ ] Register an institution while online.
- [ ] Log in successfully.
- [ ] Select an academic level.
- [ ] Select category and subcategory.
- [ ] Select difficulty.
- [ ] Load a mathematical problem.
- [ ] Submit an incorrect answer.
- [ ] Verify the attempt counter increases.
- [ ] Verify the timer continues after an incorrect answer.
- [ ] Submit the correct answer.
- [ ] Verify the timer stops.
- [ ] Verify `attemps` is recorded.
- [ ] Verify `elapsedTime` is recorded.
- [ ] Verify the next problem is loaded.
- [ ] Verify the attempt counter resets to `1`.
- [ ] Verify previously retrieved content behavior without connectivity.
- [ ] Verify an offline response can be queued locally.
- [ ] Restore connectivity and verify Firestore synchronization.

## 9. Known limitations to preserve in the release documentation

The v2.0.0 release must not claim that the following limitations have been solved:

- [x] Institutional authentication is a research-prototype mechanism.
- [x] Institutional passwords are not equivalent to production-grade authentication.
- [x] The mobile application targets Android.
- [x] Comprehensive automated unit, integration, widget, and end-to-end test coverage is not claimed.
- [x] Firestore offline persistence does not guarantee access to content that has never previously been retrieved.
- [x] The software should be described as offline-capable or tolerant of intermittent connectivity rather than guaranteeing unrestricted offline availability.

## 10. Release actions

Do not perform these steps until the manual smoke tests above have been completed.

### Web repository

- [ ] Confirm final Web CI status is green.
- [ ] Create Git tag `v2.0.0`.
- [ ] Create GitHub Release `v2.0.0`.

### Mobile repository

- [ ] Confirm final Mobile CI status is green.
- [ ] Create Git tag `v2.0.0`.
- [ ] Create GitHub Release `v2.0.0`.

## 11. Archival and persistent identifier

After both v2.0.0 releases are frozen:

- [ ] Archive the software release in a persistent research-software repository if applicable.
- [ ] Obtain the persistent DOI or archival identifier.
- [ ] Add the DOI to the manuscript software metadata.
- [ ] Update `CITATION.cff` only after the persistent identifier exists.
- [ ] Use immutable release URLs rather than development-branch URLs in the final manuscript.

## 12. Manuscript synchronization

After the software release is frozen:

- [ ] Verify all repository URLs in the manuscript.
- [ ] Replace development references with v2.0.0 release references where appropriate.
- [ ] Align the manuscript description of authentication with the prototype implementation.
- [ ] Align the manuscript description of offline operation with the implemented Firestore persistence behavior.
- [ ] Align analytics terminology with:
  - first attempt;
  - multiple attempts;
  - elapsed response time;
  - attempts-versus-time relationship.
- [ ] Verify the manuscript does not claim unsupported automated test coverage.
- [ ] Verify the manuscript does not claim functionality that is absent from v2.0.0.
