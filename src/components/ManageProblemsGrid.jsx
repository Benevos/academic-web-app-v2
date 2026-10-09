'use client';

import React from 'react';
import Link from 'next/link';

import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

import { MathJax } from 'better-react-mathjax';

function ManageProblemsGrid({
    problems,
    onDelete
})
{
    const getDifficultyLabel = (difficulty) =>
    {
        switch(difficulty)
        {
            case 'easy':
                return 'Fácil';

            case 'normal':
                return 'Normal';

            case 'hard':
                return 'Difícil';

            case 'expert':
                return 'Experto';

            default:
                return difficulty;
        }
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

    const getSubcategoryLabel = (subcategory) =>
    {
        return subcategory === 'all'
            ? 'General'
            : subcategory;
    };

    return (
        <div className='manage-problems-grid'>

            <div className='manage-problems-grid-heading'>
                No.
            </div>

            <div className='manage-problems-grid-heading'>
                Título
            </div>

            <div className='manage-problems-grid-heading'>
                Planteamiento
            </div>

            <div className='manage-problems-grid-heading'>
                Categoría
            </div>

            <div className='manage-problems-grid-heading'>
                Subcategoría
            </div>

            <div className='manage-problems-grid-heading'>
                Dificultad
            </div>

            <div className='manage-problems-grid-heading'>
                Nivel académico
            </div>

            <div className='manage-problems-grid-heading'>
                Editar
            </div>

            <div className='manage-problems-grid-heading'>
                Borrar
            </div>

            {
                problems.map(
                    (problem, index) =>
                    (
                        <div
                            key={problem.id}
                            className={
                                'manage-problems-grid-items-wrapper ' +
                                (
                                    index % 2 === 0
                                        ? ''
                                        : 'mpgiw-even'
                                )
                            }
                        >

                            <div className='manage-problems-grid-item'>
                                {index + 1}
                            </div>

                            <div className='manage-problems-grid-item'>
                                <MathJax>
                                    {problem.title}
                                </MathJax>
                            </div>

                            <div
                                id='manage-problems-grid-paragraph'
                                className='manage-problems-grid-item'
                            >
                                <MathJax>
                                    {problem.paragraph}
                                </MathJax>
                            </div>

                            <div className='manage-problems-grid-item'>
                                {problem.category}
                            </div>

                            <div className='manage-problems-grid-item'>
                                {
                                    getSubcategoryLabel(
                                        problem.subcategory
                                    )
                                }
                            </div>

                            <div className='manage-problems-grid-item'>
                                {
                                    getDifficultyLabel(
                                        problem.difficulty
                                    )
                                }
                            </div>

                            <div className='manage-problems-grid-item'>
                                {
                                    getAcademicLevelLabel(
                                        problem.academicLevel
                                    )
                                }
                            </div>

                            <div className='manage-problems-grid-item'>

                                <Link
                                    href={
                                        `/dashboard/manage-problems/edit?id=${encodeURIComponent(problem.id)}`
                                    }
                                    title='Editar problema'
                                >

                                    <div className='manage-problems-grid-button manage-problems-edit'>
                                        <FaEdit/>
                                    </div>

                                </Link>

                            </div>

                            <div className='manage-problems-grid-item'>

                                <button
                                    type='button'
                                    onClick={
                                        () =>
                                            onDelete(problem)
                                    }
                                    className='manage-problems-grid-button manage-problems-delete'
                                    title='Eliminar problema'
                                >
                                    <MdDeleteForever/>
                                </button>

                            </div>

                        </div>
                    )
                )
            }

        </div>
    );
}

export default ManageProblemsGrid;
