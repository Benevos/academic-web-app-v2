'use client';

import React, { useEffect, useState } from 'react'

import Chart from 'react-google-charts';
import { MathJax } from 'better-react-mathjax';
import { MathJaxContext } from 'better-react-mathjax';

import { v4 as uuid } from 'uuid';

import { BsFillFilterSquareFill } from "react-icons/bs";

import FormTitle from '@/components/FormTitle'
import PageTop from '@/components/PageTop/PageTop'
import FilterDialog from '@/components/FilterDialog';

import { getOneQueryCollection, getTwoQueryCollection } from '@/services/firebase';
import ProtectedRoute from '@/components/ProtectedRoute';

function Stats() 
{

    const [problemsCollection, setProblemsCollection] = useState([]);
    const [responsesCollection, setResponsesCollection] = useState([]);
    const [filteredProblems, setFilteredProblems] = useState([]);
    const [selectedProblemId, setSelectedProblemId] = useState('none');
    const [chartsData, setChartsData] = useState([]);
    const [averageResponseTime, setAverageResponseTime] = useState(0);

    const getProblemsCollection = async () =>
    {
        const scholarKey = JSON.parse(localStorage.getItem('sessionData')).scholarKey;

        const initialProblemsCollection = await getOneQueryCollection('problems', 'scholarKey', '==', scholarKey);

        setProblemsCollection(initialProblemsCollection);
        setFilteredProblems(initialProblemsCollection);
    
    }

    const getResponses = async () =>
    {
        if(selectedProblemId === 'none' || selectedProblemId.trim() === '') return;

        const scholarKey = JSON.parse(localStorage.getItem('sessionData')).scholarKey;

        const responses = await getTwoQueryCollection('responses', ['problemId', 'scholarKey'], ['==', '=='], [selectedProblemId, scholarKey])

        setResponsesCollection(responses);

        console.log(responses);
    }

    const processResponsesIntoChartData = () =>
    {
        if(responsesCollection.length === 0) {
            setChartsData([]);
            return;
        }

        const newChartsData = [];

        let totalResponsesTime = 0;

        responsesCollection.forEach((response) =>
        {
            totalResponsesTime += response.elapsedTime;
        })

        const averageTime = (totalResponsesTime / responsesCollection.length).toFixed(2);

        setAverageResponseTime(averageTime);

        const correctAnseredAttemps = responsesCollection.filter((response) => response.attemps === 1).length;
        const incorrectAnseredAttemps = responsesCollection.filter((response) => response.attemps !== 1).length;
        
        const pieChartData = [
            ['Estado', 'Numero de respuestas'],
            ['Correcto', correctAnseredAttemps],
            ['Incorrecto', incorrectAnseredAttemps]
        ];

        newChartsData.push(pieChartData);

        const minorToOneMinute = responsesCollection.filter(response => response.elapsedTime < 60).length;
        const mayorToOneAndMinorToThreeMinutes = responsesCollection.filter(response => response.elapsedTime > 60 && response.elapsedTime < 180).length;
        const mayorToThreeMinutes = responsesCollection.filter(response => response.elapsedTime > 180).length;

        const barChartData = [
            ['Intervalos (t)', 'Respuestas', {role: 'style'}],
            ['< 1 min', minorToOneMinute, 'green'],
            ['1 => 3 min', mayorToOneAndMinorToThreeMinutes, 'yellow'],
            ['> 3 min', mayorToThreeMinutes, 'red']
        ];

        newChartsData.push(barChartData)

        const scatterChartData = [
            ['Tiempo (segundos)', 'Respuestas'],
        ];
    
        responsesCollection.forEach((response) =>
        {
            scatterChartData.push([response.attemps, response.elapsedTime]);
        });

        newChartsData.push(scatterChartData);

        setChartsData(newChartsData);
    }

    const handleFilterClick = () =>
    {
        const filterDialog = document.querySelector('#filter-dialog');
        filterDialog.showModal();
    }

    const handleChange = ({ target: { name, value }}) =>
    {
        setSelectedProblemId(value);
    }

    useEffect(() =>
    {
        getResponses();
    }, [selectedProblemId])

    useEffect(() =>
    {
        processResponsesIntoChartData();
    }, [responsesCollection])

    useEffect(() =>
    {
        getProblemsCollection();
    }, [])



    return (
        <div>
            <PageTop/>

            <MathJaxContext>

            <FilterDialog originalProblems={problemsCollection} setProblems={setFilteredProblems}/>

            <div className='flex flex-col items-center justify-center py-[15px] w-full min-h-[calc(100dvh-137px)]'>
                <div className='w-[80%] max-md:w-full flex items-center flex-col p-[20px] rounded-lg bg-white def-shadow'>
                    
                    <div className='w-full flex items-center justify-center relative'>
                        <FormTitle title='Selección del problema'/>

                        <button onClick={handleFilterClick}
                                className='absolute text-xl right-[45px] top-[5px] text-[rgb(255,187,0)] transition-all 
                                        hover:text-[#81C6CC] max-[550px]:right-[0px]'>
                            <BsFillFilterSquareFill/>
                        </button>
                    </div>                    

                   
                    
                    <label>ID del problema:</label>

                    <select onChange={handleChange} value={selectedProblemId}
                            className='border-[2px] border-[#00426A] border-solid p-[5px] rounded-lg
                                       focus:border-[2px] focus:border-[#F7C46E] max-[990px]:w-full'>
                        <option value={'none'} disabled>(Seleccione un ID)</option>
                        
                        {
                            filteredProblems.map((problem, index) => 
                                <option key={uuid()} value={problem.id} >{index + 1}</option>)
                        }
                    </select>

                    <label className='mt-[20px] mb-[10px]'>Información de problemas filtrados:</label>

                    <div className='w-full'>

                        <div className='flex items-center max-h-[500px] overflow-x-auto overflow-y-scroll justify-center 
                                        w-full border-[1px] border-[#cccccc] border-solid rounded-md'>

                            <div className='grid grid-cols-[repeat(7,auto)] w-full rounded-[4px]'>
                                <div className='manage-problems-grid-heading'>ID</div>
                                <div className='manage-problems-grid-heading'>Título</div>
                                <div className='manage-problems-grid-heading'>Planteamiento</div>
                                <div className='manage-problems-grid-heading'>Categoria</div>
                                <div className='manage-problems-grid-heading'>Subcategoria</div>
                                <div className='manage-problems-grid-heading'>Dificultad</div>
                                <div className='manage-problems-grid-heading'>Nivel academico</div>
                                

                                {filteredProblems.map((problem, index) => 
                                    <div key={problem.id} className={'manage-problems-grid-items-wrapper ' + (index % 2 === 0 ? '' : 'mpgiw-even')}>
                                        <div className='manage-problems-grid-item'>{index+1}</div>
                                        <div className='manage-problems-grid-item'><MathJax>{problem.title}</MathJax></div>
                                        <div id='manage-problems-grid-paragraph' className='manage-problems-grid-item'><MathJax>{problem.paragraph}</MathJax></div>
                                        <div className='manage-problems-grid-item'>{problem.category}</div>
                                        <div className='manage-problems-grid-item'>{problem.subcategory}</div>
                                        <div className='manage-problems-grid-item'>{problem.difficulty}</div>
                                        <div className='manage-problems-grid-item'>{problem.academicLevel}</div>
                                    </div>
                                )}
                            </div>

                        </div> 

                    </div>
                </div>

                <div className='w-[80%]  mt-[20px] max-md:w-full flex items-center flex-col p-[20px] rounded-lg bg-white def-shadow'>
                    <FormTitle title='Estadísticas'/>
                    

                    {
                        chartsData.length === 0 ? 
                        <h2 className='text-red-500 text-center'>No se encontraron respuestas al problema seleccionado</h2> 
                        :
                        <div className='w-full'>
                            <Chart 
                            chartType='PieChart' 
                            options={{title: 'Veces respondido correctamente'}}
                            data={chartsData[0]}/>

                            <div className='w-full flex justify-center items-center'>
                                <p>Número total de respuestas: <strong>{responsesCollection.length}</strong></p>
                            </div>

                            <Chart 
                            chartType='BarChart' 
                            options={{
                                title: 'Tiempo de respuesta en intervalos',
                                legend: {position: 'none'}
                            }}
                            data={chartsData[1]}/>
                            
                            <div className='w-full flex justify-center items-center'>
                                <p>Tiempo promedio de respuesta (s): <strong>{averageResponseTime}</strong></p>
                            </div>
                            

                            <Chart 
                                chartType='ScatterChart' 
                                options={{
                                    title: 'Tiempo en segundos en relación a intentos', 
                                    hAxis: {title: 'Intentos'},
                                    vAxis: {title: 'Tiempo (s)'}
                                }}
                                data={chartsData[2]}>

                            </Chart>


                        </div>
                    }
                    
                </div>
            </div>
            </MathJaxContext>

        </div>
    )
}

export default ProtectedRoute(Stats);