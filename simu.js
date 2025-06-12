
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btn-simular").addEventListener("click", function (e) {
        e.preventDefault();
        calcular_precio();
    });
});

function calcular_precio() {
    const destino = document.getElementById("destino").value;
    const ida = document.getElementById("ida").checked;
    const vuelta = document.getElementById("vuelta").checked;
    const fechaIda = document.getElementById("fecha_ida").value;
    const fechaVuelta = document.getElementById("fecha_vuelta").value;
    const pasajeros = parseInt(document.getElementById("pasajeros").value);

    // Validaciones básicas
    if (!ida && !vuelta) return mostrarResultado("Debes seleccionar IDA o VUELTA");
    if (!fechaIda) return mostrarResultado("Por favor completá la fecha de ida");
    if (vuelta && (!fechaVuelta || new Date(fechaVuelta) <= new Date(fechaIda)))
        return mostrarResultado("La fecha de vuelta debe ser posterior a la de ida");
    if (isNaN(pasajeros) || pasajeros <= 0)
        return mostrarResultado("Ingresá una cantidad válida de pasajeros");

    //////Precios base
    const precios = {
        opcion1: 135000, // BUENOS AIRRES
        opcion2: 120000, // CORDOBA
        opcion3: 210800  // MENDOZA
    };

    let precioBase = precios[destino];
    if (!precioBase) return mostrarResultado("Destino no válido");

    // Cálculo del precios
    let viajes = 0;
    if (ida) viajes++;
    if (vuelta) viajes++;

    let precioFinal = precioBase * viajes * pasajeros * 1.21;

    mostrarResultado(`$${precioFinal.toLocaleString( {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`);
}

function mostrarResultado(texto) {
    const contenedor = document.getElementById("contenedor");
    contenedor.innerText = texto;
}

