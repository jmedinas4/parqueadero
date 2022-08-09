let carro = document.querySelector('#carro');
let moto = document.querySelector('#moto');
let placa = document.querySelector('#placa');
let btnIngresa = document.querySelector('.btn-ingresa');
let btnSalida = document.querySelector('.btn-sale');
let listaCarros = document.querySelector('.vehiculo-lista');
let listaMotos = document.querySelector('.moto-lista');
let precioPagarSpan = document.querySelector('#precio');
let btnTotal = document.querySelector('.btnTotal');
let btnListado = document.querySelector('.btn-listado');


let precioCarro = 86;
let precioMoto = 97;
/*Variables programa
*/
let placas = [];
let seleccionado = 0;
let vehiculos = [];
let motos = [];
let Pagos = [];

/*fechas*/
let horaHtml = document.querySelector('.hora');
let fechaHtml = document.querySelector('.fecha');
let horaob = new Date();
let fechaob = new Date();
let hora = horaob.toLocaleTimeString('en-US');
let fecha = fechaob.toLocaleDateString('en-US');

let actualizarHora = () => {
    horaob = new Date();
    hora = horaob.toLocaleTimeString('en-US');
    horaHtml.innerHTML = hora;
}
actualizarHora();
let intervalo = setInterval(actualizarHora, 1000);

let actualizarFecha = () => {
    fechaob = new Date();
    fecha = fechaob.toLocaleDateString('es-US');
    fechaHtml.innerHTML = fecha;
}
actualizarFecha();
let intervaloF = setInterval(actualizarFecha, 1000);


/*finfechas*/
class Vehiculo {
    constructor(placa, horaEntrada) {
        this.placa = placa;
        this.horaEntrada = horaEntrada;
    }

}





//eventos inicio

carro.addEventListener('click', () => {
    carro.classList.add('bordeado-selected');
    moto.classList.remove('bordeado-selected');
    seleccionado = 1;
});

moto.addEventListener('click', () => {
    carro.classList.remove('bordeado-selected');
    moto.classList.add('bordeado-selected');
    seleccionado = 2;
});

btnIngresa.addEventListener('click', () => {
    if (seleccionado == 0) {
        swal("", 'Por favor seleccione vehiculo.', "warning");
    };
    if (seleccionado == 1) {
        let txt = placa.value.toUpperCase();
        let valido = validarPlacaCarro(txt);
        if (valido) {
            if (vehiculos.length < 20) {
                let nuevoVehiculo = document.createElement("div");
                let botton = document.createElement("button");
                botton.classList.add('btn-listado');
                botton.innerText = 'SALIDA';

                let horario = new Date();
                let carroNuevo = new Vehiculo(txt, horario);
                placas.push(txt);
                vehiculos.push(carroNuevo);
                nuevoVehiculo.classList.add('item');
                nuevoVehiculo.innerText = (vehiculos.indexOf(carroNuevo) + 1) + " - " + txt + "  --   " + carroNuevo.horaEntrada.toLocaleTimeString('en-US');
                nuevoVehiculo.value = txt;
                nuevoVehiculo.dataset.id = vehiculos.indexOf(carroNuevo);
                listaCarros.appendChild(nuevoVehiculo);
                botton.dataset.id = vehiculos.indexOf(carroNuevo);
               
                nuevoVehiculo.appendChild(botton);
                botton.addEventListener('click', () => {
                    console.log(botton.getAttribute("data-id"));
                    listaCarros.removeChild(nuevoVehiculo);
                    let segundosAcumulados = (horaob - carroNuevo.horaEntrada) / 1000;
                    let minutosAcumulados = segundosAcumulados / 60;
                    let precioPagar = (minutosAcumulados * precioCarro);
                    console.log(precioPagar);

                    precioPagar = precioPagar.toFixed();
                    precioPagarSpan.innerHTML = "$ " + precioPagar + " Minutos:" + minutosAcumulados.toFixed(2);
                    vehiculos = vehiculos.filter((carro) => carro.placa != txt);
                    placas = placas.filter((item) => item != txt);
                    swal("", 'El valor a pagar es:$' + precioPagar + " por " + minutosAcumulados.toFixed(2) + " minutos", "success");
                    Pagos.push(precioPagar);
                    
                })

            } else {
                swal('', 'El paking de autos esta lleno.', "info");
            }
        }

    } else {
        if (seleccionado == 2) {
            let txt = placa.value.toUpperCase();
            let valido = validarPlacaMoto(txt);
            if (valido) {
                if (motos.length < 10) {
                    let nuevoVehiculo = document.createElement("div");
                    //boton in
                    let botton = document.createElement("button");
                    botton.classList.add('btn-listado');
                    botton.innerText = 'SALIDA';

                    //boton fin
                    let horario = new Date();
                    let carroNuevo = new Vehiculo(txt, horario);
                    placas.push(txt);
                    motos.push(carroNuevo);
                    nuevoVehiculo.classList.add('item');
                    nuevoVehiculo.innerText = (motos.indexOf(carroNuevo) + 1) + " - " + txt + "  --   " + carroNuevo.horaEntrada.toLocaleTimeString('en-US');
                    nuevoVehiculo.dataset.id = motos.indexOf(carroNuevo);
                    nuevoVehiculo.value = txt;
                    listaMotos.appendChild(nuevoVehiculo);
                    botton.dataset.id = motos.indexOf(carroNuevo);
                    
                    nuevoVehiculo.appendChild(botton);
                    botton.addEventListener('click', () => {
                        console.log(botton.getAttribute("data-id"));
                        listaMotos.removeChild(nuevoVehiculo);
                        let segundosAcumulados = (horaob - carroNuevo.horaEntrada) / 1000;
                        let minutosAcumulados = segundosAcumulados / 60;
                        let precioPagar = (minutosAcumulados * precioCarro);
                        console.log(precioPagar);
    
                        precioPagar = precioPagar.toFixed();
                        precioPagarSpan.innerHTML = "$ " + precioPagar + " Minutos:" + minutosAcumulados.toFixed(2);
                        motos = motos.filter((carro) => carro.placa != txt);
                        placas = placas.filter((item) => item != txt);
                        swal("", 'El valor a pagar es:$' + precioPagar + " por " + minutosAcumulados.toFixed(2) + " minutos", "success");
                        Pagos.push(precioPagar);
                        
                    })
                } else {
                    alert('El paking de autos esta lleno.');
                }
            }
        }
    }


});






