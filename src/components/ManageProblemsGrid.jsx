'use client';

import React from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Link from 'next/link';
import { deleteDocument } from '@/services/firebase';
import { MathJax } from 'better-react-mathjax';

function ManageProblemsGrid({ problems }) 
{
    const handleDeleteClick = async ({ target: { dataset: { id } } }) =>
    {
        try
        {
            await deleteDocument('problems', id);
        }
        catch
        {
            console.log(id);
        }
        
    }

    return (
        <div className='manage-problems-grid'>
            <div className='manage-problems-grid-heading'>No</div>
            <div className='manage-problems-grid-heading'>Titulo</div>
            <div className='manage-problems-grid-heading'>Planteamiento</div>
            <div className='manage-problems-grid-heading'>Categoria</div>
            <div className='manage-problems-grid-heading'>Subcategoria</div>
            <div className='manage-problems-grid-heading'>Dificultad</div>
            <div className='manage-problems-grid-heading'>Nivel academico</div>
            <div className='manage-problems-grid-heading'>Editar</div>
            <div className='manage-problems-grid-heading'>Borrar</div>

            {problems.map((problem, index) => <div key={problem.id} className={'manage-problems-grid-items-wrapper ' + (index % 2 === 0 ? '' : 'mpgiw-even')}>
                <div className='manage-problems-grid-item'>{index+1}</div>
                <div className='manage-problems-grid-item'><MathJax>{problem.title}</MathJax></div>
                <div id='manage-problems-grid-paragraph' className='manage-problems-grid-item'><MathJax>{problem.paragraph}</MathJax></div>
                <div className='manage-problems-grid-item'>{problem.category}</div>
                <div className='manage-problems-grid-item'>{problem.subcategory}</div>
                <div className='manage-problems-grid-item'>{problem.difficulty}</div>
                <div className='manage-problems-grid-item'>{problem.academicLevel}</div>
                <div className='manage-problems-grid-item'>
                    <Link href={'/dashboard/manage-problems/edit?id='+problem.id}>
                        <div className="manage-problems-grid-button manage-problems-edit">
                            <FaEdit/>
                        </div>
                    </Link>
                </div>
                <div className='manage-problems-grid-item'>
                        <div onClick={handleDeleteClick} className="manage-problems-grid-button manage-problems-delete" data-id={problem.id}>
                            <MdDeleteForever data-id={problem.id}/>
                        </div>
                </div>
            </div>)}
        </div>
    )
}

export default ManageProblemsGrid