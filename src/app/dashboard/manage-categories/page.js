'use client';

import React, { useEffect, useState } from 'react'

import TopFiller from '@/components/PageTop/TopFiller';
import Navbar from '@/components/PageTop/Navbar';
import Header from '@/components/PageTop/Header';
import FormTitle from '@/components/FormTitle';
import FormInput from '@/components/FormInput';

import { IoMdRemoveCircle, IoMdAddCircle } from "react-icons/io";
import FormSubmitButton from '@/components/FormSubmitButton';
import { createNewCategory, deleteDocument, getDocument, getOneQueryCollection, getTwoQueryCollection, onGetCollection, updateDocument } from '@/services/firebase';

import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import ProtectedRoute from '@/components/ProtectedRoute';

function ManageCategories() 
{
    const [formState, setFormState] = useState(true);

    const [categories, setCategories] = useState([])

    const [newCategory, setNewCategory] = useState({
        name: '',
        subcategories: ['all'],
        scholarKey: '',
    });

    const [newSubcategories, setNewSubcategories] = useState(['all']);

    const [updateDocumentId, setUpdateDocumentId] = useState(null);

    const getInitialData = async () =>
    {
        const scholarKey = JSON.parse(localStorage.getItem('sessionData')).scholarKey;
        const categoriesCollection = await getOneQueryCollection('categories', 'scholarKey', '==', scholarKey);

        setNewCategory({...newCategory, scholarKey: scholarKey});
        setCategories(categoriesCollection);
    }
    
    const handleAddSubcategoryClick = () =>
    {
        const currentSubcategories = [...newSubcategories];
        currentSubcategories.push('');
        setNewSubcategories(currentSubcategories);
    }

    const handleSubcategoryNameChange = ({ target: { value } }, index) =>
    {
        const currentSubcategories = [...newSubcategories];
        currentSubcategories[index] = value;
        setNewSubcategories(currentSubcategories);
    }

    const handleDeleteClick = () =>
    {
        if(newSubcategories.length <= 1) return;

        const currentSubcategories = [...newSubcategories];
        currentSubcategories.pop()
        setNewSubcategories(currentSubcategories);
    }

    const handleNameChange = ({ target: { name, value } }) =>
    {
        setNewCategory({...newCategory, [name]: value});
    }

    const handleSumbit = async (e) =>
    {
        e.preventDefault();

        if(newCategory.name.trim() === '')
        {
            alert('No vacios');
            return;
        }
        
        if(formState)
        {
            await createNewCategory(newCategory.name, newCategory.subcategories, newCategory.scholarKey);
            alert('Creado');
           
        }
        else
        {
            await updateDocument('categories', updateDocumentId, newCategory);
            setFormState(true);
        }
        
        const scholarKey = JSON.parse(localStorage.getItem('sessionData')).scholarKey;

        setNewCategory({name: '', subcategories: ['all'], scholarKey: scholarKey});
        setNewSubcategories(['all']);
        setUpdateDocumentId('');
    }

    const handleDelete = async (id) =>
    {
        const currentDocument = await getDocument('categories', id);

        const categoryDocuments = await getTwoQueryCollection('problems', ['category', 'scholarKey'], ['==', '=='], [currentDocument.name, currentDocument.scholarKey]);

        categoryDocuments.forEach(async (document) =>
        {
            await deleteDocument('problems', document.id);   
        })

        await deleteDocument('categories', id);
    }

    const handleUpdate = async (id) =>
    {
        setFormState(false);

        const categoryDoc = await getDocument('categories', id);

        setNewCategory(categoryDoc);
        setNewSubcategories(categoryDoc.subcategories);
        setUpdateDocumentId(id);
    }

    useEffect(() =>
    {
        setNewCategory({...newCategory, subcategories: newSubcategories});
    }, [newSubcategories])

    useEffect(() => 
    {
        getInitialData();

        onGetCollection('categories', () =>
        {
            getInitialData();
        })

    }, [])

    return (
        <div>
            <Header/>
            <TopFiller/>
            <Navbar/>
            
            <div className='min-h-[calc(100dvh_-_137px)] flex flex-col justify-center items-center gap-3 py-4'>
                
                <form onSubmit={handleSumbit}
                      className='w-[90%] p-[10px] flex flex-col items-center rounded-md bg-white'>
                    <FormTitle title={`${formState ? 'Crear' : 'Actualizar'} categoria`}/>

                    <label className='font-semibold mb-2'>Nombre:</label>
                    <FormInput name='name' value={newCategory.name} placeholder='Agregue un nombre...' width='80%' onChange={(e) => {handleNameChange(e)}}/>

                    <label className='mt-2 font-semibold'>Subcategorias:</label>

                    <div className='flex justify-center items-center gap-4 font-extrabold text-4xl mt-2'>
                        <button className='text-green-500 hover:brightness-125' type='button' onClick={handleAddSubcategoryClick}>
                            <IoMdAddCircle/>
                        </button>
                        <button className='text-red-600 hover:brightness-125' type='button'onClick={handleDeleteClick}>
                            <IoMdRemoveCircle/>
                        </button>
                    </div>
                    
                    <div className='w-full grid grid-cols-[auto_minmax(0,1fr)] gap-y-2 justify-around mt-2'>

                        {newSubcategories.map((subcategory, index) => 
                            <React.Fragment key={'subcategory'+index}>

                                {index === 0 ? <></> : <>
                                <label className='flex justify-center items-center px-3'>{index}:</label> 

                                <FormInput onChange={(e) => {handleSubcategoryNameChange(e ,index)}} name='subcategory' placeholder='Agruegue una subcategoria...' value={subcategory}/> </>}

                            </React.Fragment>
                        )}
                    </div>

                    <FormSubmitButton text={`${formState ? 'Crear' : 'Actualizar'} categoria`}/>
                </form>
                
                <section className='w-[90%] p-[10px] flex flex-col items-center rounded-md bg-white'>
                    <FormTitle title='Lista de categorias'/>

                    <div className='flex justify-center flex-wrap gap-4 w-full'>

                        {categories.map((category, index) =>
                            <div key={'cat-'+index}
                                 className='w-[30%] max-md:w-[45%] max-sm:w-[90%] border-[1px] border-solid border-[#CCCCCC] rounded'>
                                <div className='flex items-center justify-center h-[30px] max-h-[40px] bg-[#e2e2e2] overflow-x-auto relative'>
                                    <h3 className='whitespace-nowrap'>{category.name}</h3>

                                    <div className='absolute right-1'>
                                        <button onClick={() => handleUpdate(category.id)}
                                                className='text-[#4070B6] transition-all hover:text-[#ECB06F]'>
                                            <FaEdit/>
                                        </button>

                                        <button onClick={() => handleDelete(category.id)}
                                                className='text-red-600 transition-all hover:text-[#ffa8a8]'>
                                            <MdDeleteForever/>
                                        </button>
                                    </div>
                                </div>  

                                {category.subcategories.length <= 1 ? 

                                    <div className='h-[calc(100%-30px)] flex justify-center items-center text-[#6b6b6b]'>Sin subcategorias</div> 
                                    
                                    : 

                                    category.subcategories.map((subcategory, index) =>

                                        <div key={`sub-${category.name}-${index}`}
                                            className={`px-3 whitespace-nowrap overflow-x-auto ${index % 2 === 0 ? 'bg-[#F0F0F0]' : ''}`}>
                                            
                                            {subcategory === 'all' ? <></> : <label>{subcategory}</label>}

                                        </div>)
                                }
                                
                            </div>
                        )}
                    </div>
                </section>

            </div>
        </div>
    )
}

export default ProtectedRoute(ManageCategories);