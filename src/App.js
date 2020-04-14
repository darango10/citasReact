import React, {Fragment, useEffect, useState} from 'react';
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {

    //Citas en localStorage
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if (!citasIniciales) {
        citasIniciales = [];
    }

    //Crear state de citas
    const [citas, actualizarCitas] = useState(citasIniciales);

    //Use Effect para realizar ciertas operaciones cuando ell state cambia
    useEffect(() => {
        if (citasIniciales) {
            localStorage.setItem('citas', JSON.stringify(citas));
        } else {
            localStorage.setItem('citas', JSON.stringify([]));
        }
    }, [citas, citasIniciales])

    //Funcion que tome las citas actuales y agregue la nueva
    const crearCita = (cita) => {
        actualizarCitas([...citas, cita])
    }

    //Funcion que elimina una cita por su id
    const eliminarCita = (id) => {
        const nuevasCitas = citas.filter(cita => cita.id !== id);
        actualizarCitas(nuevasCitas);
    }

    //Mensaje Condicional
    let titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

    return (
        <Fragment>
            <h1>Administrador de Pacientes</h1>
            <div className='container'>
                <div className="row">
                    <div className="one-half column">
                        <Formulario crearCita={crearCita}/>
                    </div>
                    <div className="one-half column">
                        <h2>{titulo}</h2>
                        {citas.map(cita => (
                            <Cita
                                key={cita.id}
                                cita={cita}
                                eliminarCita={eliminarCita}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default App;
