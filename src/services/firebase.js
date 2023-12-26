// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDoc, getDocs, where, query, onSnapshot, deleteDoc, updateDoc, doc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt4uluKprciv23WqsW4JS8od2NO5BKlV8",
  authDomain: "academic-platform.firebaseapp.com",
  projectId: "academic-platform",
  storageBucket: "academic-platform.appspot.com",
  messagingSenderId: "787137987014",
  appId: "1:787137987014:web:d3d912b55102e9c89d32c7"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const db = getFirestore();

export async function getCollection(collectionName)
{  
    const collectionRef = await getDocs(collection(db, collectionName))
    const data = collectionRef.docs.map(doc => doc.data());

    return data;
}

export async function getSingleQueryCollection(collectionName, attribute, operator, value)
{
  const collectionRef = collection(db, collectionName);
  const querySnapshot =  query(collectionRef, where(attribute, operator, value));
  const docs = await getDocs(querySnapshot);

  const data = docs.docs.map(doc => 
    {
      const documentContent = doc.data();
      const documentId = doc.id;

      const newData = { id: documentId, ...documentContent };

      return newData;
    });

  return data;
}

export function onGetCollection(collectionName,callback)
{
  onSnapshot(collection(db, collectionName), callback);
}

export async function getDocument(collectionName ,id)
{
  const document = await getDoc(doc(db, collectionName, id));
  const data = document.data();

  return data;
}

export async function deleteDocument(collectionName, id)
{
  await deleteDoc(doc(db, collectionName, id))
}

export const updateDocument = async (collectionName, id, newFields) =>
{
  await updateDoc(doc(db, collectionName, id), newFields);
}

//! CUSTOM QUERIES

export async function registerUser(email, institutionName, password, scholarKey, academicLevel)
{
  await addDoc(collection(db, "institutions"), 
  {
    email: email, 
    institutionName: institutionName, 
    password: password,
    scholarKey: scholarKey,
    academicLevel: academicLevel
  });
}

export async function createNewProblem(scholarKey, title, paragraph, category, subcategory, difficulty, academicLevel, answers, solution)
{
  await addDoc(collection(db, "problems"), 
  {
    scholarKey: scholarKey,
    title: title,
    paragraph: paragraph,
    category: category,
    subcategory: subcategory,
    difficulty: difficulty,
    academicLevel: academicLevel,
    answers: answers,
    solution: solution
  })
}

export async function createNewCategory(name, subcategories, scholarKey)
{
  await addDoc(collection(db, 'categories'), 
  {
    name: name,
    subcategories: subcategories,
    scholarKey: scholarKey,
  })
}

export async function getOneQueryCollection(collectionName, attribute, operator, value)
{
  const collectionRef = collection(db, collectionName);
  const querySnapshot =  query(collectionRef, where(attribute, operator, value));
  const docs = await getDocs(querySnapshot);

  const data = docs.docs.map(doc => 
    {
      const documentContent = doc.data();
      const documentId = doc.id;

      const newData = { id: documentId, ...documentContent };

      return newData;
    });

  return data;
}

export async function getTwoQueryCollection(collectionName, attributes, operators, values)
{
  const collectionRef = collection(db, collectionName);
  const querySnapshot =  query(collectionRef, where(attributes[0], operators[0], values[0]), where(attributes[1], operators[1], values[1]));
  const docs = await getDocs(querySnapshot);

  const data = docs.docs.map(doc => 
    {
      const documentContent = doc.data();
      const documentId = doc.id;

      const newData = { id: documentId, ...documentContent };

      return newData;
    });

  return data;
}