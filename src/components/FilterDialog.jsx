import React, {
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';

import FormTitle from './FormTitle';

import {
    getOneQueryCollection
} from '@/services/firebase';

const initialFilters = {
    category: '__all__',
    subcategory: '__all__',
    difficulty: '__all__',
    academicLevel: '__all__'
};

function FilterDialog({
    open,
    onClose,
    originalProblems,
    setProblems,
    scholarKey
})
{
    const dialogRef = useRef(null);

    const [categories, setCategories] = useState([]);
    const [academicLevels, setAcademicLevels] = useState([]);

    const [filters, setFilters] =
        useState(initialFilters);

    useEffect(() =>
    {
        const dialog = dialogRef.current;

        if(!dialog)
        {
            return;
        }

        if(open && !dialog.open)
        {
            dialog.showModal();
        }

        if(!open && dialog.open)
        {
            dialog.close();
        }
    }, [open]);

    useEffect(() =>
    {
        const getInitialData = async () =>
        {
            if(!scholarKey)
            {
                return;
            }

            try
            {
                const [
                    categoriesCollection,
                    institutionsCollection
                ] = await Promise.all([
                    getOneQueryCollection(
                        'categories',
                        'scholarKey',
                        '==',
                        scholarKey
                    ),
                    getOneQueryCollection(
                        'institutions',
                        'scholarKey',
                        '==',
                        scholarKey
                    )
                ]);

                setCategories(categoriesCollection);

                const institution =
                    institutionsCollection[0];

                const levels =
                    institution?.academicLevel
                        ?.filter(
                            (level) => level !== null
                        ) || [];

                setAcademicLevels(levels);
            }
            catch(error)
            {
                console.error(
                    'Filter initialization error:',
                    error
                );
            }
        };

        getInitialData();
    }, [scholarKey]);

    const subcategories = useMemo(() =>
    {
        if(filters.category === '__all__')
        {
            return [];
        }

        const selectedCategory =
            categories.find(
                (category) =>
                    category.name === filters.category
            );

        return selectedCategory?.subcategories || [];
    }, [categories, filters.category]);

    const handleChange = ({
        target: { name, value }
    }) =>
    {
        if(name === 'category')
        {
            setFilters(
                (previousFilters) => ({
                    ...previousFilters,
                    category: value,
                    subcategory: '__all__'
                })
            );

            return;
        }

        setFilters(
            (previousFilters) => ({
                ...previousFilters,
                [name]: value
            })
        );
    };

    const handleApplyClick = () =>
    {
        let filteredProblems =
            [...originalProblems];

        if(filters.category !== '__all__')
        {
            filteredProblems =
                filteredProblems.filter(
                    (problem) =>
                        problem.category ===
                        filters.category
                );
        }

        if(filters.subcategory !== '__all__')
        {
            filteredProblems =
                filteredProblems.filter(
                    (problem) =>
                        problem.subcategory ===
                        filters.subcategory
                );
        }

        if(filters.difficulty !== '__all__')
        {
            filteredProblems =
                filteredProblems.filter(
                    (problem) =>
                        problem.difficulty ===
                        filters.difficulty
                );
        }

        if(filters.academicLevel !== '__all__')
        {
            filteredProblems =
                filteredProblems.filter(
                    (problem) =>
                        problem.academicLevel ===
                        filters.academicLevel
                );
        }

        setProblems(filteredProblems);
        onClose();
    };

    const handleResetClick = () =>
    {
        setFilters(initialFilters);
        setProblems(originalProblems);
        onClose();
    };

    const getAcademicLevelLabel = (level) =>
    {
        switch(level)
        {
            case 'college':
                return 'Universidad';

            case 'high':
                return 'Preparatoria';

            case 'middle':
                return 'Secundaria';

            case 'elementary':
                return 'Primaria';

            default:
                return level;
        }
    };

    return (
        <dialog
            ref={dialogRef}
            id='filter-dialog'
            className='manage-problems-filter-dialog'
            onCancel={(event) =>
            {
                event.preventDefault();
                onClose();
            }}
            onClose={onClose}
        >

            <div className='flex items-center justify-center'>

                <div className='manage-problems-filter-dialog-content'>

                    <FormTitle title='Filtros'/>

                    <h3>
                        Categoría
                    </h3>

                    <select
                        className='manage-problems-select'
                        name='category'
                        value={filters.category}
                        onChange={handleChange}
                    >

                        <option value='__all__'>
                            (Todo)
                        </option>

                        {
                            categories.map(
                                (category) =>
                                (
                                    <option
                                        value={category.name}
                                        key={category.id || category.name}
                                    >
                                        {category.name}
                                    </option>
                                )
                            )
                        }

                    </select>

                    <h3>
                        Subcategoría
                    </h3>

                    <select
                        className='manage-problems-select'
                        name='subcategory'
                        value={filters.subcategory}
                        onChange={handleChange}
                        disabled={
                            filters.category === '__all__'
                        }
                    >

                        <option value='__all__'>
                            (Todo)
                        </option>

                        {
                            subcategories.map(
                                (subcategory, index) =>
                                (
                                    <option
                                        value={subcategory}
                                        key={`${subcategory}-${index}`}
                                    >
                                        {
                                            subcategory === 'all'
                                                ? 'General'
                                                : subcategory
                                        }
                                    </option>
                                )
                            )
                        }

                    </select>

                    <h3>
                        Dificultad
                    </h3>

                    <select
                        className='manage-problems-select'
                        name='difficulty'
                        value={filters.difficulty}
                        onChange={handleChange}
                    >

                        <option value='__all__'>
                            (Todo)
                        </option>

                        <option value='easy'>
                            Fácil
                        </option>

                        <option value='normal'>
                            Normal
                        </option>

                        <option value='hard'>
                            Difícil
                        </option>

                        <option value='expert'>
                            Experto
                        </option>

                    </select>

                    <h3>
                        Nivel académico
                    </h3>

                    <select
                        className='manage-problems-select'
                        name='academicLevel'
                        value={filters.academicLevel}
                        onChange={handleChange}
                    >

                        <option value='__all__'>
                            (Todo)
                        </option>

                        {
                            academicLevels.map(
                                (level) =>
                                (
                                    <option
                                        key={level}
                                        value={level}
                                    >
                                        {
                                            getAcademicLevelLabel(
                                                level
                                            )
                                        }
                                    </option>
                                )
                            )
                        }

                    </select>

                    <div className='flex gap-2 mt-4'>

                        <button
                            type='button'
                            className='manage-problems-submit-button'
                            onClick={handleApplyClick}
                        >
                            Aplicar
                        </button>

                        <button
                            type='button'
                            className='manage-problems-submit-button'
                            onClick={handleResetClick}
                        >
                            Restablecer
                        </button>

                        <button
                            type='button'
                            className='manage-problems-submit-button'
                            onClick={onClose}
                        >
                            Cancelar
                        </button>

                    </div>

                </div>

            </div>

        </dialog>
    );
}

export default FilterDialog;
