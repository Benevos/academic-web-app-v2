'use client';

import React, {
    useEffect,
    useMemo,
    useState
} from 'react';

import { Chart } from 'react-google-charts';
import {
    MathJax,
    MathJaxContext
} from 'better-react-mathjax';

import { BsFillFilterSquareFill } from 'react-icons/bs';

import FormTitle from '@/components/FormTitle';
import PageTop from '@/components/PageTop/PageTop';
import FilterDialog from '@/components/FilterDialog';
import ProtectedRoute from '@/components/ProtectedRoute';
import Dialog from '@/components/Dialog';

import {
    getOneQueryCollection
} from '@/services/firebase';

function Stats()
{
    const [scholarKey, setScholarKey] = useState('');

    const [
        problemsCollection,
        setProblemsCollection
    ] = useState([]);

    const [
        filteredProblems,
        setFilteredProblems
    ] = useState([]);

    const [
        selectedProblemId,
        setSelectedProblemId
    ] = useState('');

    const [
        responsesCollection,
        setResponsesCollection
    ] = useState([]);

    const [
        loadingProblems,
        setLoadingProblems
    ] = useState(true);

    const [
        loadingResponses,
        setLoadingResponses
    ] = useState(false);

    const [
        filterOpen,
        setFilterOpen
    ] = useState(false);

    const [
        dialogConfig,
        setDialogConfig
    ] = useState({
        title: '',
        message: '',
        showButton: true,
        color: 'primary',
        disabled: false
    });

    const showDialog = (config) =>
    {
        setDialogConfig(
            (previousConfig) => ({
                ...previousConfig,
                ...config
            })
        );

        const dialog =
            document.getElementById('dialog');

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
                    localStorage.getItem(
                        'sessionData'
                    );

                if(!storedSession)
                {
                    return;
                }

                const sessionData =
                    JSON.parse(
                        storedSession
                    );

                const currentScholarKey =
                    sessionData?.scholarKey || '';

                if(!currentScholarKey)
                {
                    return;
                }

                setScholarKey(
                    currentScholarKey
                );

                const problems =
                    await getOneQueryCollection(
                        'problems',
                        'scholarKey',
                        '==',
                        currentScholarKey
                    );

                setProblemsCollection(
                    problems
                );

                setFilteredProblems(
                    problems
                );
            }
            catch(error)
            {
                showDialog({
                    title: 'Error',
                    message:
                        error.message,
                    color: 'error',
                    disabled: false
                });
            }
            finally
            {
                setLoadingProblems(
                    false
                );
            }
        };

        loadProblems();
    }, []);

    useEffect(() =>
    {
        let active = true;

        const loadResponses =
            async () =>
            {
                if(
                    !selectedProblemId ||
                    !scholarKey
                )
                {
                    setResponsesCollection(
                        []
                    );

                    return;
                }

                try
                {
                    setLoadingResponses(
                        true
                    );

                    /*
                     * Query by problemId first and
                     * then verify institutional
                     * ownership locally.
                     */
                    const responses =
                        await getOneQueryCollection(
                            'responses',
                            'problemId',
                            '==',
                            selectedProblemId
                        );

                    const institutionResponses =
                        responses.filter(
                            (response) =>
                                response.scholarKey ===
                                scholarKey
                        );

                    if(active)
                    {
                        setResponsesCollection(
                            institutionResponses
                        );
                    }
                }
                catch(error)
                {
                    if(active)
                    {
                        setResponsesCollection(
                            []
                        );

                        showDialog({
                            title: 'Error',
                            message:
                                error.message,
                            color: 'error',
                            disabled: false
                        });
                    }
                }
                finally
                {
                    if(active)
                    {
                        setLoadingResponses(
                            false
                        );
                    }
                }
            };

        loadResponses();

        return () =>
        {
            active = false;
        };
    }, [
        selectedProblemId,
        scholarKey
    ]);

    const normalizedResponses =
        useMemo(
            () =>
            {
                return responsesCollection
                    .map(
                        (response) => ({
                            ...response,

                            attemps:
                                Number(
                                    response.attemps
                                ),

                            elapsedTime:
                                Number(
                                    response.elapsedTime
                                )
                        })
                    )
                    .filter(
                        (response) =>
                            Number.isFinite(
                                response.attemps
                            ) &&
                            Number.isFinite(
                                response.elapsedTime
                            ) &&
                            response.attemps >= 1 &&
                            response.elapsedTime >= 0
                    );
            },
            [responsesCollection]
        );

    const statistics =
        useMemo(
            () =>
            {
                if(
                    normalizedResponses.length ===
                    0
                )
                {
                    return {
                        averageResponseTime: 0,

                        firstAttempt: 0,

                        multipleAttempts: 0,

                        lessThanOneMinute: 0,

                        oneToThreeMinutes: 0,

                        moreThanThreeMinutes: 0,

                        pieChartData: [],

                        barChartData: [],

                        scatterChartData: []
                    };
                }

                const totalResponseTime =
                    normalizedResponses.reduce(
                        (
                            accumulatedTime,
                            response
                        ) =>
                            accumulatedTime +
                            response.elapsedTime,
                        0
                    );

                const averageResponseTime =
                    (
                        totalResponseTime /
                        normalizedResponses.length
                    ).toFixed(2);

                const firstAttempt =
                    normalizedResponses.filter(
                        (response) =>
                            response.attemps === 1
                    ).length;

                const multipleAttempts =
                    normalizedResponses.filter(
                        (response) =>
                            response.attemps > 1
                    ).length;

                const lessThanOneMinute =
                    normalizedResponses.filter(
                        (response) =>
                            response.elapsedTime <
                            60
                    ).length;

                const oneToThreeMinutes =
                    normalizedResponses.filter(
                        (response) =>
                            response.elapsedTime >=
                                60 &&
                            response.elapsedTime <=
                                180
                    ).length;

                const moreThanThreeMinutes =
                    normalizedResponses.filter(
                        (response) =>
                            response.elapsedTime >
                            180
                    ).length;

                const pieChartData = [
                    [
                        'Resultado',
                        'Número de respuestas'
                    ],

                    [
                        'Primer intento',
                        firstAttempt
                    ],

                    [
                        'Múltiples intentos',
                        multipleAttempts
                    ]
                ];

                const barChartData = [
                    [
                        'Intervalo',
                        'Respuestas',
                        {
                            role: 'style'
                        }
                    ],

                    [
                        '< 1 min',
                        lessThanOneMinute,
                        'green'
                    ],

                    [
                        '1–3 min',
                        oneToThreeMinutes,
                        'yellow'
                    ],

                    [
                        '> 3 min',
                        moreThanThreeMinutes,
                        'red'
                    ]
                ];

                const scatterChartData = [
                    [
                        'Intentos',
                        'Tiempo (segundos)'
                    ],

                    ...normalizedResponses.map(
                        (response) => [
                            response.attemps,
                            response.elapsedTime
                        ]
                    )
                ];

                return {
                    averageResponseTime,

                    firstAttempt,

                    multipleAttempts,

                    lessThanOneMinute,

                    oneToThreeMinutes,

                    moreThanThreeMinutes,

                    pieChartData,

                    barChartData,

                    scatterChartData
                };
            },
            [normalizedResponses]
        );

    const handleFilteredProblems =
        (newProblems) =>
        {
            setFilteredProblems(
                newProblems
            );

            const selectedStillVisible =
                newProblems.some(
                    (problem) =>
                        problem.id ===
                        selectedProblemId
                );

            if(
                selectedProblemId &&
                !selectedStillVisible
            )
            {
                setSelectedProblemId(
                    ''
                );

                setResponsesCollection(
                    []
                );
            }
        };

    const handleProblemChange = ({
        target: { value }
    }) =>
    {
        setSelectedProblemId(
            value
        );

        setResponsesCollection(
            []
        );
    };

    const getDifficultyLabel =
        (difficulty) =>
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

    const getSubcategoryLabel =
        (subcategory) =>
        {
            return subcategory === 'all'
                ? 'General'
                : subcategory;
        };

    const invalidResponseCount =
        responsesCollection.length -
        normalizedResponses.length;

    return (
        <div>

            <Dialog
                title={
                    dialogConfig.title
                }
                message={
                    dialogConfig.message
                }
                showButton={
                    dialogConfig.showButton
                }
                color={
                    dialogConfig.color
                }
                disabled={
                    dialogConfig.disabled
                }
            />

            <PageTop/>

            <MathJaxContext>

                <FilterDialog
                    open={filterOpen}
                    onClose={
                        () =>
                            setFilterOpen(
                                false
                            )
                    }
                    originalProblems={
                        problemsCollection
                    }
                    setProblems={
                        handleFilteredProblems
                    }
                    scholarKey={
                        scholarKey
                    }
                />

                <div className='flex flex-col items-center justify-center py-[15px] w-full min-h-[calc(100dvh-137px)]'>

                    <div className='w-[80%] max-md:w-full flex items-center flex-col p-[20px] rounded-lg bg-white def-shadow'>

                        <div className='w-full flex items-center justify-center relative'>

                            <FormTitle
                                title='Selección del problema'
                            />

                            <button
                                type='button'
                                onClick={
                                    () =>
                                        setFilterOpen(
                                            true
                                        )
                                }
                                className='absolute text-xl right-[45px] top-[5px] text-[rgb(255,187,0)] transition-all hover:text-[#81C6CC] max-[550px]:right-[0px]'
                                title='Filtrar problemas'
                            >
                                <BsFillFilterSquareFill/>
                            </button>

                        </div>

                        {
                            loadingProblems
                            ?
                            <p>
                                Cargando problemas...
                            </p>
                            :
                            <>
                                <label>
                                    Problema:
                                </label>

                                <select
                                    onChange={
                                        handleProblemChange
                                    }
                                    value={
                                        selectedProblemId
                                    }
                                    className='border-[2px] border-[#00426A] border-solid p-[5px] rounded-lg focus:border-[2px] focus:border-[#F7C46E] max-[990px]:w-full'
                                >

                                    <option
                                        value=''
                                        disabled
                                    >
                                        (Seleccione un problema)
                                    </option>

                                    {
                                        filteredProblems.map(
                                            (
                                                problem,
                                                index
                                            ) =>
                                            (
                                                <option
                                                    key={
                                                        problem.id
                                                    }
                                                    value={
                                                        problem.id
                                                    }
                                                >
                                                    {
                                                        `Problema ${index + 1}`
                                                    }
                                                </option>
                                            )
                                        )
                                    }

                                </select>

                                {
                                    filteredProblems.length ===
                                    0
                                    &&
                                    <p className='text-red-500 mt-3'>
                                        No se encontraron problemas con los filtros seleccionados.
                                    </p>
                                }
                            </>
                        }

                        <label className='mt-[20px] mb-[10px]'>
                            Información de problemas filtrados:
                        </label>

                        <div className='w-full'>

                            <div className='flex items-center max-h-[500px] overflow-x-auto overflow-y-scroll justify-center w-full border-[1px] border-[#cccccc] border-solid rounded-md'>

                                <div className='grid grid-cols-[repeat(7,auto)] w-full rounded-[4px]'>

                                    <div className='manage-problems-grid-heading'>
                                        ID
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

                                    {
                                        filteredProblems.map(
                                            (
                                                problem,
                                                index
                                            ) =>
                                            (
                                                <div
                                                    key={
                                                        problem.id
                                                    }
                                                    className={
                                                        'manage-problems-grid-items-wrapper ' +
                                                        (
                                                            index % 2 ===
                                                            0
                                                                ? ''
                                                                : 'mpgiw-even'
                                                        )
                                                    }
                                                >

                                                    <div className='manage-problems-grid-item'>
                                                        {
                                                            index +
                                                            1
                                                        }
                                                    </div>

                                                    <div className='manage-problems-grid-item'>
                                                        <MathJax>
                                                            {
                                                                problem.title
                                                            }
                                                        </MathJax>
                                                    </div>

                                                    <div
                                                        id='manage-problems-grid-paragraph'
                                                        className='manage-problems-grid-item'
                                                    >
                                                        <MathJax>
                                                            {
                                                                problem.paragraph
                                                            }
                                                        </MathJax>
                                                    </div>

                                                    <div className='manage-problems-grid-item'>
                                                        {
                                                            problem.category
                                                        }
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

                                                </div>
                                            )
                                        )
                                    }

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className='w-[80%] mt-[20px] max-md:w-full flex items-center flex-col p-[20px] rounded-lg bg-white def-shadow'>

                        <FormTitle
                            title='Estadísticas'
                        />

                        {
                            !selectedProblemId
                            ?
                            <p className='text-center'>
                                Seleccione un problema para consultar sus estadísticas.
                            </p>
                            :
                            loadingResponses
                            ?
                            <p className='text-center'>
                                Cargando estadísticas...
                            </p>
                            :
                            normalizedResponses.length ===
                            0
                            ?
                            <h2 className='text-red-500 text-center'>
                                No se encontraron respuestas válidas para el problema seleccionado.
                            </h2>
                            :
                            <div className='w-full'>

                                <Chart
                                    chartType='PieChart'
                                    options={{
                                        title:
                                            'Resolución según número de intentos'
                                    }}
                                    data={
                                        statistics.pieChartData
                                    }
                                />

                                <div className='w-full flex flex-col justify-center items-center gap-1'>

                                    <p>
                                        Número total de respuestas:
                                        {' '}
                                        <strong>
                                            {
                                                normalizedResponses.length
                                            }
                                        </strong>
                                    </p>

                                    <p>
                                        Primer intento:
                                        {' '}
                                        <strong>
                                            {
                                                statistics.firstAttempt
                                            }
                                        </strong>
                                    </p>

                                    <p>
                                        Múltiples intentos:
                                        {' '}
                                        <strong>
                                            {
                                                statistics.multipleAttempts
                                            }
                                        </strong>
                                    </p>

                                </div>

                                <Chart
                                    chartType='BarChart'
                                    options={{
                                        title:
                                            'Tiempo de respuesta en intervalos',

                                        legend: {
                                            position:
                                                'none'
                                        }
                                    }}
                                    data={
                                        statistics.barChartData
                                    }
                                />

                                <div className='w-full flex justify-center items-center'>

                                    <p>
                                        Tiempo promedio de respuesta (s):
                                        {' '}
                                        <strong>
                                            {
                                                statistics.averageResponseTime
                                            }
                                        </strong>
                                    </p>

                                </div>

                                <Chart
                                    chartType='ScatterChart'
                                    options={{
                                        title:
                                            'Tiempo de respuesta en relación con el número de intentos',

                                        hAxis: {
                                            title:
                                                'Intentos'
                                        },

                                        vAxis: {
                                            title:
                                                'Tiempo (s)'
                                        }
                                    }}
                                    data={
                                        statistics.scatterChartData
                                    }
                                />

                                {
                                    invalidResponseCount >
                                    0
                                    &&
                                    <p className='text-sm text-amber-700 text-center mt-3'>
                                        Registros omitidos por contener valores estadísticos no válidos:
                                        {' '}
                                        <strong>
                                            {
                                                invalidResponseCount
                                            }
                                        </strong>
                                    </p>
                                }

                            </div>
                        }

                    </div>

                </div>

            </MathJaxContext>

        </div>
    );
}

export default ProtectedRoute(Stats);
