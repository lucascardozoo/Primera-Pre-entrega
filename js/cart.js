const cartContainer = document.getElementById("all-products-cart");
const cartEmpty = document.querySelector('#text-cart-empty');
const total = document.querySelector('#total');
const cantidadCart = document.getElementById('count');

// Para parsear lo que este en el Local Stotage
function jsonParseLocalStorage () {
    let toRender = localStorage.getItem("cart");
    return toRender = JSON.parse(toRender);
}

// Para que no se me dublique lo que se renderiza en el carrito y para actualizar a medida que se agregan o eliminan productos
function limpiarHTML () {
    while (cartContainer.firstChild) {
        cartContainer.removeChild(cartContainer.firstChild);
    } 
}

//Para que me muestre el total de productos agregados en el icono del carrito
function sumaCantidadCart () {
    const toRender = jsonParseLocalStorage();
    const cantidadTotalCart = toRender.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    cantidadCart.innerHTML = cantidadTotalCart;
}

//Para que me muestre la suma total de todo el carrito
function sumaTotalCart () {
    const toRender = jsonParseLocalStorage();
    const totalCart = toRender.reduce((acumulador, producto) => acumulador + producto.subtotal, 0);
    total.innerHTML = `Total: $${totalCart}`;
}

//Para renderizar el carrito, sacando los productos del Local Storage, que se agregaros al hacer click en el boton "Agregar al carrito"
function renderCarrito () {
    limpiarHTML();
    const toRender = jsonParseLocalStorage();
    toRender.forEach( item => {
        const cartArticle = document.createElement("article");
        cartArticle.className = "cart-product";
        cartArticle.innerHTML = `
        <figure class="container-img-cart-product">
            <img class="img-cart-product" src="./assets/${item.imagen}" alt="${item.nombre}">
        </figure>
        <h2 class="name-cart-product">${item.nombre}</h2>
        <p class="precio-cart-product">${item.precio}</p>
        <div class="cantidad-cart-product">
            <button id="${item.id}" class="btn-resta" type="button">-</button>
            <span>${item.cantidad}</span>
            <button id="${item.id}" class="btn-suma" type="button">+</button>
        </div>
        <p class="subtotal-cart-product">${item.subtotal}</p>
        <button id="${item.id}" class="btn-remove" type="button">x</button>
        `;
        cartContainer.appendChild(cartArticle);
    })

    sumaCantidadCart();
    sumaTotalCart();
}

//Invoco renderCarrito() pero si no hay nada para renderizar en el Local Storage, se muestra "Carrito vacio"
function showCarritoVacio () {
    const toRender = jsonParseLocalStorage();
    if (!toRender) {
        cartEmpty.style.display = 'block';
    } else {
        renderCarrito();
    }
}
showCarritoVacio();

//Para el boton que dice "Vaciar" en el carrito, borra todo el carrito
function clearCart () {
    const clearButton = document.getElementById("btn-clear");
    clearButton.onclick = () => {
        localStorage.clear();
        cantidadCart.innerHTML = 0;
        total.innerHTML = 'Total: $0';
        limpiarHTML();
        cartEmpty.style.display = 'block';
    }
}
clearCart();

//Para guardar en el Local Storage
function saveProductLocalStorage (toRender) {
    localStorage.setItem('cart', JSON.stringify(toRender));
}

//Para eliminar un producto del carrito
function eliminarProducto (e) {
    if (e.target.classList.contains('btn-remove')) {
        let toRender = jsonParseLocalStorage();
        const productId = parseInt(e.target.id);
        toRender = toRender.filter((product) => product.id !== productId);
        saveProductLocalStorage(toRender);
        renderCarrito();
    }
}
cartContainer.addEventListener('click', eliminarProducto);

//Para sumar o restar la cantidad de cada productos en el carrito
function sumaRestaProduct (e) {
    const btnSuma = document.getElementsByClassName('btn-suma');
    const btnResta = document.getElementsByClassName('btn-resta');

    if (e.target.classList.contains('btn-suma')) {
        let toRender = jsonParseLocalStorage();
        const productId = parseInt(e.target.id);
        toRender.forEach( product => {
            if (product.id === productId) {
                product.cantidad++;
                product.subtotal = product.cantidad * product.precio;
                btnSuma.disabled = false;
            }
        })
        saveProductLocalStorage(toRender);
        renderCarrito();
    }

    if (e.target.classList.contains('btn-resta')) {
        let toRender = jsonParseLocalStorage();
        const productId = parseInt(e.target.id);
        toRender.forEach( product => {
            if (product.cantidad === 0) {
                btnResta.disabled = true;
            } else if (product.id === productId) {
                product.cantidad--;
                product.subtotal = product.cantidad * product.precio;
            }
        })
        saveProductLocalStorage(toRender);
        renderCarrito();
    }
}
cartContainer.addEventListener('click', sumaRestaProduct);