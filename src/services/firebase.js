import {
    getApp,
    getApps,
    initializeApp
} from 'firebase/app';

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    updateDoc,
    where
} from 'firebase/firestore';


const firebaseConfig = {
    apiKey:
        process.env.NEXT_PUBLIC_FIREBASE_API_KEY,

    authDomain:
        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,

    projectId:
        process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,

    storageBucket:
        process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,

    messagingSenderId:
        process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,

    appId:
        process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};


/*
 * Avoid creating multiple Firebase application
 * instances during Next.js development and hot reload.
 */
const app =
    getApps().length > 0
        ? getApp()
        : initializeApp(firebaseConfig);


export const db =
    getFirestore(app);


/*
 * Convert Firestore QuerySnapshot documents
 * into plain JavaScript objects while preserving
 * their Firestore document identifiers.
 */
const mapDocuments = (snapshot) =>
{
    return snapshot.docs.map(
        (documentSnapshot) => ({
            ...documentSnapshot.data(),
            id: documentSnapshot.id
        })
    );
};

/*
 * Retrieve one document by Firestore document ID.
 *
 * Returns null when the document does not exist.
 */
export const getDocument =
    async (
        collectionName,
        documentId
    ) =>
{
    if(!documentId)
    {
        return null;
    }

    const documentReference =
        doc(
            db,
            collectionName,
            documentId
        );

    const documentSnapshot =
        await getDoc(
            documentReference
        );

    if(!documentSnapshot.exists())
    {
        return null;
    }

    return {
        ...documentSnapshot.data(),
        id: documentSnapshot.id
    };
};


/*
 * Retrieve documents using one Firestore condition.
 *
 * Example:
 *
 * getOneQueryCollection(
 *     'problems',
 *     'scholarKey',
 *     '==',
 *     'DEMO01'
 * );
 */
export const getOneQueryCollection =
    async (
        collectionName,
        field,
        operator,
        value
    ) =>
{
    const collectionReference =
        collection(
            db,
            collectionName
        );

    const firestoreQuery =
        query(
            collectionReference,
            where(
                field,
                operator,
                value
            )
        );

    const snapshot =
        await getDocs(
            firestoreQuery
        );

    return mapDocuments(snapshot);
};


/*
 * Retrieve documents using two Firestore conditions.
 *
 * The function signature is retained for
 * compatibility with the current Calcula UAT
 * web application.
 */
export const getTwoQueryCollection =
    async (
        collectionName,
        fields,
        operators,
        values
    ) =>
{
    if(
        !Array.isArray(fields) ||
        !Array.isArray(operators) ||
        !Array.isArray(values) ||
        fields.length !== 2 ||
        operators.length !== 2 ||
        values.length !== 2
    )
    {
        throw new Error(
            'getTwoQueryCollection requires two fields, two operators and two values.'
        );
    }

    const collectionReference =
        collection(
            db,
            collectionName
        );

    const firestoreQuery =
        query(
            collectionReference,

            where(
                fields[0],
                operators[0],
                values[0]
            ),

            where(
                fields[1],
                operators[1],
                values[1]
            )
        );

    const snapshot =
        await getDocs(
            firestoreQuery
        );

    return mapDocuments(snapshot);
};


/*
 * Create an institution record.
 *
 * NOTE:
 * Calcula UAT v2.0.0 currently uses a prototype
 * institutional credential mechanism. Passwords
 * stored through this function are not equivalent
 * to production-grade authentication.
 */
export const registerUser =
    async (
        email,
        institutionName,
        password,
        scholarKey,
        academicLevel
    ) =>
{
    const institutionData = {
        email,
        institutionName,
        password,
        scholarKey,
        academicLevel
    };

    return await addDoc(
        collection(
            db,
            'institutions'
        ),
        institutionData
    );
};


/*
 * Create a mathematical problem.
 */
export const createNewProblem =
    async (
        scholarKey,
        title,
        paragraph,
        category,
        subcategory,
        difficulty,
        academicLevel,
        answers,
        solution
    ) =>
{
    const problemData = {
        scholarKey,
        title,
        paragraph,
        category,
        subcategory,
        difficulty,
        academicLevel,
        answers,
        solution
    };

    return await addDoc(
        collection(
            db,
            'problems'
        ),
        problemData
    );
};


/*
 * Create a category.
 */
export const createNewCategory =
    async (
        name,
        subcategories,
        scholarKey
    ) =>
{
    const categoryData = {
        name,
        subcategories,
        scholarKey
    };

    return await addDoc(
        collection(
            db,
            'categories'
        ),
        categoryData
    );
};


/*
 * Update an existing Firestore document.
 */
export const updateDocument =
    async (
        collectionName,
        documentId,
        data
    ) =>
{
    if(!documentId)
    {
        throw new Error(
            'A Firestore document ID is required for update.'
        );
    }

    const documentReference =
        doc(
            db,
            collectionName,
            documentId
        );

    await updateDoc(
        documentReference,
        data
    );
};


/*
 * Delete an existing Firestore document.
 */
export const deleteDocument =
    async (
        collectionName,
        documentId
    ) =>
{
    if(!documentId)
    {
        throw new Error(
            'A Firestore document ID is required for deletion.'
        );
    }

    const documentReference =
        doc(
            db,
            collectionName,
            documentId
        );

    await deleteDoc(
        documentReference
    );
};
