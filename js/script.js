//Array de objetos para renderizar los productos que se pueden agregar la carrito
const products = [
    {
        id: 1,
        imagen: "procesador.jpg",
        nombre: "Procesador Intel i5 14400F",
        precio: 319900
    },
    {
        id: 2,
        imagen: "mother.jpg",
        nombre: "Mother ASUS TUF GAMING B660M-PLUS",
        precio: 213750
    },
    {
        id: 3,
        imagen: "placa-de-video.jpg",
        nombre: "Placa de Video MSI GeForce RTX 4080 16GB",
        precio: 1648710
    },
    {
        id: 4,
        imagen: "ram.jpg",
        nombre: "Memoria Team DDR4 16GB (2x8GB) 3200MHz",
        precio: 62300
    },
    {
        id: 5,
        imagen: "disco-m.2.jpg",
        nombre: "Disco SSD M.2 500GB WD_Black 5000MB/s NVMe",
        precio: 69990
    },
    {
        id: 6,
        imagen: "disco-ssd.jpg",
        nombre: "Disco Sólido SSD Kingston 960GB A400 500MB/s",
        precio: 71700
    },
    {
        id: 7,
        imagen: "cooler-cpu.jpg",
        nombre: "Cooler CPU Cooler Master ML360 Water Cooling",
        precio: 235859
    },
    {
        id: 8,
        imagen: "gabinete.jpg",
        nombre: "Gabinete Cooler Master HAF 700",
        precio: 377900
    },
    {
        id: 9,
        imagen: "fuente.jpg",
        nombre: "Fuente Corsair 750W 80 Plus Gold RM750X Full Modular",
        precio: 151990
    },
    {
        id: 10,
        imagen: "monitor.jpg",
        nombre: "Monitor Gamer AOC 27¨",
        precio: 335000
    },
    {
        id: 11,
        imagen: "auriculares.jpg",
        nombre: "Auriculares HyperX Cloud Flight Black Wireless",
        precio: 113000
    },
    {
        id: 12,
        imagen: "teclado.jpg",
        nombre: "Teclado Mecanico HyperX Alloy Elite 2 Switch Red LA",
        precio: 141250
    },
    {
        id: 13,
        imagen: "mouse.jpg",
        nombre: "Mouse Logitech G502 Gaming Hero",
        precio: 79900
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
        <div class="body-product">
            <h2 class="name-card-product">${product.nombre}</h2>
            <p class="precio-card-product">$${product.precio}</p>
            <button id="${product.id}" class="btnAgregarCarrito">Agregar al carrito</button>
        </div>
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