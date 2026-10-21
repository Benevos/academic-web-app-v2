'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import TopFiller from '@/components/PageTop/TopFiller';
import Navbar from '@/components/PageTop/Navbar';
import Header from '@/components/PageTop/Header';
import FormTitle from '@/components/FormTitle';
import ProtectedRoute from '@/components/ProtectedRoute';
import Previsualization from '@/components/Previsualization';
import Dialog from '@/components/Dialog';
import Loading from '@/components/Loading';

import {
  getDocument,
  getOneQueryCollection,
  updateDocument
} from '@/services/firebase';

import { AiFillFileAdd } from 'react-icons/ai';
import { SiLatex } from 'react-icons/si';
import { TbMath } from 'react-icons/tb';
import { MdLiveHelp } from 'react-icons/md';

import { Lora } from 'next/font/google';
import {
  MathJax,
  MathJaxContext
} from 'better-react-mathjax';

const lora = Lora({
  subsets: ['latin']
});

const emptyProblem = {
  title: '',
  paragraph: '',
  category: '',
  subcategory: '',
  difficulty: '',
  academicLevel: '',
  answers: ['', '', '', ''],
  solution: '',
  scholarKey: ''
};

function EditProblem()
{
  const router = useRouter();

  const [problemId, setProblemId] = useState('');
  const [problem, setProblem] = useState(emptyProblem);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [academicLevels, setAcademicLevels] = useState([]);

  const [loading, setLoading] = useState(true);
  const [problemExists, setProblemExists] = useState(true);

  const [activeTarget, setActiveTarget] = useState({
    type: 'field',
    name: 'paragraph'
  });

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

    const dialog =
      document.getElementById('dialog');

    if(dialog && !dialog.open)
    {
      dialog.showModal();
    }
  };

  useEffect(() =>
  {
    const getInitialData = async () =>
    {
      try
      {
        const queryParameters =
          new URLSearchParams(
            window.location.search
          );

        const currentProblemId =
          queryParameters.get('id');

        if(!currentProblemId)
        {
          setProblemExists(false);

          router.replace(
            '/dashboard/manage-problems'
          );

          return;
        }

        setProblemId(currentProblemId);

        const storedSession =
          localStorage.getItem('sessionData');

        if(!storedSession)
        {
          setProblemExists(false);

          router.replace('/login');

          return;
        }

        const sessionData =
          JSON.parse(storedSession);

        const scholarKey =
          sessionData?.scholarKey || '';

        if(!scholarKey)
        {
          setProblemExists(false);

          router.replace('/login');

          return;
        }

        const problemData =
          await getDocument(
            'problems',
            currentProblemId
          );

        if(
          !problemData ||
          problemData.scholarKey !== scholarKey
        )
        {
          setProblemExists(false);

          router.replace(
            '/dashboard/manage-problems'
          );

          return;
        }

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

        const institution =
          institutionsCollection[0];

        const enabledAcademicLevels =
          institution?.academicLevel
            ?.filter(
              (level) => level !== null
            ) || [];

        const currentCategory =
          categoriesCollection.find(
            (category) =>
              category.name ===
              problemData.category
          );

        const currentSubcategories =
          currentCategory?.subcategories || [];

        const normalizedAnswers =
          Array.isArray(problemData.answers)
            ? [
                problemData.answers[0] || '',
                problemData.answers[1] || '',
                problemData.answers[2] || '',
                problemData.answers[3] || ''
              ]
            : ['', '', '', ''];

        setCategories(categoriesCollection);
        setSubcategories(currentSubcategories);
        setAcademicLevels(
          enabledAcademicLevels
        );

        setProblem({
          title: problemData.title || '',
          paragraph:
            problemData.paragraph || '',
          category:
            problemData.category || '',
          subcategory:
            problemData.subcategory || '',
          difficulty:
            problemData.difficulty || '',
          academicLevel:
            problemData.academicLevel || '',
          answers: normalizedAnswers,
          solution:
            problemData.solution !== undefined
              ? String(
                  problemData.solution
                )
              : '',
          scholarKey
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
      finally
      {
        setLoading(false);
      }
    };

    getInitialData();
  }, [router]);

  const handleChange = ({
    target: { name, value }
  }) =>
  {
    if(name === 'category')
    {
      const currentCategory =
        categories.find(
          (category) =>
            category.name === value
        );

      const availableSubcategories =
        currentCategory?.subcategories || [];

      setSubcategories(
        availableSubcategories
      );

      let newSubcategory = '';

      if(
        availableSubcategories.includes(
          'all'
        )
      )
      {
        newSubcategory = 'all';
      }
      else if(
        availableSubcategories.length > 0
      )
      {
        newSubcategory =
          availableSubcategories[0];
      }

      setProblem(
        (previousProblem) => ({
          ...previousProblem,
          category: value,
          subcategory: newSubcategory
        })
      );

      return;
    }

    setProblem(
      (previousProblem) => ({
        ...previousProblem,
        [name]: value
      })
    );
  };

  const handleAnswerChange = ({
    target: {
      value,
      dataset: { index }
    }
  }) =>
  {
    const answerIndex =
      Number(index);

    setProblem(
      (previousProblem) =>
      {
        const updatedAnswers =
          [...previousProblem.answers];

        updatedAnswers[
          answerIndex
        ] = value;

        return {
          ...previousProblem,
          answers: updatedAnswers
        };
      }
    );
  };

  const handleFieldFocus = (name) =>
  {
    setActiveTarget({
      type: 'field',
      name
    });
  };

  const handleAnswerFocus = (index) =>
  {
    setActiveTarget({
      type: 'answer',
      index
    });
  };

  const handleAddLaTeXClick = () =>
  {
    const latexTemplate =
      '\\(Escriba \\; LaTeX \\; aquí\\)';

    if(activeTarget.type === 'answer')
    {
      setProblem(
        (previousProblem) =>
        {
          const updatedAnswers =
            [...previousProblem.answers];

          updatedAnswers[
            activeTarget.index
          ] =
            updatedAnswers[
              activeTarget.index
            ] + latexTemplate;

          return {
            ...previousProblem,
            answers: updatedAnswers
          };
        }
      );

      return;
    }

    if(
      activeTarget.name !== 'title' &&
      activeTarget.name !== 'paragraph'
    )
    {
      return;
    }

    setProblem(
      (previousProblem) => ({
        ...previousProblem,
        [activeTarget.name]:
          previousProblem[
            activeTarget.name
          ] + latexTemplate
      })
    );
  };

  const validateProblem = () =>
  {
    const requiredFields = [
      problem.title,
      problem.paragraph,
      problem.category,
      problem.subcategory,
      problem.difficulty,
      problem.academicLevel,
      problem.solution
    ];

    const hasEmptyField =
      requiredFields.some(
        (value) =>
          typeof value !== 'string' ||
          value.trim() === ''
      );

    const hasInvalidAnswers =
      !Array.isArray(
        problem.answers
      ) ||
      problem.answers.length !== 4 ||
      problem.answers.some(
        (answer) =>
          typeof answer !== 'string' ||
          answer.trim() === ''
      );

    const validSolutions = [
      '1',
      '2',
      '3',
      '4'
    ];

    const hasInvalidSolution =
      !validSolutions.includes(
        problem.solution
      );

    return (
      !hasEmptyField &&
      !hasInvalidAnswers &&
      !hasInvalidSolution
    );
  };

  const handleSubmit = async (e) =>
  {
    e.preventDefault();

    if(!problemId)
    {
      return;
    }

    if(!validateProblem())
    {
      showDialog({
        title: 'Error',
        message:
          'Complete todos los campos del problema',
        color: 'error',
        disabled: false
      });

      return;
    }

    try
    {
      showDialog({
        title:
          'Actualizando problema...',
        message:
          'Por favor, espere',
        color: 'primary',
        disabled: true
      });

      const updatedProblem = {
        scholarKey:
          problem.scholarKey,

        title:
          problem.title.trim(),

        paragraph:
          problem.paragraph.trim(),

        category:
          problem.category,

        subcategory:
          problem.subcategory,

        difficulty:
          problem.difficulty,

        academicLevel:
          problem.academicLevel,

        answers:
          problem.answers.map(
            (answer) =>
              answer.trim()
          ),

        solution:
          problem.solution
      };

      await updateDocument(
        'problems',
        problemId,
        updatedProblem
      );

      setProblem(updatedProblem);

      setDialogConfig({
        title: 'Éxito',
        message:
          'Problema actualizado correctamente',
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

  const getAcademicLevelLabel =
    (level) =>
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

  if(loading)
  {
    return (
      <Loading message='Cargando problema...'/>
    );
  }

  if(!problemExists)
  {
    return (
      <Loading message='El problema no existe o no pertenece a esta institución. Redireccionando...'/>
    );
  }

  return (
    <div>

      <MathJaxContext>

        <Dialog
          title={dialogConfig.title}
          message={dialogConfig.message}
          showButton={
            dialogConfig.showButton
          }
          color={dialogConfig.color}
          disabled={
            dialogConfig.disabled
          }
        />

        <div
          onClick={handleAddLaTeXClick}
          className='insert-latex'
        >

          <p className='text-xs'>
            Insertar
          </p>

          <p
            className={
              lora.className +
              ' text-xl'
            }
          >
            LaTeX
          </p>

          <div className='w-full flex items-center justify-center text-3xl'>

            <SiLatex/>
            <TbMath/>

          </div>

        </div>

        <Header/>
        <TopFiller/>
        <Navbar/>

        <form
          className='create-problem'
          onSubmit={handleSubmit}
        >

          <div className='create-problem-info'>

            <p className='inline'>
              <MdLiveHelp/>: Arrastre hacia abajo la esquina inferior derecha de las entradas de texto para expandirlas.
            </p>

          </div>

          <div className='create-problem-content'>

            <FormTitle
              title='Actualizar problema'
              icon={<AiFillFileAdd/>}
            />

            <h3>
              Título:
            </h3>

            <input
              className='create-problem-input'
              name='title'
              value={problem.title}
              onChange={handleChange}
              onFocus={
                () =>
                  handleFieldFocus(
                    'title'
                  )
              }
            />

            <h3>
              Planteamiento:
            </h3>

            <textarea
              name='paragraph'
              className='create-problem-textarea resize-y'
              value={problem.paragraph}
              onChange={handleChange}
              onFocus={
                () =>
                  handleFieldFocus(
                    'paragraph'
                  )
              }
            />

            <Previsualization
              title='Previsualización del planteamiento'
              value={
                problem.paragraph
              }
            />

            <div className='create-problem-selects'>

              <div className='cp-select-container'>

                <h3>
                  Categoría:
                </h3>

                <select
                  className='create-problem-select'
                  name='category'
                  value={
                    problem.category ||
                    'default'
                  }
                  onChange={handleChange}
                >

                  <option
                    value='default'
                    disabled
                  >
                    (Seleccione categoría)
                  </option>

                  {
                    categories.map(
                      (category) =>
                      (
                        <option
                          value={
                            category.name
                          }
                          key={
                            category.id ||
                            category.name
                          }
                        >
                          {
                            category.name
                          }
                        </option>
                      )
                    )
                  }

                </select>

              </div>

              <div className='cp-select-container'>

                <h3>
                  Subcategoría:
                </h3>

                <select
                  className='create-problem-select'
                  name='subcategory'
                  value={
                    problem.subcategory ||
                    'default'
                  }
                  onChange={handleChange}
                  disabled={
                    !problem.category
                  }
                >

                  <option
                    value='default'
                    disabled
                  >
                    (Seleccione subcategoría)
                  </option>

                  {
                    subcategories.map(
                      (
                        subcategory,
                        index
                      ) =>
                      (
                        <option
                          value={
                            subcategory
                          }
                          key={
                            `${subcategory}-${index}`
                          }
                        >
                          {
                            subcategory ===
                            'all'
                              ? 'General'
                              : subcategory
                          }
                        </option>
                      )
                    )
                  }

                </select>

              </div>

              <div className='cp-select-container'>

                <h3>
                  Dificultad:
                </h3>

                <select
                  className='create-problem-select'
                  name='difficulty'
                  value={
                    problem.difficulty ||
                    'default'
                  }
                  onChange={handleChange}
                >

                  <option
                    value='default'
                    disabled
                  >
                    (Seleccione dificultad)
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

              </div>

              <div className='cp-select-container'>

                <h3>
                  Nivel académico:
                </h3>

                <select
                  className='create-problem-select'
                  name='academicLevel'
                  value={
                    problem.academicLevel ||
                    'default'
                  }
                  onChange={handleChange}
                >

                  <option
                    value='default'
                    disabled
                  >
                    (Seleccione nivel)
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

              </div>

            </div>

            <h3>
              Respuestas:
            </h3>

            {
              problem.answers.map(
                (answer, index) =>
                (
                  <div
                    className='create-problem-answer-container'
                    key={`answer-${index}`}
                  >

                    <textarea
                      className='create-problem-answer'
                      data-index={index}
                      value={answer}
                      onChange={
                        handleAnswerChange
                      }
                      onFocus={
                        () =>
                          handleAnswerFocus(
                            index
                          )
                      }
                    />

                    <div className='create-problem-answer-prev'>

                      <h4 className='create-problem-answer-prev-title'>
                        Previsualización de Respuesta {index + 1}
                      </h4>

                      <MathJax>
                        {answer}
                      </MathJax>

                    </div>

                  </div>
                )
              )
            }

            <div className='cp-select-container'>

              <h3>
                Solución:
              </h3>

              <select
                className='create-problem-select'
                name='solution'
                value={
                  problem.solution ||
                  'default'
                }
                onChange={handleChange}
              >

                <option
                  value='default'
                  disabled
                >
                  (Seleccione solución)
                </option>

                <option value='1'>
                  1
                </option>

                <option value='2'>
                  2
                </option>

                <option value='3'>
                  3
                </option>

                <option value='4'>
                  4
                </option>

              </select>

            </div>

            <button
              type='submit'
              className='create-problem-submit-button'
            >
              Actualizar problema
            </button>

          </div>

        </form>

      </MathJaxContext>

    </div>
  );
}

export default ProtectedRoute(EditProblem);
