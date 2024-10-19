// Seleccionar elementos importantes
const botonesAgregar = document.querySelectorAll('.add-cart');
const listaCarrito = document.getElementById('lista-carrito');
const totalElemento = document.getElementById('total');
let totalCarrito = 0;

// Función para añadir productos al carrito
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', () => {
        const precio = parseFloat(boton.getAttribute('data-precio'));
        const nombreProducto = boton.parentElement.querySelector('h3').textContent;

        // Crear un nuevo elemento de lista para el carrito
        const itemCarrito = document.createElement('li');
        itemCarrito.textContent = `${nombreProducto} - $${precio.toFixed(2)}`;
        listaCarrito.appendChild(itemCarrito);

        // Actualizar el total del carrito
        totalCarrito += precio;
        totalElemento.textContent = `Total: $${totalCarrito.toFixed(2)}`;
    });
});

// Finalizar compra (redirige a la pestaña de pago)
document.getElementById('pagar').addEventListener('click', () => {
    if (totalCarrito > 0) {
        // Ocultar el carrito y mostrar la sección de pago
        document.getElementById('carrito').style.display = 'none';
        document.getElementById('pago').style.display = 'block';

        // Mostrar el monto total a pagar
        document.getElementById('monto-a-pagar').textContent = `Total a pagar: $${totalCarrito.toFixed(2)}`;
    } else {
        alert('El carrito está vacío.');
    }
});

// Confirmar el pago y pedir información adicional
document.getElementById('confirmar-pago').addEventListener('click', () => {
    const metodoPago = document.getElementById('metodo-pago').value;

    if (metodoPago === 'tarjeta') {
        // Solicitar datos de la tarjeta
        const numeroTarjeta = prompt('Ingresa el número de tu tarjeta (16 dígitos):');
        const fechaExpiracion = prompt('Ingresa la fecha de expiración (MM/AA):');
        const cvv = prompt('Ingresa el CVV (3 dígitos):');

        if (numeroTarjeta && fechaExpiracion && cvv) {
            alert(`Pago exitoso con tarjeta: \nTotal: $${totalCarrito.toFixed(2)}. \nGracias por tu compra!`);
        } else {
            alert('Faltan datos de la tarjeta.');
            return; // No continuar si faltan datos
        }
    } else if (metodoPago === 'efectivo') {
        // Solicitar el monto de dinero y calcular el cambio
        const dineroEntregado = parseFloat(prompt('Ingresa la cantidad de dinero entregada:'));
        if (dineroEntregado >= totalCarrito) {
            const cambio = dineroEntregado - totalCarrito;
            alert(`Pago en efectivo exitoso. \nTotal: $${totalCarrito.toFixed(2)}. \nCambio: $${cambio.toFixed(2)}. \nGracias por tu compra!`);
        } else {
            alert('El dinero entregado no es suficiente.');
            return; // No continuar si el dinero es insuficiente
        }
    } else {
        // Si selecciona transferencia
        alert(`Pago exitoso por ${metodoPago}. \nTotal: $${totalCarrito.toFixed(2)}. \nGracias por tu compra!`);
    }

    // Imprimir el ticket
    let ticket = '--- Ticket de Compra ---\n';
    const items = listaCarrito.querySelectorAll('li');
    items.forEach(item => {
        ticket += `${item.textContent}\n`;
    });
    ticket += `Total: $${totalCarrito.toFixed(2)}\n`;
    ticket += `Método de Pago: ${metodoPago}\n`;
    ticket += 'Gracias por su compra!';

    console.log(ticket); // Aquí puedes imprimirlo o guardarlo

    // Reiniciar el carrito
    listaCarrito.innerHTML = '';
    totalCarrito = 0;
    totalElemento.textContent = 'Total: $0.00';

    // Regresar a la vista del carrito
    document.getElementById('carrito').style.display = 'block';
    document.getElementById('pago').style.display = 'none';
});
