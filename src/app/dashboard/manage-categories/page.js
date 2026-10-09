'use client';

import React, { useEffect, useState } from 'react';

import TopFiller from '@/components/PageTop/TopFiller';
import Navbar from '@/components/PageTop/Navbar';
import Header from '@/components/PageTop/Header';
import FormTitle from '@/components/FormTitle';
import FormInput from '@/components/FormInput';
import FormSubmitButton from '@/components/FormSubmitButton';
import ProtectedRoute from '@/components/ProtectedRoute';
import Dialog from '@/components/Dialog';

import {
    createNewCategory,
    deleteDocument,
    getOneQueryCollection,
    getTwoQueryCollection,
    updateDocument
} from '@/services/firebase';

import {
    IoMdRemoveCircle,
    IoMdAddCircle
} from 'react-icons/io';

import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

const createInitialCategory = (scholarKey = '') => ({
    name: '',
    subcategories: ['all'],
    scholarKey
});

function ManageCategories()
{
    const [categories, setCategories] = useState([]);

    const [categoryForm, setCategoryForm] = useState(
        createInitialCategory()
    );

    const [editingCategory, setEditingCategory] = useState(null);

    const [dialogConfig, setDialogConfig] = useState({
        title: '',
        message: '',
        showButton: true,
        color: 'primary',
        disabled: false
    });

    const showDialog = (config) =>
    {
        setDialogConfig((previousConfig) => ({
            ...previousConfig,
            ...config
        }));

        const dialog = document.getElementById('dialog');

        if(dialog && !dialog.open)
        {
            dialog.showModal();
        }
    };

    const getScholarKey = () =>
    {
        try
        {
            const storedSession =
                localStorage.getItem('sessionData');

            if(!storedSession)
            {
                return '';
            }

            const sessionData =
                JSON.parse(storedSession);

            return sessionData?.scholarKey || '';
        }
        catch(error)
        {
            return '';
        }
    };

    const loadCategories = async (scholarKey) =>
    {
        const categoriesCollection =
            await getOneQueryCollection(
                'categories',
                'scholarKey',
                '==',
                scholarKey
            );

        setCategories(categoriesCollection);
    };

    useEffect(() =>
    {
        const getInitialData = async () =>
        {
            try
            {
                const scholarKey = getScholarKey();

                if(!scholarKey)
                {
                    return;
                }

                setCategoryForm(
                    createInitialCategory(scholarKey)
                );

                await loadCategories(scholarKey);
            }
            catch(error)
            {
                showDialog({
                    title: 'Error',
                    message: error.message,
                    color: 'error',
                    disabled: false
                });
            }
        };

        getInitialData();
    }, []);

    const handleNameChange = ({
        target: { value }
    }) =>
    {
        setCategoryForm((previousCategory) => ({
            ...previousCategory,
            name: value
        }));
    };

    const handleAddSubcategoryClick = () =>
    {
        setCategoryForm((previousCategory) => ({
            ...previousCategory,
            subcategories: [
                ...previousCategory.subcategories,
                ''
            ]
        }));
    };

    const handleDeleteSubcategoryClick = () =>
    {
        setCategoryForm((previousCategory) =>
        {
            if(previousCategory.subcategories.length <= 1)
            {
                return previousCategory;
            }

            return {
                ...previousCategory,
                subcategories:
                    previousCategory.subcategories.slice(0, -1)
            };
        });
    };

    const handleSubcategoryNameChange = (
        { target: { value } },
        index
    ) =>
    {
        setCategoryForm((previousCategory) =>
        {
            const updatedSubcategories =
                [...previousCategory.subcategories];

            updatedSubcategories[index] = value;

            return {
                ...previousCategory,
                subcategories: updatedSubcategories
            };
        });
    };

    const resetForm = (scholarKey) =>
    {
        setCategoryForm(
            createInitialCategory(scholarKey)
        );

        setEditingCategory(null);
    };

    const validateCategory = () =>
    {
        const categoryName =
            categoryForm.name.trim();

        if(categoryName === '')
        {
            showDialog({
                title: 'Error',
                message:
                    'Ingrese un nombre para la categoría',
                color: 'error',
                disabled: false
            });

            return null;
        }

        const normalizedSubcategories = [
            'all',
            ...categoryForm.subcategories
                .slice(1)
                .map((subcategory) =>
                    subcategory.trim()
                )
        ];

        const userSubcategories =
            normalizedSubcategories.slice(1);

        const hasEmptySubcategory =
            userSubcategories.some(
                (subcategory) =>
                    subcategory === ''
            );

        if(hasEmptySubcategory)
        {
            showDialog({
                title: 'Error',
                message:
                    'No deje subcategorías vacías',
                color: 'error',
                disabled: false
            });

            return null;
        }

        const normalizedNames =
            userSubcategories.map(
                (subcategory) =>
                    subcategory.toLowerCase()
            );

        const uniqueNames =
            new Set(normalizedNames);

        if(uniqueNames.size !== normalizedNames.length)
        {
            showDialog({
                title: 'Error',
                message:
                    'No puede registrar subcategorías duplicadas',
                color: 'error',
                disabled: false
            });

            return null;
        }

        if(
            normalizedNames.includes('all')
        )
        {
            showDialog({
                title: 'Error',
                message:
                    '"all" es un valor interno reservado y no puede utilizarse como nombre de subcategoría',
                color: 'error',
                disabled: false
            });

            return null;
        }

        return {
            name: categoryName,
            subcategories: normalizedSubcategories,
            scholarKey: categoryForm.scholarKey
        };
    };

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        const validatedCategory =
            validateCategory();

        if(!validatedCategory)
        {
            return;
        }

        const duplicatedCategory =
            categories.some((category) =>
                category.name.trim().toLowerCase() ===
                    validatedCategory.name.toLowerCase() &&
                category.id !== editingCategory?.id
            );

        if(duplicatedCategory)
        {
            showDialog({
                title: 'Error',
                message:
                    `La categoría "${validatedCategory.name}" ya existe`,
                color: 'error',
                disabled: false
            });

            return;
        }

        try
        {
            showDialog({
                title:
                    editingCategory
                        ? 'Actualizando categoría'
                        : 'Creando categoría',
                message: 'Por favor, espere',
                color: 'primary',
                disabled: true
            });

            if(!editingCategory)
            {
                await createNewCategory(
                    validatedCategory.name,
                    validatedCategory.subcategories,
                    validatedCategory.scholarKey
                );
            }
            else
            {
                const relatedProblems =
                    await getTwoQueryCollection(
                        'problems',
                        ['category', 'scholarKey'],
                        ['==', '=='],
                        [
                            editingCategory.originalName,
                            validatedCategory.scholarKey
                        ]
                    );

                const removedSubcategories =
                    editingCategory.originalSubcategories
                        .filter(
                            (subcategory) =>
                                subcategory !== 'all' &&
                                !validatedCategory
                                    .subcategories
                                    .includes(subcategory)
                        );

                const problemsUsingRemovedSubcategories =
                    relatedProblems.filter(
                        (problem) =>
                            removedSubcategories.includes(
                                problem.subcategory
                            )
                    );

                if(
                    problemsUsingRemovedSubcategories.length > 0
                )
                {
                    setDialogConfig({
                        title: 'No se puede actualizar',
                        message:
                            'Una o más subcategorías que intenta eliminar están siendo utilizadas por problemas existentes. Modifique primero esos problemas.',
                        showButton: true,
                        color: 'error',
                        disabled: false
                    });

                    return;
                }

                await updateDocument(
                    'categories',
                    editingCategory.id,
                    validatedCategory
                );

                if(
                    editingCategory.originalName !==
                    validatedCategory.name
                )
                {
                    await Promise.all(
                        relatedProblems.map(
                            (problem) =>
                                updateDocument(
                                    'problems',
                                    problem.id,
                                    {
                                        category:
                                            validatedCategory.name
                                    }
                                )
                        )
                    );
                }
            }

            await loadCategories(
                validatedCategory.scholarKey
            );

            resetForm(
                validatedCategory.scholarKey
            );

            setDialogConfig({
                title: 'Éxito',
                message:
                    editingCategory
                        ? 'Categoría actualizada correctamente'
                        : 'Categoría creada correctamente',
                showButton: true,
                color: 'primary',
                disabled: false
            });
        }
        catch(error)
        {
            showDialog({
                title: 'Error',
                message: error.message,
                color: 'error',
                disabled: false
            });
        }
    };

