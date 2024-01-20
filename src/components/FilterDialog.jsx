import React, { useEffect, useState } from 'react'
import FormTitle from './FormTitle'
import { getOneQueryCollection } from '@/services/firebase';

function FilterDialog({originalProblems, setProblems }) 
{
    const [subcategories, setSubcategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [academicLevels, setAcademicLevels] = useState([]);

    const [filters, setFilters] = useState({
        category: 'all',
        subcategory: 'all',
        difficulty: 'all',
        academicLevel: 'all'
    })

    const handleChange = ({ target: { name, value } }) =>
    {
      setFilters({...filters, [name]: value});
    }
    
    const handleApplyClick = () =>
    {
        const filterDialog = document.querySelector('#filter-dialog');
        
        let filteredProblems = [...originalProblems];

        if(filters.category !== 'all')
        {
            filteredProblems = filteredProblems.filter((problem) => problem.category === filters.category);

            if(filters.subcategory !== 'all')
            {
                filteredProblems = filteredProblems.filter((problem) => problem.subcategory === filters.subcategory);
            }
        }

        if(filters.difficulty !== 'all')
        {
            filteredProblems = filteredProblems.filter((problem) => problem.difficulty === filters.difficulty);
        }

        if(filters.academicLevel !== 'all')
        {
            filteredProblems = filteredProblems.filter((problem) => problem.academicLevel === filters.academicLevel);
        }

        setProblems(filteredProblems);

        filterDialog.close();
    }

    const getInitialData = async () =>
    {
        const scholarKey = JSON.parse(localStorage.getItem('sessionData')).scholarKey;
        
        const categoriesCollection = await getOneQueryCollection('categories', 'scholarKey', '==', scholarKey);
        const institutionsCollection = await getOneQueryCollection('institutions', 'scholarKey', '==', scholarKey);
        const instutionAcademicLevels = institutionsCollection[0].academicLevel;

        setAcademicLevels(instutionAcademicLevels);
        setCategories(categoriesCollection);
    }

    useEffect(() =>
    {
        setFilters({...filters, subcategory: 'all'})

        if(filters.category.trim() === '') return;
        if(filters.category === 'all')
        {
            setSubcategories([])
            return;
        }
        const currentCategoryDoc = categories.filter(category => category.name === filters.category)[0];
        setSubcategories(currentCategoryDoc.subcategories);

    }, [filters.category])

    useEffect(() =>
    {
        getInitialData();
    }, [])



    return (
        <dialog id='filter-dialog' className='manage-problems-filter-dialog'>
            <div className='flex items-center justify-center'>
                <div className='manage-problems-filter-dialog-content'>
                    <FormTitle title='Filtros'/>
                    
                    <h3>Categoria</h3>

                    <select className='manage-problems-select' name='category' defaultValue={'all'} onChange={handleChange}>
                        <option value={'all'}>(Todo)</option>
                        {categories.map((category, index) => <option value={category.name} key={'cat'+index}>{category.name}</option>)}
                    </select>

                    <h3>Subcategoria</h3>

                    <select className='manage-problems-select' name='subcategory' defaultValue={'all'} onChange={handleChange}>
                        <option value={'all'}>(Todo)</option>
                        {subcategories.map((subcategory, index) => <option value={subcategory} key={'subcat'+index}>{subcategory === 'all' ? 'General' : subcategory}</option>)}
                    </select>

                    <h3>Dificultad</h3>

                    <select className='manage-problems-select' name='difficulty' defaultValue={'all'} onChange={handleChange}>
                        <option value={'all'}>(Todo)</option>
                        <option value={'easy'}>Facil</option>
                        <option value={'normal'}>Normal</option>
                        <option value={'hard'}>Dificil</option>
                        <option value={'expert'}>Experto</option>
                    </select>

                    <h3>Niveles academicos</h3>

                    <select className='manage-problems-select' name='academicLevel' defaultValue={'all'} onChange={handleChange}>
                        <option value={'all'}>(Todo)</option>
                        {academicLevels.map((level, index) => level !== null ? <option key={'lev'+index} value={level}>{level === 'college' ? 'Universidad' : level === 'high' ? 'Preparatoria' : level === 'middle' ? 'Secundaria' : level === 'elementary' ? 'Primaria' : 'None'}</option> : <React.Fragment key={'lev'+index}></React.Fragment>)}
                    </select>

                    <button className='manage-problems-submit-button' onClick={handleApplyClick}>
                        Aplicar
                    </button>
                </div>
            </div>
        </dialog>
    )
}

export default FilterDialog