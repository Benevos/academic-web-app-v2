import React from "react";
import Navbar from "@/components/PageTop/Navbar";
import TopFiller from "@/components/PageTop/TopFiller";
import Header from '@/components/PageTop/Header';
import Link from "next/link";

export default function About() 
{

  return (
    <div>
      
      <Header/>
      <TopFiller/>
      <Navbar/>

      <div className="w-full">

        <div className="flex items-center justify-center w-full py-3">
          <div className="flex flex-col p-[35px] w-[80%] h-[80%] max-sm:w-full bg-white rounded-md def-shadow whitespace-pre-wrap">
            
            <h2>AVISO DE PRIVACIDAD INTEGRAL</h2>

            <p className="mb-3">La Universidad Autónoma de Tamaulipas (y por lo tanto, el desarrollador de esta plataforma), organismo público descentralizado del Estado de Tamaulipas, con autonomía, personalidad jurídica y patrimonio propios, creada por decretos 156 y 157, publicados en el Periódico Oficial del Estado, con fecha 11 de febrero de 1956, que contiene su Ley Constitutiva y su Ley Orgánica, establece el presente Aviso de Privacidad, en términos de lo dispuesto por los artículos 3 fracción I, 34, 35 y 39 de la Ley de Protección de Datos Personales en Posesión de Sujetos Obligados del Estado de Tamaulipas (en lo sucesivo “la Ley”), de conformidad con lo siguiente:</p>

            <h3 className="mb-2">I. La denominación y domicilio legal del Responsable.</h3>

            <p className="mb-3">La denominación de este Responsable es Universidad Autónoma de Tamaulipas, con domicilio en calle Cristóbal Colón, entre Mariano Matamoros y José María Morelos y Pavón, Zona Centro, C.P. 87000, Victoria, Tamaulipas.</p>
            
            <h3 className="mb-2">II. Los datos personales que serán sometidos a tratamiento son, de manera enunciativa, más no limitativa:​</h3>

            <table className="border-2 whitespace-pre-wrap">
                <tr className="font-bold"> 
                    <td className="border-r-2 border-b-2">Categoría</td>
                    <td className="border-b-2">Tipo de Datos Personales</td>
                </tr>
                <tr>
                    <td className="font-bold border-r-2 border-b-2">Datos identificativos personales</td>
                    <td className="border-b-2">
                        {"• Nombre completo\n• Domicilio particular\n• Teléfono casa\n• Teléfono celular\n• Estado Civil\n•  Firma\n•  Registro Federal de Contribuyente (RFC)\n• Clave Única de Registro de Población (CURP)\n• Sexo\n• Talla\n• Complexión\n• Tez\n• Color de cabello\n• Color de ojos\n• Estatura\n• Peso\n• Tipo de sangre\n• Datos familiares (Nombre del cónyuge e hijos, con fechas de nacimiento y sexo de los hijos), y nombre de persona con teléfono de contacto en caso de una emergencia.\n• Dependientes y beneficiariosn\n• Fecha de nacimiento\n• Lugar de nacimiento\n• Fotografía\n• Edad\n• Cartilla del Servicio Militar\n• Licencia de Manejo\n• Pasaporte"}
                    </td>
                </tr>
                <tr>
                    <td className="font-bold border-r-2 border-b-2">Datos identificativos comerciales</td>
                    <td className="border-b-2">
                        {"• Nombre de la persona física o moral\n• Nombre del representante legal\n• Domicilio de la empresa\n• Número de teléfono del representante legal\n• Número de teléfono de la empresa Registro Federal de Contribuyente (RFC) de la persona física o moral\n• Estados de cuenta bancaria de la persona física o moral Constancia de no inhabilitado."}
                    </td>
                </tr>
                <tr>
                    <td className="font-bold border-r-2 border-b-2">Datos electrónicos</td>
                    <td className="border-b-2">
                        {"• Escolaridad\n• Títulos\n• Cédula Profesional\n• Reconocimientos, constancias, diplomas, certificados"}
                    </td>
                </tr>
                <tr>
                    <td className="font-bold border-r-2 border-b-2">Datos laborales</td>
                    <td className="border-b-2">
                        {"• Documentos de reclutamiento y selección\n• Nombramiento Referencias personales y laborales\n• Número de personal\n• Número de seguro social\n• Información de trabajos anteriores"}
                    </td>
                </tr>
                <tr>
                    <td className="font-bold border-r-2 border-b-2">Datos patrimoniales</td>
                    <td className="border-b-2">
                        {"• Seguros\n• Número de cuenta bancaria\Información fiscal\n• Descuentos por orden judicial\n• Descuentos de diversa índole\n• Créditos\n• Ingresos"}
                    </td>
                </tr>
                <tr>
                    <td className="font-bold border-r-2 border-b-2">Datos biométricos</td>
                    <td className="border-b-2">
                        {"• Huella dactilar\n• Escaneo facial"}
                    </td>
                </tr>
                <tr>
                    <td className="font-bold border-r-2 border-b-2">Datos de salud</td>
                    <td className="border-b-2">
                        {"• Incapacidades médicas\n• Padecimientos\n• Enfermedades Uso de aparatos oftalmológicos u ortopédicos\n• Alergias"}
                    </td>
                </tr>
            </table>

            <p className="mb-3">Se le informa que se recaban datos personales sensibles tales como: estado de salud presente o futuro, padecimientos o enfermedades.</p>

            <h3 className="mb-2">Finalidad</h3>

            <p className="mb-3">{"Los datos personales que se recaben serán utilizados con la finalidad de:\n\na) Identificar, ubicar, comunicar, contactar, enviar información y/o beneficios públicos, elaboración de estadísticas científicas o de interés general previstas en ley, así como para los trámites inherentes a las funciones académicas y administrativas de la Universidad Autónoma de Tamaulipas, sus planes y programas que se implementen en la comunidad universitaria, conforme al artículo 14 de la Ley\nb) Realizar los trámites de contratación, ingreso, designación, pago de nómina, cumplimiento de obligaciones legales, administrativas, fiscales y patronales, integración de expediente del personal que labora o laboró en este Responsable, generación de identificaciones, otorgamiento de las prestaciones, movimientos de personal, registro de control de las entradas y salidas del personal, bolsa de trabajo y declaración patrimonial;\nc) Contar con un registro de personas físicas y morales que estén en posibilidades de presentar propuestas para la adjudicación de bienes y/o contratación de servicios para la Universidad Autónoma de Tamaulipas, y\nd) Otorgar cumplimiento a las obligaciones de transparencia establecidas en el artículo 67 y 76 de la Ley de Transparencia y Acceso a la Información Pública del Estado de Tamaulipas, que serán considerados para su publicación y difusión en la Plataforma Nacional de Transparencia, así como en el portal de internet de este Responsable."}</p>

            <h3 className="mb-2">III. El fundamento legal que faculta expresamente a la Universidad Autónoma de Tamaulipas para llevar a cabo:</h3>

            <table className="border-2 whitespace-pre-wrap">
                <tr className="font-bold"> 
                    <td className="border-r-2 border-b-2">Destinatarios de los datos personales</td>
                    <td className="border-b-2">País</td>
                    <td className="border-b-2">Finalidad</td>
                </tr>
                <tr>
                    <td className="border-r-2 border-b-2">Servicio de Administración Tributaria de la Secretaría de Hacienda y Crédito Público.</td>
                    <td className="border-r-2 border-b-2">México</td>
                    <td className="border-b-2">Pago de impuestos.</td>
                </tr>
                <tr>
                    <td className="border-r-2 border-b-2">Instituto Mexicano del Seguro Social</td>
                    <td className="border-r-2 border-b-2">México</td>
                    <td className="border-b-2">Pago de cuotas.</td>
                </tr>
                <tr>
                    <td className="border-r-2 border-b-2">Auditoría Superior del Estado de Tamaulipas.</td>
                    <td className="border-r-2 border-b-2">México</td>
                    <td className="border-b-2">Revisión o auditorías.</td>
                </tr>
                <tr>
                    <td className="border-r-2 border-b-2">Instituto de Previsión y Seguridad Social del Estado de Tamaulipas.</td>
                    <td className="border-r-2 border-b-2">México</td>
                    <td className="border-b-2">Pago de cuotas y aportaciones, préstamos y movimientos de personal.</td>
                </tr>
                <tr>
                    <td className="border-r-2 border-b-2">Secretaría de Finanzas.</td>
                    <td className="border-r-2 border-b-2">México</td>
                    <td className="border-b-2">Trámites administrativos, financieros y de nómina.</td>
                </tr>
                <tr>
                    <td className="border-r-2 border-b-2">Contraloría Gubernamental del Estado de Tamaulipas.</td>
                    <td className="border-r-2 border-b-2">México</td>
                    <td className="border-b-2">Trámites administrativos, revisión o auditorías.</td>
                </tr>
                <tr>
                    <td className="border-r-2 border-b-2">Autoridades jurisdiccionales estatales o federales.</td>
                    <td className="border-r-2 border-b-2">México</td>
                    <td className="border-b-2">Cumplimiento de mandamiento judicial fundado y motivado.</td>
                </tr>
                <tr>
                    <td className="border-r-2 border-b-2">Instituciones bancarias en general.</td>
                    <td className="border-r-2 border-b-2">México</td>
                    <td className="border-b-2">Dispersión de nómina y seguro de vida nómina.</td>
                </tr>
                <tr>
                    <td className="border-r-2 border-b-2">Instituciones aseguradoras en general.​</td>
                    <td className="border-r-2 border-b-2">México</td>
                    <td className="border-b-2">Crámites de seguros particulares del trabajador.</td>
                </tr>
            </table>
            
            <h3 className="mb-2">IV. Los mecanismos, medios y procedimientos disponibles para ejercer los derechos ARCO.</h3>

            <p className="mb-3 text-sm">Para el ejercicio de los derechos ARCO (acceso, rectificación, cancelación y oposición) Usted podrá realizarlos mediante la Plataforma Nacional de Transparencia, sito en https://www.sisaitamaulipas.org/sisaitamaulipas/; correo electrónico transparencia@uat.edu.mx correspondiente a la Unidad de Transparencia de la Universidad Autónoma de Tamaulipas.</p>

            <h3 className="mb-2">V. El domicilio de la Unidad de Transparencia.</h3>

            <p className="mb-3">{"Universidad Autónoma de Tamaulipas.\nUnidad de Transparencia.\nResponsable: Lic. César Abraham Ramírez Rosas.\nHorario 9:00 a 16:00 horas.\nDomicilio: Calle Cristóbal Colón, entre Miguel Hidalgo y Benito Juárez, Zona Centro, C.P. 87000, Victoria, Tamaulipas.\nNúmero telefónico oficial: (834)318-1805.\nCorreo electrónico oficial: transparencia@uat.edu.mx"}</p>

            <h3 className="mb-2">VI. Cambios al aviso de privacidad.</h3>

            <p className="mb-3">En caso de que aplicar modificaciones a este aviso de privacidad, se notificará a través de medios electrónicos, como el portal de internet del Responsable, sito en www.uat.edu.mx, o bien, el correo electrónico institucional y/o personal.</p>

            <h3>VII. Disposiciones generales.</h3>
            <p className="mb-3">{"1. El presente Aviso tiene por objeto informar, a la comunidad universitaria (aspirantes, alumnos, egresados, personal directivo, personal docente, personal administrativo, así como proveedores de bienes y servicios) los propósitos principales del tratamiento al que serán sometidos sus datos personales, mediante su tratamiento legítimo, controlado e informado, conforme a la fracción I del artículo 3 de la Ley de Protección de Datos Personales en Posesión de Sujetos Obligados del Estado de Tamaulipas, en lo sucesivo “la Ley”.\n2. Datos Personales son cualquier información concerniente a una persona física identificada o identificable. Se considera que una persona es identificable cuando su identidad pueda determinarse directa o indirectamente a través de cualquier información, en términos de la fracción VII del artículo 3 de la Ley; los responsables de recabar los datos personales son las áreas académicas, administrativas, escolares, financieras y legales de la Universidad Autónoma de Tamaulipas.\n3. Al proporcionar datos personales por escrito, a través de una solicitud, formato en papel, formato digital, correo electrónico, registro biométrico o cualquier otro medio o documento, ACEPTA Y AUTORIZA A LA UNIVERSIDAD AUTÓNOMA DE TAMAULIPAS A UTILIZAR Y TRATAR DE FORMA AUTOMATIZADA SUS DATOS PERSONALES E INFORMACIÓN SUMINISTRADOS, los cuales formarán parte de la base de datos con la finalidad de usarlos, de manera enunciativa, más no limitativa, para: identificar, ubicar, comunicar, contactar, enviar información y/o beneficios públicos, elaboración de estadísticas científicas o de interés general previstas en ley, así como para los trámites inherentes a las funciones académicas y administrativas de la Universidad Autónoma de Tamaulipas, sus planes y programas que se implementen en la comunidad universitaria, conforme al artículo 14 de la Ley.\n4. Mediante la aceptación y autorización para el tratamiento de tus datos personales en los términos antes señalados, autoriza a la Universidad Autónoma de Tamaulipas expresamente a transferirlos a autoridades de cualquier nivel (Federales, Estatales, Municipales), organismos públicos, dentro y fuera de México, con el propósito, de manera enunciativa más no limitativa, de certificar estudios y competencias, así como para participar en sus procesos de selección de personal y, en su caso, aplicar a los diversos puestos de trabajo vacantes que éstas publiquen en nuestra Bolsa de Trabajo; y autoriza a la Universidad Autónoma de Tamaulipas expresamente a poder emitir y entregar documentación oficial o no, a padres o representantes legales.\n5. La temporalidad del manejo de los datos personales será indefinida a partir de la fecha en que nos los proporcione, pudiendo oponerse al manejo de los mismos en cualquier momento que lo considere, con las limitaciones de Ley; en caso de que su solicitud de oposición sea procedente, la Universidad Autónoma de Tamaulipas dejará de manejar datos personales sin ninguna responsabilidad de nuestra parte. Quedan fuera de este supuesto las Bases de Datos referentes a las calificaciones y demás información académica de los alumnos, exalumnos y egresados de la Universidad Autónoma de Tamaulipas, y alumnos en movilidad o en intercambio provenientes de otras instituciones.\n6. La Universidad Autónoma de Tamaulipas, responsable del tratamiento de datos personales, está obligada a cumplir con los principios de licitud, finalidad, lealtad, consentimiento, calidad, proporcionalidad, información y responsabilidad en el tratamiento de datos personales, conforme al artículo 13 de la Ley; por tal motivo, la Universidad Autónoma de Tamaulipas se compromete a adoptar las medidas necesarias para mantener exactos, completos, correctos y actualizados los datos personales en su posesión, a fin de que no se altere la veracidad de éstos; así como a establecer y mantener las medidas de seguridad de carácter administrativo, físico y técnico para la protección de los datos personales, que permitan protegerlos contra daño, pérdida, alteración, destrucción o su uso, acceso o tratamiento no autorizado, así como garantizar su confidencialidad, integridad y disponibilidad, de acuerdo a los artículos 28 y 46 de la Ley.\n7. En el caso de los aspirantes para cursar alguna carrera o posgrado que imparte la Universidad Autónoma de Tamaulipas, el hecho de cubrir el pago de inscripción y seleccionar asignaturas, constituye un hecho que manifiesta el consentimiento expreso del contenido del presente Aviso de Privacidad."}</p>

            <h3 className="mb-3">VIII. Eliminación y conservación de los datos de esta plataforma.</h3>

            <p>Esta plataforma conserva los datos con los fines aplicables a las normas anteriormente establecidas, sin embargo, el usuario puede solicitar la eliminación completa de sus datos relacionados enviando un correo electrónico al desarrollador a la dirección kevin_mendoza092@hotmail.com</p>
          </div>
          
        </div>

      </div>

    </div>
  )
}