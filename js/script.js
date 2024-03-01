// const productos = [];
// let totalGeneral = 0;
// let lista = 'Carrito:\n';

// const totales = (precio, cantidad) => {
//     let total = precio * cantidad;
//     totalGeneral += total;

//     return total;
// }

// const addLista = producto => lista += '\nProducto: ' + producto.nombre + ' | Precio: $' + producto.precio + ' | Cantidad: ' + producto.cantidad + ' |   Total: $' +producto.total;

// const mostrarLista = () => {
//     lista += '\n\nTotal del carrito: $' + totalGeneral;
//     console.log(lista);
//     alert(lista);
// }

// function addProducts(contador) {
//     const nombre = prompt('Ingrese nombre del producto');
//     const precio = parseFloat(prompt('Ingrese precio del producto'));
//     const cantidad = parseInt(prompt('Ingrese cantidad del producto'));
//     const total = totales(precio, cantidad);

//     const producto = {nombre, precio, cantidad, total};
//     console.log(producto);
//     addLista(producto);

//     productos.push(producto);
//     if (productos.indexOf(producto) === 0 && productos.indexOf(producto) !== -1) {
//         console.log('Se agrego exitosamente un producto al carrito');
//         alert('Se agrego exitosamente un producto al carrito');
//         for (const producto of productos) {
//             console.table(producto);
//         }
//     } else if (productos.indexOf(producto) === contador && productos.indexOf(producto) !== -1) {
//         console.log('Se agrego exitosamente otro producto al carrito');
//         alert('Se agrego exitosamente otro producto al carrito');
//         for (const producto of productos) {
//             console.table(producto);
//         }
//     }
// }

// function carrito() {
//     let contador = 0;
//     let confirmacion = confirm('¿Desea agregar un producto al carrito?');
//     while (confirmacion) {
//         addProducts(contador);
//         contador++;
//         confirmacion = confirm('¿Desea agregar otro producto al carrito?');
//     }

//     mostrarLista();
// }

// carrito();


const products = [
    {
        id: 1,
        imagen: "computadora.jpg",
        nombre: "Computadora 1",
        precio: 300000
    },
    {
        id: 2,
        imagen: "computadora.jpg",
        nombre: "Computadora 2",
        precio: 400000
    },
    {
        id: 3,
        imagen: "computadora.jpg",
        nombre: "Computadora 3",
        precio: 500000
    },
    {
        id: 4,
        imagen: "computadora.jpg",
        nombre: "Computadora 4",
        precio: 600000
    },
    {
        id: 5,
        imagen: "computadora.jpg",
        nombre: "Computadora 5",
        precio: 700000
    },
    {
        id: 6,
        imagen: "computadora.jpg",
        nombre: "Computadora 6",
        precio: 800000
    },
    {
        id: 7,
        imagen: "computadora.jpg",
        nombre: "Computadora 7",
        precio: 900000
    },
    {
        id: 8,
        imagen: "computadora.jpg",
        nombre: "Computadora 8",
        precio: 1000000
    },
    {
        id: 9,
        imagen: "computadora.jpg",
        nombre: "Computadora 9",
        precio: 1100000
    },
]

class product {
    constructor (id, imagen, nombre, precio) {
        this.id = id;
        this.imagen = imagen;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = 1;
        this.subtotal = 0;
    }
    
    calcularSubTotal() {
        this.subtotal = this.precio * this.cantidad;
    }
}

let cart;
let cartLS = localStorage.getItem("cart");
if(cartLS) {
    cart = JSON.parse(cartLS);
} else {
    cart = [];
}

const containerProducts = document.getElementById('container-products');
const cartContainer = document.getElementById("all-products-cart");

function addToCardButton () {
    const addButton = document.querySelectorAll(".btnAgregarCarrito");
    addButton.forEach(button => {
        button.onclick = (e) => {
            const productId = e.target.id;
            if (cart.some(product => product.id == productId)) {
                cart.forEach( product => {
                    if (product.id == productId) {
                        product.cantidad++;
                        product.calcularSubTotal()
                    }
                })
                localStorage.setItem('cart', JSON.stringify(cart));
                console.log(cart)
            } else {
                const searchProduct = products.find( product => product.id == productId);
                const productToCart = new product (searchProduct.id, searchProduct.imagen, searchProduct.nombre, searchProduct.precio);
                productToCart.calcularSubTotal();
                
                cart.push(productToCart);
                localStorage.setItem('cart', JSON.stringify(cart));
                console.log(cart)
            }          
        }
    })
}

function renderProducts () {
    products.forEach( product => {
        const article = document.createElement("article");
        article.className = "product";
        article.innerHTML = `
        <figure>
            <img class="img-card-product" src="./assets/${product.imagen}" alt="${product.nombre}">
        </figure>
        <h2 class="name-card-product">${product.nombre}</h2>
        <p class="precio-card-product">$${product.precio}</p>
        <button id="${product.id}" class="btnAgregarCarrito">Agregar al carrito</button>
        `;
        containerProducts.appendChild(article);
    })

    addToCardButton();
    
}

renderProducts();