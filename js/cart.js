const cartContainer = document.getElementById("all-products-cart");
const cartEmpty = document.querySelector('#text-cart-empty');
const total = document.querySelector('#total');
const cantidadCart = document.getElementById('count');

function jsonParseLocalStorage () {
    let toRender = localStorage.getItem("cart");
    return toRender = JSON.parse(toRender);
}

function limpiarHTML () {
    while (cartContainer.firstChild) {
        cartContainer.removeChild(cartContainer.firstChild);
    } 
}

function sumaCantidadCart () {
    const toRender = jsonParseLocalStorage()
    const cantidadTotalCart = toRender.reduce((acumulador, producto) => acumulador + producto.cantidad, 0)
    cantidadCart.innerHTML = cantidadTotalCart;
}

function sumaTotalCart () {
    const toRender = jsonParseLocalStorage()
    const totalCart = toRender.reduce((acumulador, producto) => acumulador + producto.subtotal, 0)
    total.innerHTML = `Total: $${totalCart}`;
}

if (!localStorage.getItem('cart')) {
    limpiarHTML();
    cartEmpty.style.display = 'block';
}

function renderCarrito () {
    limpiarHTML();
    const toRender = jsonParseLocalStorage()
    toRender.forEach( item => {
        const cartArticle = document.createElement("article");
        cartArticle.className = "cart-product";
        cartArticle.innerHTML = `
        <figure class="container-img-cart-product">
            <img class="img-cart-product" src="./assets/${ item.imagen}" alt="${ item.nombre}">
        </figure>
        <h2 class="name-cart-product">${ item.nombre}</h2>
        <p class="precio-cart-product">$${ item.precio}</p>
        <p class="cantidad-cart-product">${ item.cantidad}</p>
        <p class="subtotal-cart-product">$${ item.subtotal}</p>
        <button id="${item.id}" class="btn-remove" type="button">x</button>
        `;

        cartContainer.appendChild(cartArticle);
    })

    sumaCantidadCart();
    sumaTotalCart();

    if (toRender.length == 0) {
        cartEmpty.style.display = 'block';
    }
    
}

renderCarrito();

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
clearCart()

function saveProductLocalStorage (toRender) {
    localStorage.setItem('cart', JSON.stringify(toRender));
}

function eliminarProducto (e) {
    if (e.target.classList.contains('btn-remove')) {
        let toRender = jsonParseLocalStorage()
        const productId = parseInt(e.target.id);
        toRender = toRender.filter((product) => product.id !== productId);
        saveProductLocalStorage(toRender);
        console.log(toRender)
        renderCarrito()
    }
}

cartContainer.addEventListener('click', eliminarProducto);