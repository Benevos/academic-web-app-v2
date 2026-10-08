# Calcula UAT Web Architecture

This document describes the software architecture and principal execution flows of the Calcula UAT web application v2.0.0.

Calcula UAT Web is the content-management and descriptive learning-analytics component of the Calcula UAT educational platform.

It is implemented with Next.js and React and communicates directly with Cloud Firestore through the Firebase JavaScript SDK.

---

## 1. Architectural overview

The Calcula UAT platform consists of two client applications connected to a shared Cloud Firestore data layer.

```text
          Calcula UAT Web
                 |
        creates and manages
         educational content
                 |
                 v
         Cloud Firestore
          ^             ^
          |             |
          |             | stores interaction
          |             | records
          |             |
          +------ Calcula UAT Mobile
                         |
                         |
                  presents exercises
                  to mobile users
```

The web application manages educational content and retrieves interaction records for descriptive analytics.

The Android application retrieves educational content and stores records generated during mathematical practice.

The current implementation does not require a dedicated custom REST API or a separate application server.

---

## 2. Main technologies

The web application uses:

- Next.js 14;
- React 18;
- JavaScript;
- Firebase JavaScript SDK;
- Cloud Firestore;
- Material UI;
- React Google Charts;
- MathJax-compatible rendering;
- Sass;
- Tailwind CSS.

---

## 3. Source-code organization

The principal application code is located under:

```text
src/
├── app/
├── components/
├── contexts/
├── scss/
└── services/
```

### `src/app/`

Contains the application routes implemented using the Next.js App Router.

The principal routes include:

```text
/
login/
register/
dashboard/
dashboard/create-problem/
dashboard/manage-categories/
dashboard/manage-problems/
dashboard/manage-problems/edit/
dashboard/stats/
privacy/
```

### `src/components/`

Contains reusable interface and navigation components.

Examples include:

```text
DashboardButtonGrid.jsx
Dialog.jsx
FilterDialog.jsx
FormInput.jsx
FormSubmitButton.jsx
FormTitle.jsx
Loading.jsx
ManageProblemsGrid.jsx
NoAuthUserRoute.jsx
Previsualization.jsx
ProtectedRoute.jsx
```

The `PageTop/` directory contains shared header and navigation components.

### `src/services/`

Contains the Firebase and Cloud Firestore access functions.

The principal service file is:

```text
src/services/firebase.js
```

### `src/scss/`

Contains the style definitions used by the application.

---

## 4. Firebase configuration

Firebase configuration is loaded through environment variables.

The repository provides the template:

```text
.env.example
```

Local deployments should create:

```text
.env.local
```

with the Firebase configuration associated with the intended deployment.

These values are consumed by:

```text
src/services/firebase.js
```

The web application and the Android application must use the same Cloud Firestore project when deployed as a single Calcula UAT installation.

---

## 5. Firestore access layer

The web client communicates directly with Cloud Firestore through Firebase SDK functions.

The service layer provides operations for:

- retrieving complete collections;
- retrieving documents using one or more query conditions;
- creating institutions;
- creating categories;
- creating mathematical problems;
- updating documents;
- deleting documents;
- retrieving individual documents.

The current architecture does not expose a custom server-side REST API for these operations.

---

## 6. Principal Firestore collections

Calcula UAT v2.0.0 uses four principal collections:

```text
institutions
categories
problems
responses
```

The complete schema is documented in:

```text
docs/DATA_MODEL.md
```

The institutional key (`scholarKey`) is used to associate content and interaction records with a particular institution.

---

## 7. Institutional access workflow

The current research prototype uses institutional access information stored in the `institutions` collection.

The login workflow is conceptually:

```text
User enters scholarKey and password
             |
             v
Web client queries institutions
             |
             v
Matching institution found?
       |              |
      yes             no
       |              |
       v              v
Store scholarKey    Reject access
in local session
       |
       v
Open dashboard
```

After successful login, only the institutional key is retained in the browser session data.

The password is not intentionally persisted in `localStorage`.

Protected routes validate that the stored `scholarKey` still corresponds to an institution in Firestore.

This mechanism is intended for controlled research deployments and should not be considered a production-grade identity-management architecture.

---

## 8. Category-management workflow

Institutional users can create categories and subcategories used to organize mathematical content.

The basic flow is:

