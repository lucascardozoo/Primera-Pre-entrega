let storageProducts = localStorage.getItem("cart");
storageProducts = JSON.parse(storageProducts);
const cartContainer = document.getElementById("all-products-cart");

function renderCarrito (toRender) {
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
        <p class="subtotal-cart-product">${ item.subtotal}</p>
        <button class="btn-remove" type="button">x</button>
        `;
        cartContainer.appendChild(cartArticle);
    })
}

renderCarrito(storageProducts);