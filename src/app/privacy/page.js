import React from "react";
import Navbar from "@/components/PageTop/Navbar";
import TopFiller from "@/components/PageTop/TopFiller";
import Header from "@/components/PageTop/Header";

export default function Privacy()
{
  return (
    <div>

      <Header/>
      <TopFiller/>
      <Navbar/>

      <div className="w-full">

        <div className="flex items-center justify-center w-full py-3">

          <div className="flex flex-col p-[35px] w-[80%] max-sm:w-full bg-white rounded-md def-shadow">

            <h1 className="text-2xl font-bold mb-4">
              Aviso de privacidad de Calcula UAT
            </h1>

            <p className="mb-4">
              Calcula UAT es un prototipo de software educativo y de investigación
              desarrollado en la Universidad Autónoma de Tamaulipas para apoyar la
              práctica estructurada del cálculo mental y el análisis descriptivo de
              las interacciones con ejercicios matemáticos.
            </p>

            <p className="mb-4">
              Este aviso describe específicamente la información utilizada por
              Calcula UAT v2.0.0. No sustituye los avisos de privacidad institucionales
              aplicables de la Universidad Autónoma de Tamaulipas.
            </p>

            <h2 className="text-xl font-semibold mb-2">
              1. Información utilizada por la plataforma
            </h2>

            <p className="mb-3">
              De acuerdo con la implementación actual, Calcula UAT utiliza información
              necesaria para identificar la institución, organizar el contenido
              educativo y registrar las interacciones con los ejercicios.
            </p>

            <ul className="list-disc pl-6 mb-4">
              <li>Clave institucional (<code>scholarKey</code>).</li>
              <li>Nombre de la institución.</li>
              <li>Correo asociado al registro institucional.</li>
              <li>Niveles académicos habilitados.</li>
              <li>
                Credencial de acceso utilizada por el mecanismo de autenticación del
                prototipo.
              </li>
              <li>Categorías y subcategorías educativas.</li>
              <li>Problemas matemáticos creados por usuarios institucionales.</li>
              <li>Identificador del problema resuelto.</li>
              <li>Número de intentos requeridos para resolverlo.</li>
              <li>Tiempo transcurrido durante la resolución.</li>
              <li>Fecha de la interacción.</li>
            </ul>

            <h2 className="text-xl font-semibold mb-2">
              2. Información que no forma parte del modelo actual de Calcula UAT
            </h2>

            <p className="mb-3">
              La versión 2.0.0 de Calcula UAT no requiere como parte de su modelo
              funcional datos tales como:
            </p>

            <ul className="list-disc pl-6 mb-4">
              <li>CURP o RFC.</li>
              <li>Domicilio particular.</li>
              <li>Información bancaria o patrimonial.</li>
              <li>Huella digital o reconocimiento facial.</li>
              <li>Información médica o de salud.</li>
              <li>Datos de nómina.</li>
              <li>Pasaporte o licencia de conducir.</li>
              <li>Geolocalización.</li>
            </ul>

            <h2 className="text-xl font-semibold mb-2">
              3. Finalidades
            </h2>

            <p className="mb-3">
              La información procesada por Calcula UAT se utiliza para:
            </p>

            <ul className="list-disc pl-6 mb-4">
              <li>permitir el acceso institucional al prototipo;</li>
              <li>organizar contenido por nivel académico, categoría y dificultad;</li>
              <li>presentar ejercicios matemáticos en la aplicación móvil;</li>
              <li>registrar el número de intentos y tiempo de resolución;</li>
              <li>generar estadísticas descriptivas sobre las interacciones;</li>
              <li>
                apoyar actividades educativas, de evaluación del software y de
                investigación autorizadas para el proyecto.
              </li>
            </ul>

            <h2 className="text-xl font-semibold mb-2">
              4. Almacenamiento y procesamiento
            </h2>

            <p className="mb-4">
              Calcula UAT utiliza Google Firebase Cloud Firestore como capa de
              almacenamiento compartida entre la aplicación web y la aplicación
              móvil. La aplicación Android también utiliza persistencia local de
              Firestore para apoyar su funcionamiento durante interrupciones
              temporales de conectividad.
            </p>

            <h2 className="text-xl font-semibold mb-2">
              5. Datos de interacción
            </h2>

            <p className="mb-4">
              Los registros de interacción almacenados por la aplicación móvil
              incluyen la clave institucional, el identificador del problema, el
              número de intentos, el tiempo de resolución y la fecha de la
              interacción. La versión actual no incorpora en esos registros un
              nombre individual del estudiante.
            </p>

            <h2 className="text-xl font-semibold mb-2">
              6. Seguridad y limitaciones del prototipo
            </h2>

            <p className="mb-4">
              Calcula UAT v2.0.0 es un prototipo de software de investigación.
              El mecanismo actual de acceso institucional no debe considerarse un
              sistema de gestión de identidad de nivel productivo. Los despliegues
              futuros deberán utilizar autenticación gestionada, políticas de
              autorización más granulares y reglas de acceso adecuadas en
              Cloud Firestore.
            </p>

            <h2 className="text-xl font-semibold mb-2">
              7. Conservación y eliminación
            </h2>

            <p className="mb-4">
              Los periodos de conservación de información deben establecerse de
              acuerdo con el propósito del despliegue, el protocolo de investigación
              aplicable y las disposiciones institucionales correspondientes.
              Calcula UAT v2.0.0 no incorpora actualmente un mecanismo automático
              de autoservicio para la eliminación de registros.
            </p>

            <h2 className="text-xl font-semibold mb-2">
              8. Derechos y contacto institucional
            </h2>

            <p className="mb-4">
              Las solicitudes relacionadas con protección de datos personales y
              ejercicio de derechos deberán atenderse mediante los mecanismos
              institucionales correspondientes de la Universidad Autónoma de
              Tamaulipas. La Unidad de Transparencia puede ser contactada mediante:
            </p>

            <p className="mb-4">
              Correo electrónico: <strong>transparencia@uat.edu.mx</strong>
            </p>

            <h2 className="text-xl font-semibold mb-2">
              9. Contacto del proyecto
            </h2>

            <p className="mb-4">
              Para consultas técnicas o académicas relacionadas con Calcula UAT:
            </p>

            <p>
              Ángel Mario Lerma-Sánchez<br/>
              Unidad Académica Multidisciplinaria Mante<br/>
              Universidad Autónoma de Tamaulipas<br/>
              <strong>amlerma@docentes.uat.edu.mx</strong>
            </p>

            <p className="text-sm text-gray-600 mt-6">
              Calcula UAT v2.0.0 · Research software prototype
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
