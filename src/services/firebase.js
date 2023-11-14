// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDoc, getDocs, where, query, onSnapshot, deleteDoc, updateDoc, doc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9njL5lHQErbvpsd8jsIM-A2paX0Nn2Rk",
  authDomain: "fmvz-store.firebaseapp.com",
  projectId: "fmvz-store",
  storageBucket: "fmvz-store.appspot.com",
  messagingSenderId: "903553352633",
  appId: "1:903553352633:web:ec845045b74df1996b6c68"
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

export async function registerUser(email, institutionName, password, scholarKey)
{
  await addDoc(collection(db, "institutions"), 
  {
    email: email, 
    institutionName: institutionName, 
    password: password,
    scholarKey: scholarKey
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