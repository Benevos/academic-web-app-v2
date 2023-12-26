/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useRef, useState } from 'react';

import TopFiller from '@/components/TopFiller';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import FormTitle from '@/components/FormTitle';
import ProtectedRoute from '@/components/ProtectedRoute';
import Previsualization from '@/components/Previsualization';
import Dialog from '@/components/Dialog';

import { getDocument, getOneQueryCollection, updateDocument } from '@/services/firebase';

import { AiFillFileAdd } from "react-icons/ai";
import { SiLatex } from "react-icons/si";
import { TbMath } from "react-icons/tb";
import { MdLiveHelp } from "react-icons/md";

import { Lora } from 'next/font/google';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { useRouter, useSearchParams } from 'next/navigation';
import Loading from '@/components/Loading';

const lora = Lora({ subsets: ['latin'] });

function EditProblem() 
{
  const searchParams = useSearchParams();
  const router = useRouter();

  const problemId = searchParams.get('id');

  const [problem, setProblem] = useState({
    title: '',
    paragraph: '',
    category: '',
    subcategory: '',
    difficulty: '',
    academicLevel: '',
    answers: [],
    solution: '',
    scholarKey: '',
  });

  const [dialogConfig, setDialogConfig] = useState({
    title: '', 
    message: '', 
    showButton: true, 
    color: 'primary', 
    disabled: false
  })

  const [problemExists , setProblemExists] = useState(true);
  const [newAnswers, setNewAnswers] = useState(['', '', '', '']);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [academicLevels, setAcademicLevels] = useState([]);
  const [activeInput, setActiveInput] = useState(null);

  const paragraphRef = useRef(null);
  
  const getInitialData = async () =>
  {
    

    const problemData = await getDocument('problems', problemId);

    if(problemData === undefined)
    {
      setProblemExists(false);
      return;
    }

    const scholarKey = JSON.parse(localStorage.getItem('sessionData')).scholarKey;
    const categoriesCollection = await getOneQueryCollection('categories', 'scholarKey', '==', scholarKey);
    const institutionsCollection = await getOneQueryCollection('institutions', 'scholarKey', '==', scholarKey);
    const instutionAcademicLevels = institutionsCollection[0].academicLevel;
    
    setAcademicLevels(instutionAcademicLevels);
    setCategories(categoriesCollection);
    setProblem(problemData);
    setNewAnswers(problemData.answers);

    const titleInput = document.querySelector('input[name="title"]');
    const paragraphInput = document.querySelector('textarea[name="paragraph"]');
    const categorySelect = document.querySelector('select[name="category"]');
    const subcategorySelect = document.querySelector('select[name="subcategory"]');
    const difficultySelect = document.querySelector('select[name="difficulty"]');
    const academicLevelSelect = document.querySelector('select[name="academicLevel"]');
    const solutionSelect = document.querySelector('select[name="solution"]');
    const answerTextareas = document.querySelectorAll('.create-problem-answer');

    titleInput.value = problemData.title;
    paragraphInput.value = problemData.paragraph;
    categorySelect.value = problemData.category;
    subcategorySelect.value = problemData.subcategory;
    difficultySelect.value = problemData.difficulty;
    academicLevelSelect.value = problemData.academicLevel;
    solutionSelect.value = problemData.solution;

    answerTextareas.forEach((textarea, index) =>
    {
      textarea.value = problemData.answers[index];
    });

  }

  const handleChange = ({ target: { name, value } }) =>
  {
    setProblem({...problem, [name]: value});
  }

  const handleAnswerChange = ( { target: { value, dataset: { index }  } } ) =>
  {
    const tempAnswers = [...newAnswers];
    tempAnswers[index] = value;

    setNewAnswers(tempAnswers);
  }

  const handleInputFocus = ({ target }) =>
  {
    setActiveInput(target);
  }

  const handleAddLaTeXClick = () =>
  {
    console.log(activeInput.className);
    if(activeInput.className === 'create-problem-answer' || activeInput.className === 'create-problem-answer-error')
    {
      console.log('Ejecucion')
      const index = activeInput.dataset.index;
      const tempAnswers = [...newAnswers];
      tempAnswers[index] += '\\(Escriba \\; LaTeX \\; aquí\\)';
      activeInput.value = tempAnswers[index]
      setNewAnswers(tempAnswers);
      return;
    }

    activeInput.value += '\\(Escriba \\; LaTeX \\; aquí\\)';
    
    setProblem({...problem, [activeInput.name]: activeInput.value})
  }

  const validateNotEmpty = (elements, className, comparsionValue) =>
  {
    let error = false;
    elements.forEach((element) =>
    {
      if(element.value.trim() === comparsionValue)
      {
        element.className = className + '-error';
        error = true;
        return;
      }

      element.className = className;
    })

    return error;
  };

  const handleSubmit = async (e) =>
  {
    e.preventDefault();

    const dialog = document.getElementById('dialog');
    const inputs = document.querySelectorAll('input');
    const normalTextareas = document.querySelectorAll('.create-problem-textarea');
    const errorTextareas = document.querySelectorAll('.create-problem-textarea-error');
    const normalAnswers = document.querySelectorAll('.create-problem-answer');
    const errorAnswers = document.querySelectorAll('.create-problem-answer-error');
    const selects = document.querySelectorAll('select');

    let inputsError = validateNotEmpty(inputs, 'create-problem-input', '');
    let selectsError = validateNotEmpty(selects, 'create-problem-select', 'default');
    let normalTextareasError = validateNotEmpty(normalTextareas, 'create-problem-textarea', '');
    let normalAnswersError = validateNotEmpty(normalAnswers, 'create-problem-answer', '');

    for (let i = 0; i < errorTextareas.length; i++) 
    {
      if(errorTextareas[i].value.trim() !== '')
      {
        errorTextareas[i].className = 'create-problem-textarea resize-y';
        normalTextareasError = false;
      }
      else
      {
        errorTextareas[i].className = 'create-problem-textarea-error resize-y'
      }
    }

    for(let i = 0; i < errorAnswers.length; i++)
    {
      if(errorAnswers[i].value.trim() !== '')
      {
        errorAnswers[i].className = 'create-problem-answer';
        normalAnswersError = false;
      }
      else
      {
        errorAnswers[i].className = 'create-problem-answer-error';
      }
    }

    if(inputsError || normalTextareasError || selectsError || normalAnswersError )
    {
      setDialogConfig({title: 'Error', message: 'No deje espacios vacios', color: 'error'});
      dialog.showModal();
      return;
    }

    try
    {
      setDialogConfig({title: 'Registrando problema...', message: 'Por favor, espere', color: 'primary', disabled: true});
      dialog.showModal();

      await updateDocument('problems', problemId, problem)

      setDialogConfig({title: 'Éxito', message: 'Problema actualizado con éxito', disabled: false});

      inputs.forEach(element => element.value = '');
      normalTextareas.forEach(element => element.value = '');
      normalAnswers.forEach(element => element.value = '');
      selects.forEach(element => element.value = 'default');

      setProblem({
        title: '',
        paragraph: '',
        category: '',
        subcategory: '',
        difficulty: '',
        academicLevel: '',
        answers: [],
        solution: '',
        scholarKey: problem.scholarKey,
      });

      setNewAnswers(['', '', '', '']);
    }
    catch({ message })
    {
      setDialogConfig({title: 'Error', message: message, color: 'error'})
      dialog.showModal();
    }
  }

  useEffect(() =>
  {
    getInitialData();
    
    const paragraph = paragraphRef.current;
    setActiveInput(paragraph);
  }, []);

  useEffect(() =>
  {
    setProblem({...problem, subcategory: 'all'})

    if(problem.category.trim() === '')
    {
      return;
    }

    const currentCategoryDoc = categories.filter(category => category.name === problem.category)[0];
  
    setSubcategories(currentCategoryDoc.subcategories);

  }, [problem.category])

  useEffect(() =>
  {
    setProblem({...problem, answers: newAnswers});
  }, [newAnswers])

  useEffect(() =>
  {
    if(!problemExists)
    {
      router.back();
    }
  }, [problemExists]);

  if(!problemId)
  {
    router.back();
    
    return(
      <Loading message='El problema no existe, redireccionando...'/>
    )
  }

  return !problemExists ? <Loading message='El problema no existe, redireccionando...'/> : (
    <div>
      <MathJaxContext>
        <Dialog 
          title={dialogConfig.title} 
          message={dialogConfig.message} 
          showButton={dialogConfig.showButton}
          color={dialogConfig.color}
          disabled={dialogConfig.disabled}/>

          <div onClick={handleAddLaTeXClick} className='insert-latex'>

            <p className='text-xs'>Insertar</p>
            <p className={lora.className + ' text-xl'}>LaTeX</p>

            <div className='w-full flex items-center justify-center text-3xl'>
              <SiLatex/> <TbMath/>
            </div>
          </div>

        <Header/>
        <TopFiller/>
        <Navbar/>

        

        <form className='create-problem' onSubmit={handleSubmit}>

          <div className='create-problem-info'>
            
              <p className='inline'><MdLiveHelp/>: Arrastre hacia bajo la esquina inferior derecha de las entradas de texto para expandirlas</p>
          
          </div>

            <div className='create-problem-content'>

                <FormTitle title='Actualizar problema' icon={<AiFillFileAdd/>}/>

                <h3>
                  Titulo:
                </h3>

                <input className='create-problem-input' name='title' onChange={handleChange} onFocus={handleInputFocus}/>

                <h3>
                  Planteamiento:
                </h3>

                <textarea ref={paragraphRef} name='paragraph' className='create-problem-textarea resize-y' onChange={handleChange} onFocus={handleInputFocus}/>

                <Previsualization title='Previsualización del planteamiento' value={problem.paragraph}/>

                <div className='create-problem-selects'>
                  <div className='cp-select-container'> 
                    <h3>Categoria:</h3>

                    <select className='create-problem-select' name='category' defaultValue={'default'} onChange={handleChange}>
                      <option value={'default'} disabled>(Seleccione categoria)</option>
                      {categories.map((category, index) => <option value={category.name} key={'cat'+index}>{category.name}</option>)}
                    </select>
                  </div>
                  
                  <div className='cp-select-container'> 
                    <h3>Subcategoria:</h3>

                    <select className='create-problem-select' name='subcategory' defaultValue={'default'} onChange={handleChange}>
                      <option value={'default'} disabled>(Seleccione subcategoria)</option>
                        {subcategories.map((subcategory, index) => <option value={subcategory.name} key={'subcat'+index}>{subcategory === 'all' ? 'General' : subcategory}</option>)}
                    </select>
                  </div>

                  <div className='cp-select-container'> 
                    <h3>Dificultad:</h3>

                    <select className='create-problem-select' name='difficulty' defaultValue={'default'} onChange={handleChange}>
                      <option value={'default'} disabled>(Seleccione dificultad)</option>
                      <option value={'easy'}>Facil</option>
                      <option value={'normal'}>Normal</option>
                      <option value={'hard'}>Dificil</option>
                      <option value={'expert'}>Experto</option>
                    </select>
                  </div>

                  <div className='cp-select-container'> 
                    <h3>Nivel academico:</h3>

                    <select className='create-problem-select' name='academicLevel' defaultValue={'default'} onChange={handleChange}>
                      <option value={'default'} disabled>(Seleccione nivel)</option>
                      {academicLevels.map((level, index) => level !== null ? <option key={'lev'+index} value={level}>{level === 'college' ? 'Universidad' : level === 'high' ? 'Preparatoria' : level === 'middle' ? 'Secundaria' : level === 'elementary' ? 'Primaria' : 'None'}</option> : <React.Fragment key={'lev'+index}></React.Fragment>)}
                    </select>
                  </div>

                </div>

                <h3>Respuestas:</h3>

                <div className='create-problem-answer-container'>
                  <textarea className='create-problem-answer' data-index={0} onChange={handleAnswerChange} onFocus={handleInputFocus}/>
                  <div className='create-problem-answer-prev'>
                    <h4 className='create-problem-answer-prev-title'>Previsualización de Respuesta 1</h4>
                    <MathJax>
                      {newAnswers[0]}
                    </MathJax>
                  </div>
                </div>

                <div className='create-problem-answer-container'>
                  <textarea className='create-problem-answer' data-index={1} onChange={handleAnswerChange} onFocus={handleInputFocus}/>
                  <div className='create-problem-answer-prev'>
                    <h4 className='create-problem-answer-prev-title'>Previsualización de Respuesta 2</h4>
                    <MathJax>
                      {newAnswers[1]}
                    </MathJax>
                  </div>
                </div>

                <div className='create-problem-answer-container'>
                  <textarea className='create-problem-answer' data-index={2} onChange={handleAnswerChange} onFocus={handleInputFocus}/>
                  <div className='create-problem-answer-prev'>
                    <h4 className='create-problem-answer-prev-title'>Previsualización de Respuesta 3</h4>
                    <MathJax>
                      {newAnswers[2]}
                    </MathJax>
                  </div>
                </div>

                <div className='create-problem-answer-container'>
                  <textarea className='create-problem-answer' data-index={3} onChange={handleAnswerChange} onFocus={handleInputFocus}/>
                  <div className='create-problem-answer-prev'>
                    <h4 className='create-problem-answer-prev-title'>Previsualización de Respuesta 4</h4>
                    <MathJax>
                      {newAnswers[3]}
                    </MathJax>
                  </div>
                </div>

                <div className='cp-select-container'> 
                  <h3>Solución:</h3>

                  <select className='create-problem-select' name='solution' defaultValue={'default'} onChange={handleChange}>
                    <option value={'default'} disabled>(Seleccione solución)</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                  </select>
                </div>
                
                <button className='create-problem-submit-button'>Actualizar problema</button>
            </div>
        </form>    
      </MathJaxContext>     
    </div>
  )
}

export default ProtectedRoute(EditProblem);