const handleDelete = async (category) =>
        {
            const confirmed = window.confirm(
                `ADVERTENCIA: esta acción no se puede revertir.\n\nLa categoría "${category.name}", sus problemas y los registros de interacción asociados serán eliminados.\n\n¿Desea continuar?`
            );
        
            if(!confirmed)
            {
                return;
            }
        
            try
            {
                showDialog({
                    title: 'Eliminando categoría',
                    message: 'Por favor, espere',
                    color: 'primary',
                    disabled: true
                });
        
                const relatedProblems =
                    await getTwoQueryCollection(
                        'problems',
                        ['category', 'scholarKey'],
                        ['==', '=='],
                        [
                            category.name,
                            category.scholarKey
                        ]
                    );
        
                /*
                 * Retrieve the response records associated
                 * with each problem before deleting the
                 * problems themselves.
                 */
                const responseGroups =
                    await Promise.all(
                        relatedProblems.map(
                            (problem) =>
                                getOneQueryCollection(
                                    'responses',
                                    'problemId',
                                    '==',
                                    problem.id
                                )
                        )
                    );
        
                const relatedResponses =
                    responseGroups
                        .flat()
                        .filter(
                            (response) =>
                                response.scholarKey ===
                                category.scholarKey
                        );
        
                /*
                 * Delete the interaction records first.
                 */
                await Promise.all(
                    relatedResponses.map(
                        (response) =>
                            deleteDocument(
                                'responses',
                                response.id
                            )
                    )
                );
        
                /*
                 * Delete the mathematical problems.
                 */
                await Promise.all(
                    relatedProblems.map(
                        (problem) =>
                            deleteDocument(
                                'problems',
                                problem.id
                            )
                    )
                );
        
                /*
                 * Finally, delete the category itself.
                 */
                await deleteDocument(
                    'categories',
                    category.id
                );
        
                await loadCategories(
                    category.scholarKey
                );
        
                if(
                    editingCategory?.id ===
                    category.id
                )
                {
                    resetForm(
                        category.scholarKey
                    );
                }
        
                showDialog({
                    title: 'Categoría eliminada',
                    message:
                        'La categoría, sus problemas y los registros de interacción asociados fueron eliminados correctamente',
                    color: 'primary',
                    disabled: false
                });
            }
            catch(error)
            {
                showDialog({
                    title: 'Error',
                    message: error.message,
                    color: 'error',
                    disabled: false
                });
            }
        };
    const handleUpdate = (category) =>
    {
        setEditingCategory({
            id: category.id,
            originalName: category.name,
            originalSubcategories:
                [...category.subcategories]
        });

        setCategoryForm({
            name: category.name,
            subcategories:
                [...category.subcategories],
            scholarKey: category.scholarKey
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleCancelEdit = () =>
    {
        const scholarKey =
            categoryForm.scholarKey ||
            getScholarKey();

        resetForm(scholarKey);
    };

    return (
        <div>

            <Dialog
                title={dialogConfig.title}
                message={dialogConfig.message}
                showButton={dialogConfig.showButton}
                color={dialogConfig.color}
                disabled={dialogConfig.disabled}
            />

            <Header/>
            <TopFiller/>
            <Navbar/>

            <div className='min-h-[calc(100dvh_-_137px)] flex flex-col justify-center items-center gap-3 py-4'>

                <form
                    onSubmit={handleSubmit}
                    className='w-[90%] p-[10px] flex flex-col items-center rounded-md bg-white'
                >

                    <FormTitle
                        title={
                            editingCategory
                                ? 'Actualizar categoría'
                                : 'Crear categoría'
                        }
                    />

                    <label className='font-semibold mb-2'>
                        Nombre:
                    </label>

                    <FormInput
                        name='name'
                        value={categoryForm.name}
                        placeholder='Agregue un nombre...'
                        width='80%'
                        onChange={handleNameChange}
                    />

                    <label className='mt-2 font-semibold'>
                        Subcategorías:
                    </label>

                    <div className='flex justify-center items-center gap-4 font-extrabold text-4xl mt-2'>

                        <button
                            className='text-green-500 hover:brightness-125'
                            type='button'
                            onClick={handleAddSubcategoryClick}
                            title='Agregar subcategoría'
                        >
                            <IoMdAddCircle/>
                        </button>

                        <button
                            className='text-red-600 hover:brightness-125'
                            type='button'
                            onClick={handleDeleteSubcategoryClick}
                            title='Eliminar última subcategoría'
                        >
                            <IoMdRemoveCircle/>
                        </button>

                    </div>

                    <div className='w-full grid grid-cols-[auto_minmax(0,1fr)] gap-y-2 justify-around mt-2'>

                        {
                            categoryForm.subcategories
                                .map(
                                    (subcategory, index) =>
                                    (
                                        <React.Fragment
                                            key={`subcategory-${index}`}
                                        >

                                            {
                                                index > 0 &&
                                                <>
                                                    <label className='flex justify-center items-center px-3'>
                                                        {index}:
                                                    </label>

                                                    <FormInput
                                                        onChange={
                                                            (e) =>
                                                                handleSubcategoryNameChange(
                                                                    e,
                                                                    index
                                                                )
                                                        }
                                                        name={`subcategory-${index}`}
                                                        placeholder='Agregue una subcategoría...'
                                                        value={subcategory}
                                                    />
                                                </>
                                            }

                                        </React.Fragment>
                                    )
                                )
                        }

                    </div>

                    <FormSubmitButton
                        text={
                            editingCategory
                                ? 'Actualizar categoría'
                                : 'Crear categoría'
                        }
                    />

                    {
                        editingCategory &&
                        <button
                            type='button'
                            onClick={handleCancelEdit}
                            className='mt-2 w-full p-3 rounded-lg border border-gray-400 bg-white hover:bg-gray-100 transition-all'
                        >
                            Cancelar edición
                        </button>
                    }

                </form>

                <section className='w-[90%] p-[10px] flex flex-col items-center rounded-md bg-white'>

                    <FormTitle
                        title='Lista de categorías'
                    />

                    {
                        categories.length === 0
                        ?
                        <p className='text-gray-500 py-4'>
                            No hay categorías registradas.
                        </p>
                        :
                        <div className='flex justify-center flex-wrap gap-4 w-full'>

                            {
                                categories.map(
                                    (category) =>
                                    (
                                        <div
                                            key={category.id}
                                            className='w-[30%] max-md:w-[45%] max-sm:w-[90%] border-[1px] border-solid border-[#CCCCCC] rounded'
                                        >

                                            <div className='flex items-center justify-center h-[30px] max-h-[40px] bg-[#e2e2e2] overflow-x-auto relative'>

                                                <h3 className='whitespace-nowrap'>
                                                    {category.name}
                                                </h3>

                                                <div className='absolute right-1'>

                                                    <button
                                                        type='button'
                                                        onClick={
                                                            () =>
                                                                handleUpdate(
                                                                    category
                                                                )
                                                        }
                                                        className='text-[#4070B6] transition-all hover:text-[#ECB06F]'
                                                        title='Editar categoría'
                                                    >
                                                        <FaEdit/>
                                                    </button>

                                                    <button
                                                        type='button'
                                                        onClick={
                                                            () =>
                                                                handleDelete(
                                                                    category
                                                                )
                                                        }
                                                        className='text-red-600 transition-all hover:text-[#ffa8a8]'
                                                        title='Eliminar categoría'
                                                    >
                                                        <MdDeleteForever/>
                                                    </button>

                                                </div>

                                            </div>

                                            {
                                                category.subcategories
                                                    .filter(
                                                        (subcategory) =>
                                                            subcategory !== 'all'
                                                    )
                                                    .length === 0
                                                ?
                                                <div className='h-[calc(100%-30px)] flex justify-center items-center text-[#6b6b6b] p-3'>
                                                    Sin subcategorías
                                                </div>
                                                :
                                                category.subcategories
                                                    .filter(
                                                        (subcategory) =>
                                                            subcategory !== 'all'
                                                    )
                                                    .map(
                                                        (
                                                            subcategory,
                                                            index
                                                        ) =>
                                                        (
                                                            <div
                                                                key={`${category.id}-${subcategory}-${index}`}
                                                                className={`px-3 whitespace-nowrap overflow-x-auto ${
                                                                    index % 2 === 0
                                                                        ? 'bg-[#F0F0F0]'
                                                                        : ''
                                                                }`}
                                                            >
                                                                <label>
                                                                    {subcategory}
                                                                </label>
                                                            </div>
                                                        )
                                                    )
                                            }

                                        </div>
                                    )
                                )
                            }

                        </div>
                    }

                </section>

            </div>

        </div>
    );
}

export default ProtectedRoute(ManageCategories);