```text
Institutional user
        |
        v
Manage categories
        |
        v
Create category
        |
        +---- category name
        |
        +---- subcategories
        |
        +---- scholarKey
        |
        v
Cloud Firestore
categories collection
```

Categories are isolated logically by `scholarKey`.

This allows participating institutions to organize mathematical content according to their own instructional structure.

---

## 9. Problem-authoring workflow

The web application allows institutional users to create multiple-choice mathematical exercises.

A problem may contain:

- title;
- problem statement;
- academic level;
- category;
- subcategory;
- difficulty;
- four answer alternatives;
- correct-answer identifier;
- institutional key.

The workflow is:

```text
Create problem
      |
      v
Select academic level
      |
      v
Select category / subcategory
      |
      v
Select difficulty
      |
      v
Enter statement and answers
      |
      v
Select correct answer
      |
      v
Store document in
`problems`
```

Mathematical expressions may be incorporated into problem content using the mathematical rendering components integrated into the application.

---

## 10. Problem-management workflow

Existing problems associated with the current institution can be:

- listed;
- filtered;
- inspected;
- edited;
- deleted.

Filtering can use educational attributes such as:

- academic level;
- category;
- subcategory;
- difficulty.

The web application retrieves only content associated with the current institutional context through `scholarKey`.

---

## 11. Relationship with the mobile application

Problems created through the web application are stored in the shared Firestore database.

The Android application subsequently retrieves problems according to:

```text
scholarKey
academicLevel
category
subcategory
difficulty
```

The mobile application presents those problems to users and records completed interactions.

For each completed problem, the mobile application writes a document to:

```text
responses
```

The web application later retrieves those records for descriptive analysis.

---

## 12. Learning-analytics workflow

The analytics interface operates on interaction records generated by the mobile application.

The workflow is:

```text
Institutional user
        |
        v
Select/filter problem
        |
        v
Retrieve matching responses
        |
        v
Calculate descriptive indicators
        |
        v
Display charts and summary values
```

The current implementation includes indicators such as:

- total number of recorded responses;
- average elapsed response time;
- number of problems solved on the first attempt;
- number of problems requiring multiple attempts;
- response-time intervals;
- relationship between number of attempts and elapsed response time.

The analytics layer is descriptive.

Calcula UAT v2.0.0 does not claim to provide:

- automated diagnosis;
- predictive modeling;
- machine-learning recommendations;
- adaptive sequencing.

---

## 13. Analytics interpretation

A document is written to the `responses` collection after the user reaches the correct answer.

Therefore, the distinction:

```text
First attempt
vs.
Multiple attempts
```

should not be interpreted as:

```text
Correct
vs.
Incorrect
```

All stored response documents represent completed problems.

The `attemps` field records how many attempts were required before the correct answer was reached.

---

## 14. Data flow

The complete software flow can be summarized as:

```text
Institutional user
       |
       v
Calcula UAT Web
       |
       | creates
       v
categories / problems
       |
       v
Cloud Firestore
       ^
       |
       | retrieves content
       |
Calcula UAT Mobile
       |
       | records attempts
       | and elapsed time
       v
responses
       |
       v
Cloud Firestore
       |
       | retrieves response records
       v
Calcula UAT Web
       |
       v
Descriptive analytics
```

---

## 15. Security boundaries

Calcula UAT v2.0.0 is a research software prototype.

Important limitations include:

- institutional credentials are managed using a prototype access mechanism;
- `scholarKey`-based browser session state is not equivalent to managed authentication;
- authorization is not yet based on Firebase Authentication identities;
- production deployment requires stronger Firestore access-control policies.

The current architecture should therefore be used in isolated or controlled research and demonstration environments.

Future versions should incorporate managed authentication and identity-based authorization.

---

## 16. Reproducibility

A developer reproducing the platform requires:

1. the Calcula UAT web repository;
2. the Calcula UAT mobile repository;
3. a Firebase project with Cloud Firestore;
4. compatible Firestore collections;
5. at least one test institution;
6. categories and mathematical problems for testing.

Firebase configuration instructions are provided in:

```text
docs/FIREBASE_SETUP.md
```

The Firestore schema is documented in:

```text
docs/DATA_MODEL.md
```

---

## 17. Related mobile architecture

The architecture of the Android application is documented in the companion repository:

```text
https://github.com/Benevos/academic-mobile-app/blob/master/docs/ARCHITECTURE.md
```

---

## 18. Version

This document describes:

```text
Calcula UAT Web v2.0.0
```
