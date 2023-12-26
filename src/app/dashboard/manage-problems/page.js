'use client';

import React, { Suspense, useEffect, useState } from 'react';

import TopFiller from '@/components/TopFiller';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import FormTitle from '@/components/FormTitle';
import ProtectedRoute from '@/components/ProtectedRoute';
import { getOneQueryCollection, onGetCollection } from '@/services/firebase';
import ManageProblemsGrid from '@/components/ManageProblemsGrid';
import { BsFillFilterSquareFill } from "react-icons/bs";
import { MathJaxContext } from 'better-react-mathjax';
import FilterDialog from '@/components/FilterDialog';



function ManageProblems() 
{
    const [problems, setProblems] = useState([]);
    const [originalProblems, setOriginalProblems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [academicLevels, setAcademicLevels] = useState([]);
    
    const getProblems = async () =>
    {   
        const scholarKey = JSON.parse(localStorage.getItem('sessionData')).scholarKey;
        const problemsCollection = await getOneQueryCollection('problems', 'scholarKey', '==', scholarKey);
        const categoriesCollection = await getOneQueryCollection('categories', 'scholarKey', '==', scholarKey);
        const institutionsCollection = await getOneQueryCollection('institutions', 'scholarKey', '==', scholarKey);
        const instutionAcademicLevels = institutionsCollection[0].academicLevel;
     

        setAcademicLevels(instutionAcademicLevels);
        setCategories(categoriesCollection);
        setProblems(problemsCollection);
        setOriginalProblems(problemsCollection);
    }

    const handleFilterClick = () =>
    {
        const filterDialog = document.querySelector('#filter-dialog');
        filterDialog.showModal();
    }

    useEffect(() =>
    {
        getProblems();

        onGetCollection('problems', () =>
        {
            getProblems();
        })
    }, [])

    return (
        <div>
            <MathJaxContext>
                
                <FilterDialog originalProblems={originalProblems} setProblems={setProblems} setSubcategories={setSubcategories}
                              categories={categories} academicLevels={academicLevels} subcategories={subcategories}/>

                <Header/>
                <TopFiller/>
                <Navbar/>

                <div className="manage-problems">
                    <div className='manage-problems-content'>

                        <button className='manage-problems-filters-button' onClick={handleFilterClick}>
                            <BsFillFilterSquareFill/>
                        </button>
                        
                        <FormTitle title='Administrar problemas'/>
                        
                        {problems.length === 0 ? <div className='flex items-center justify-center text-2xl font-semibold text-red-500'>No se encontraron problemas</div> : <ManageProblemsGrid problems={problems}/>}
                   
                    </div>
                </div>
            </MathJaxContext>
        </div>
    )
}

export default ProtectedRoute(ManageProblems);