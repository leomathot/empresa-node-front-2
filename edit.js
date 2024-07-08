// const axios = require('axios')

document.addEventListener("DOMContentLoaded", () => {
    // obtener el id del empleado de la URL
    const urlParams = new URLSearchParams(window.location.search)
    const empleadoId = urlParams.get('empleadoId')

    // obtener el formulario para editar un empleado
    const formEditarEmpleado = document.querySelector("#form-editar-empleado")

    // funcion para formato de fechas
    // Convierte la cadena de texto empleado.fecha a un objeto Date usando la función Date.parse().
    // Formatea el objeto Date a una cadena en formato ISO usando el método toISOString() y luego extrae los primeros 10 caracteres, que corresponden a la fecha en formato AAAA-MM-DD, usando el método substring().
    const formatoFecha = (fecha) => {
        if(fecha == null || fecha == "0000-00-00") return ""
        const date = new Date(Date.parse(fecha))
        const formattedDate = date.toISOString().substring(0, 10)
        return formattedDate
    }

    // función para obtener los datos del empleado
    const fetchEmpleado = async (empId) => {
        const respuesta = await axios.get(`https://empresa-node-api.vercel.app/empleados/${empId}`)
        const empleado = respuesta.data

        // rellenar el formulario con los datos del empleado
        document.querySelector("#nuevo-nombre").value = empleado.nombre
        document.querySelector("#nuevo-apellido").value = empleado.apellido
        document.querySelector("#nuevo-telefono").value = empleado.telefono
        document.querySelector("#nuevo-email").value = empleado.email
        document.querySelector("#nuevo-departamento").value = empleado.departamentoId
        document.querySelector("#nuevo-titulo").value = empleado.titulo
        document.querySelector("#nuevo-sueldo").value = (empleado.sueldo)
        // fechas
        document.querySelector("#nuevo-fecha-nacimiento").value = formatoFecha(empleado.fechaNacimiento)
        document.querySelector("#nuevo-fecha-contratacion").value = formatoFecha(empleado.fechaContratacion)
    }


    // agregar evento de envío al formulario
    formEditarEmpleado.addEventListener("submit", async (event) => {
        event.preventDefault()
        actualizarEmpleado()
    })

    // funcion para actualizar empleado
    const actualizarEmpleado = async () => {
        // obtener los valores del formulario
        const nombre = document.querySelector("#nuevo-nombre").value
        const apellido = document.querySelector("#nuevo-apellido").value
        const fechaNacimiento = document.querySelector("#nuevo-fecha-nacimiento").value
        const telefono = document.querySelector("#nuevo-telefono").value
        const email = document.querySelector("#nuevo-email").value
        const departamentoId = document.querySelector("#nuevo-departamento").value
        const titulo = document.querySelector("#nuevo-titulo").value
        const fechaContratacion = document.querySelector("#nuevo-fecha-contratacion").value
        const sueldo = document.querySelector("#nuevo-sueldo").value

        // crear el objeto empleado
        const empleadoActualizado = {
            nombre,
            apellido,
            fechaNacimiento,
            telefono,
            email,
            departamentoId,
            titulo,
            fechaContratacion,
            sueldo
        }

        // enviar la solicitud PUT a la API
        try {
            await axios.put(`https://empresa-node-api.vercel.app/empleados/${empleadoId}`, empleadoActualizado)
            // redirigir a la página principal
            window.location.href = 'index.html'
        } catch (error) {
            console.error("Error al actualizar empleado: ", error)
        }
    }

    // llamar a la función para obtener los datos del empleado al cargar la página
    if (empleadoId) {
        fetchEmpleado(empleadoId)
    }
})