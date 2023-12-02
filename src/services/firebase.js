// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDoc, getDocs, where, query, onSnapshot, deleteDoc, updateDoc, doc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5sflNAyug7Kuv9ytY0hPE6E4FA3Zo4lE",
  authDomain: "academic-web-a.firebaseapp.com",
  projectId: "academic-web-a",
  storageBucket: "academic-web-a.appspot.com",
  messagingSenderId: "512843967914",
  appId: "1:512843967914:web:5d0b60ea9852880d194fd3"
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

export async function createNewProblem(scholarKey, title, paragraph, category, answers, solution)
{
  await addDoc(collection(db, "problems"), 
  {
    scholarKey: scholarKey,
    title: title,
    paragraph: paragraph,
    category: category,
    answers: answers,
    solution: solution
  })
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