btnSalida.addEventListener('click', () => {

    if (seleccionado == 0) {
        swal("", 'Por favor seleccione vehiculo.', "warning");
    } else {

        if (seleccionado == 1) {
            let txt = placa.value.toUpperCase();
            let vehiculoSeleccionado = vehiculos.find(veh => veh.placa == txt);
            let placaEsValida = vehiculoSeleccionado != null && vehiculoSeleccionado != 0 && vehiculoSeleccionado != undefined;

            if (placaEsValida) {
                let segundosAcumulados = (horaob - vehiculoSeleccionado.horaEntrada) / 1000;
                let minutosAcumulados = segundosAcumulados / 60;
                console.log("placa valida:" + placaEsValida);
                let precioPagar = (minutosAcumulados * precioCarro);

                precioPagar = precioPagar.toFixed();

                precioPagarSpan.innerHTML = "$ " + precioPagar + " Minutos:" + minutosAcumulados.toFixed(2);

                /*
                
                Borrarlo d ela lisa            
                */
                let indiceNodo;
                let nodosHijo = listaCarros.childNodes;
                console.log(listaCarros.childNodes);
                /* SAber cual es de la lista
                */
                nodosHijo.forEach((elemento) => {
                    if (elemento.value == txt) {
                        indiceNodo = Array.prototype.indexOf.call(nodosHijo, elemento);
                    }
                });

                let elementoABorrar = listaCarros.childNodes[indiceNodo];
                console.log(elementoABorrar);
                listaCarros.removeChild(elementoABorrar);
                console.log(placas);
                console.log(vehiculos);
                vehiculos = vehiculos.filter((carro) => carro.placa != txt);
                placas = placas.filter((item) => item != txt);
                swal("", 'El valor a pagar es:$' + precioPagar + " por " + minutosAcumulados.toFixed(2) + " minutos", "success");
                Pagos.push(precioPagar);


            } else {
                swal('Error', 'La Placa no existe', 'error');
            }

        } else {
            if (seleccionado == 2) {
                let txt = placa.value.toUpperCase();
                let vehiculoSeleccionado = motos.find(veh => veh.placa == txt);
                let placaEsValida = vehiculoSeleccionado != null && vehiculoSeleccionado != 0 && vehiculoSeleccionado != undefined;

                if (placaEsValida) {
                    let segundosAcumulados = (horaob - vehiculoSeleccionado.horaEntrada) / 1000;
                    let minutosAcumulados = segundosAcumulados / 60;
                    console.log("placa valida:" + placaEsValida);
                    let precioPagar = (minutosAcumulados * precioCarro);

                    precioPagar = precioPagar.toFixed();

                    precioPagarSpan.innerHTML = "$ " + precioPagar + " Minutos:" + minutosAcumulados.toFixed(2);

                    /*
                    
                    Borrarlo d ela lisa            
                    */
                    let indiceNodo;
                    let nodosHijo = listaMotos.childNodes;
                    console.log(listaMotos.childNodes);
                    /* SAber cual es de la lista
                    */
                    nodosHijo.forEach((elemento) => {
                        if (elemento.value == txt) {
                            indiceNodo = Array.prototype.indexOf.call(nodosHijo, elemento);
                        }
                    });

                    let elementoABorrar = listaMotos.childNodes[indiceNodo];
                    console.log(elementoABorrar);
                    listaMotos.removeChild(elementoABorrar);
                    motos = motos.filter((carro) => carro.placa != txt);
                    placas = placas.filter((item) => item != txt);
                    swal("", 'El valor a pagar es:$' + precioPagar + " por " + minutosAcumulados.toFixed(2) + " minutos", "success");
                    Pagos.push(precioPagar);


                } else {
                    swal('Error', 'La Placa no existe', 'error');
                }
            }
        }
    }

});


btnTotal.addEventListener('click', () => {
    let suma = 0;
    Pagos.forEach((e) => suma += parseInt(e));
    swal('Enhorabuena!!', "El dinero recaudado es :" + suma, "success");
})
//eventos fin

function validarPlacaCarro(txt) {
    const patron1 = /^[A-Z]{3}[0-9]{3}$/;
    if (!patron1.test(txt)) {
        swal('', 'Placa invalida, digite nuevamente', "warning");
        return false;
    } else {
        if (placas.includes(txt)) {
            swal('', 'Placa repetida, digite nuevamente', "warning");
        } else {
            return true;
        }

    }

};
function validarPlacaMoto(txt) {
    const patron1 = /^[A-Z]{3}[0-9]{2}[A-Z]{1}/;
    console.log(txt);
    if (!patron1.test(txt)) {
        swal('', 'Placa invalida, digite nuevamente', "warning");
        return false;
    } else {
        if (placas.includes(txt)) {
            swal('', 'Placa repetida, digite nuevamente', "warning");
        } else {
            return true;
        }

    }

};

