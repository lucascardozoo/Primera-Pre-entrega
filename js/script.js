//Array de objetos para renderizar los productos que se pueden agregar la carrito
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

//Para instanciar los productos que se agregan al carrito
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

const containerProducts = document.getElementById('container-products');
const cantidadCart = document.getElementById('count');
const inputNombre = document.querySelector('#user-name');
const btnSaludo = document.querySelector('#btn-saludo');
const textSaludo = document.querySelector('#saludo');

//Para que no perder info de los productos agregados, tambien para no perder la cantidad total que se ve el icono del carrito
let cart;
let cartLS = localStorage.getItem("cart");
if(cartLS) {
    cart = JSON.parse(cartLS);
    cantidadCart.innerHTML = cart.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
} else {
    cart = [];
}

//Si existe un nombre en Local Storage lo recupera y saluda
function recuperoNombreDeLS () {
    let nombre = localStorage.getItem("nombre");
    if (nombre) {
        textSaludo.innerHTML = `Hola ${nombre}`;
    }
}
recuperoNombreDeLS();

//Para guardar en el Local Storage
function saveProductLocalStorage () {
    localStorage.setItem('cart', JSON.stringify(cart));
}

//Para que me muestre el total de productos agregados en el icono del carrito
function sumaCantidadCart () {
    let cantidadTotalCart = cart.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    cantidadCart.innerHTML = cantidadTotalCart;
}

//Botones para agregar al carrito o sumar uno a la cantidad del producto si ya existe y guardar en el Local Storage
function addToCardButton () {
    const addButton = document.querySelectorAll(".btnAgregarCarrito");
    addButton.forEach(button => {
        button.onclick = (e) => {
            const productId = e.target.id;
            if (cart.some(product => product.id == productId)) {
                cart.forEach( product => {
                    if (product.id == productId) {
                        product.cantidad++;
                        product.subtotal = product.cantidad * product.precio;
                    }
                })
                saveProductLocalStorage();
            } else {
                const searchProduct = products.find( product => product.id == productId);
                const productToCart = new product (searchProduct.id, searchProduct.imagen, searchProduct.nombre, searchProduct.precio);
                productToCart.calcularSubTotal();
                
                cart.push(productToCart);
                saveProductLocalStorage();
            }
            sumaCantidadCart();   
        }
    })
}

//Para renderizar productos que se pueden agregar al carrito, renderiza el array de objetos "products" creado con anteriroidad
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

btnSaludo.onclick = () => {
    if (inputNombre.value) {
        textSaludo.innerHTML = `Hola ${inputNombre.value}`
        localStorage.setItem('nombre', inputNombre.value);
    } else {
        textSaludo.innerText = "Debe ingresar su nombre";
    }
}