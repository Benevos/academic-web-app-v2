'use client';

import React, { useEffect, useState } from 'react';

import TopFiller from '@/components/PageTop/TopFiller';
import Navbar from '@/components/PageTop/Navbar';
import Header from '@/components/PageTop/Header';
import FormTitle from '@/components/FormTitle';
import ProtectedRoute from '@/components/ProtectedRoute';
import ManageProblemsGrid from '@/components/ManageProblemsGrid';
import FilterDialog from '@/components/FilterDialog';
import Dialog from '@/components/Dialog';

import {
    deleteDocument,
    getOneQueryCollection
} from '@/services/firebase';

import { BsFillFilterSquareFill } from 'react-icons/bs';
import { MathJaxContext } from 'better-react-mathjax';

function ManageProblems()
{
    const [problems, setProblems] = useState([]);
    const [originalProblems, setOriginalProblems] = useState([]);

    const [scholarKey, setScholarKey] = useState('');
    const [loading, setLoading] = useState(true);
    const [filterOpen, setFilterOpen] = useState(false);

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

    useEffect(() =>
    {
        const loadProblems = async () =>
        {
            try
            {
                const storedSession =
                    localStorage.getItem('sessionData');

                if(!storedSession)
                {
                    setLoading(false);
                    return;
                }

                const sessionData =
                    JSON.parse(storedSession);

                const currentScholarKey =
                    sessionData?.scholarKey || '';

                if(!currentScholarKey)
                {
                    setLoading(false);
                    return;
                }

                setScholarKey(currentScholarKey);

                const problemsCollection =
                    await getOneQueryCollection(
                        'problems',
                        'scholarKey',
                        '==',
                        currentScholarKey
                    );

                setOriginalProblems(problemsCollection);
                setProblems(problemsCollection);
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
            finally
            {
                setLoading(false);
            }
        };

        loadProblems();
    }, []);

    const handleDeleteProblem = async (problem) =>
    {
        const confirmed = window.confirm(
            `ADVERTENCIA: esta acción no se puede revertir.\n\nEl problema "${problem.title}" será eliminado junto con sus registros de interacción asociados.\n\n¿Desea continuar?`
        );

        if(!confirmed)
        {
            return;
        }

        try
        {
            showDialog({
                title: 'Eliminando problema',
                message: 'Por favor, espere',
                color: 'primary',
                disabled: true
            });

            const responseDocuments =
                await getOneQueryCollection(
                    'responses',
                    'problemId',
                    '==',
                    problem.id
                );

            const institutionResponses =
                responseDocuments.filter(
                    (response) =>
                        response.scholarKey === scholarKey
                );

            await Promise.all(
                institutionResponses.map(
                    (response) =>
                        deleteDocument(
                            'responses',
                            response.id
                        )
                )
            );

            await deleteDocument(
                'problems',
                problem.id
            );

            setOriginalProblems(
                (previousProblems) =>
                    previousProblems.filter(
                        (currentProblem) =>
                            currentProblem.id !== problem.id
                    )
            );

            setProblems(
                (previousProblems) =>
                    previousProblems.filter(
                        (currentProblem) =>
                            currentProblem.id !== problem.id
                    )
            );

            setDialogConfig({
                title: 'Problema eliminado',
                message:
                    'El problema y sus registros de interacción asociados fueron eliminados correctamente',
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

    return (
        <div>

            <MathJaxContext>

                <Dialog
                    title={dialogConfig.title}
                    message={dialogConfig.message}
                    showButton={dialogConfig.showButton}
                    color={dialogConfig.color}
                    disabled={dialogConfig.disabled}
                />

                <FilterDialog
                    open={filterOpen}
                    onClose={() => setFilterOpen(false)}
                    originalProblems={originalProblems}
                    setProblems={setProblems}
                    scholarKey={scholarKey}
                />

                <Header/>
                <TopFiller/>
                <Navbar/>

                <div className='manage-problems'>

                    <div className='manage-problems-content'>

                        <button
                            type='button'
                            className='manage-problems-filters-button'
                            onClick={() => setFilterOpen(true)}
                            title='Filtrar problemas'
                        >
                            <BsFillFilterSquareFill/>
                        </button>

                        <FormTitle
                            title='Administrar problemas'
                        />

                        {
                            loading
                            ?
                            <div className='flex items-center justify-center text-xl font-semibold'>
                                Cargando problemas...
                            </div>
                            :
                            problems.length === 0
                            ?
                            <div className='flex items-center justify-center text-2xl font-semibold text-red-500'>
                                No se encontraron problemas
                            </div>
                            :
                            <ManageProblemsGrid
                                problems={problems}
                                onDelete={handleDeleteProblem}
                            />
                        }

                    </div>

                </div>

            </MathJaxContext>

        </div>
    );
}

export default ProtectedRoute(ManageProblems);
