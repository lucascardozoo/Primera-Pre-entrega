const productos = [];
let totalGeneral = 0;
let lista = 'Carrito:\n';

const totales = (precio, cantidad) => {
    let total = precio * cantidad;
    totalGeneral += total;

    return total;
}

const addLista = producto => lista += '\nProducto: ' + producto.nombre + ' | Precio: $' + producto.precio + ' | Cantidad: ' + producto.cantidad + ' |   Total: $' +producto.total;

const mostrarLista = () => {
    lista += '\n\nTotal del carrito: $' + totalGeneral;
    console.log(lista);
    alert(lista);
}

function addProducts(contador) {
    const nombre = prompt('Ingrese nombre del producto');
    const precio = parseFloat(prompt('Ingrese precio del producto'));
    const cantidad = parseInt(prompt('Ingrese cantidad del producto'));
    const total = totales(precio, cantidad);

    const producto = {nombre, precio, cantidad, total};
    console.log(producto);
    addLista(producto);

    productos.push(producto);
    if (productos.indexOf(producto) === 0 && productos.indexOf(producto) !== -1) {
        console.log('Se agrego exitosamente un producto al carrito');
        alert('Se agrego exitosamente un producto al carrito');
        for (const producto of productos) {
            console.table(producto);
        }
    } else if (productos.indexOf(producto) === contador && productos.indexOf(producto) !== -1) {
        console.log('Se agrego exitosamente otro producto al carrito');
        alert('Se agrego exitosamente otro producto al carrito');
        for (const producto of productos) {
            console.table(producto);
        }
    }
}

function carrito() {
    let contador = 0;
    let confirmacion = confirm('¿Desea agregar un producto al carrito?');
    while (confirmacion) {
        addProducts(contador);
        contador++;
        confirmacion = confirm('¿Desea agregar otro producto al carrito?');
    }

    mostrarLista();
}

carrito();