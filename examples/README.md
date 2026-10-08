# Calcula UAT Demo Data

This directory contains example data for reproducing a minimal Calcula UAT installation.

The file:

```text
demo-data.json
```

documents example records compatible with the principal Cloud Firestore collections used by Calcula UAT v2.0.0:

```text
institutions
categories
problems
responses
```

## Purpose

The example data are intended for:

- software reproduction;
- development;
- demonstration;
- reviewer inspection;
- isolated testing.

They do not correspond to participants from the original pilot study.

No real personal or institutional information is included.

## Recommended workflow

Create a separate Firebase project for testing.

Then populate the following collections:

```text
institutions
categories
problems
```

using the corresponding example objects in `demo-data.json`.

The `responses` example requires an additional step because:

```text
problemId
```

must contain the actual Firestore document ID of a document created in the `problems` collection.

Therefore:

1. create the example institution;
2. create the example category;
3. create one or more example problems;
4. copy the Firestore document ID of a problem;
5. use that identifier as the `problemId` value in a response document.

## Correct-answer encoding

The `solution` field uses the following convention:

```text
1 = A
2 = B
3 = C
4 = D
```

For example:

```json
{
  "answers": [
    "40",
    "41",
    "42",
    "43"
  ],
  "solution": "3"
}
```

means that answer C (`42`) is the correct answer.

## Prototype credentials

The example institution contains:

```text
scholarKey: DEMO01
password: demo-password
```

These values are intended only for an isolated demonstration environment.

Do not reuse them in a production or public deployment.

## Data schema

For complete field definitions, see:

```text
docs/DATA_MODEL.md
```

## Version

The example data correspond to:

```text
Calcula UAT v2.0.0
```
