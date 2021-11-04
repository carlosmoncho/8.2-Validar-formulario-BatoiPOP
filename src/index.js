'use strict'
renderProducts(products)

const input = document.getElementsByTagName('input');
const select = document.getElementsByTagName('select');

function renderProducts(products){
    products.forEach(element => crearDiv(element))
}

function rendertypesOfFuel(typesOfFuel){
    typesOfFuel.forEach(element => crearTablaFuel(element))
}


document.getElementById('form').addEventListener('submit', (event) => {
    if(!form.checkValidity()) { 
        const fotoinput = document.getElementsByTagName('input')[4];
        var foto = fotoinput.value;
        var allowedExtensions = /(.jpg|.jpeg|.png|.webp)$/i;
    
        if(!allowedExtensions.exec(foto)){
            fotoinput.setCustomValidity('La extension de la imagen no es correcta');
            document.getElementById('errorFoto').innerHTML = input[4].validationMessage
        }else{
            fotoinput.setCustomValidity(' ');
            document.getElementById('errorFoto').innerHTML = input[4].validationMessage
        }
        if(document.getElementById('fuel').value == "....Fuel...."){
            select[0].setCustomValidity('Debes de elegir un fuel');
            document.getElementById('errorFuel').innerHTML = select[0].validationMessage;
        }else{
            select[0].setCustomValidity(' ');
            document.getElementById('errorFuel').innerHTML = select[0].validationMessage;
        }
    
        document.getElementById('errorName').innerHTML = input[0].validationMessage;
        document.getElementById('errorOriginalPrice').innerHTML = input[1].validationMessage;
        document.getElementById('errorDiscountPrice').innerHTML = input[2].validationMessage;
        document.getElementById('errorStars').innerHTML = input[3].validationMessage
        document.getElementById('errorCambio').innerHTML = input[5].validationMessage;
        document.getElementById('errorKm').innerHTML = input[6].validationMessage;
        document.getElementById('errorPolitica').innerHTML = input[7].validationMessage;
    }else{
        let nombre = document.getElementById('name').value;
        let originalPrice = Number(document.getElementById('originalPrice').value)
        let discountPrice =  Number(document.getElementById('discountPrice').value)
        let km =  Number(document.getElementById('km').value)
        let stars =  Number(document.getElementById('stars').value)
        let fuel = Number(document.getElementById('fuel').value) 
        let cambio = document.getElementById('cambio').value
        let img = document.getElementById('foto').value
        let car = {
            name:nombre,
            km:km,
            original_price:originalPrice,
            discount_price:discountPrice,
            stars:stars,
            sale: true,
            fuel:fuel,
            manual_gear:cambio,
            img: img,
        }
        crearDiv(car)
    } 
})

document.getElementById('NuevoCoche').addEventListener('click', function() {
    document.getElementById('Coches').classList.add("hide")
    document.getElementById('Formulario').classList.remove("hide")})

rendertypesOfFuel(typesOfFuel)

document.getElementById('TodosCoches').addEventListener('click', function() {
    document.getElementById('Formulario').classList.add("hide")
    document.getElementById('Coches').classList.remove("hide")})

document.getElementById('name').addEventListener("blur", ( event ) =>{
    document.getElementById('errorName').innerHTML = input[0].validationMessage;
},true);

document.getElementById('originalPrice').addEventListener("blur", (event) =>{
    document.getElementById('errorOriginalPrice').innerHTML = input[1].validationMessage;
}, true);

document.getElementById('discountPrice').addEventListener("blur", (event) => {
    document.getElementById('errorDiscountPrice').innerHTML = input[2].validationMessage;
}, true);

document.getElementById('stars').addEventListener("blur", (event) => {
    document.getElementById('errorStars').innerHTML = input[3].validationMessage
}, true);  

document.getElementById('cambio').addEventListener("blur", (event) => {
    document.getElementById('errorCambio').innerHTML = input[5].validationMessage;
}, true);

document.getElementById('km').addEventListener("blur", (event) => {
    document.getElementById('errorKm').innerHTML = input[6].validationMessage;
}, true);   

document.getElementById('fuel').addEventListener("blur", (event) => {
   document.getElementById('errorFuel').innerHTML = select[0].validationMessage;
}, true); 

document.getElementById('errorPolitica').addEventListener("blur", (event) => {
    document.getElementById('errorPolitica').innerHTML = input[7].validationMessage;
}, true); 

function crearTablaFuel(fuel){
    const select = document.getElementById("fuel")
    let option = document.createElement('option')
    option.value= fuel.id
    option.innerHTML=`${fuel.fuel}`
    select.appendChild(option)
}

function crearDiv(product){
    const divBuscar = document.getElementById('products')
    let newProduct = document.createElement('div')
    newProduct.className=("col mb-5")
    newProduct.innerHTML=`<div class="card h-100">
<!-- Sale badge, sólo si está vendido-->
${aLaVenta(product.sale)}
<!-- Product image-->
<img class="card-img-top" src="${getImg(product.img)}" alt="${product.name}" />
<!-- Product details-->
<div class="card-body p-4">
    <div class="text-center">
        <!-- Product name-->
        <h5 class="fw-bolder">${product.name}</h5>
        <!-- Product reviews, un div bi-star para cada estrella a pintar-->
        <div class="d-flex justify-content-center small text-warning mb-2">
            ${sacarEstrellas(product.stars)}
        </div>
        <!-- Product price-->
        ${precioCoche(product.original_price,product.discount_price)}
        <!-- Product details -->
        <p>
            ${fuel(typesOfFuel,product.fuel).fuel} - 
            ${isManual(product.manual_gear)}
            <br>${product.km.toLocaleString()}km
        </p>
    </div>
</div>
<!-- Product actions-->
<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
    <div class="text-center"><a class="mostrar btn btn-outline-dark mt-auto" href="#">Mostrar</a></div>
</div>
</div>`
divBuscar.appendChild(newProduct)

newProduct.querySelector(".mostrar").addEventListener('click', () => {
        showProduct(product)
    })


}

function showProduct(product){
    console.log(product)
}

function sacarEstrellas(stars){
    let estrellas='';
    for (var i = 0; i < stars; i++) {
       estrellas += '<div class="bi-star-fill"></div>'
     }
    return estrellas
}

function aLaVenta(sale){
    let venta = '';
    if(sale){
        venta='<div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>'
    }
    return venta;
}

function isManual(manual){
    return manual ? 'manual' : 'automatico'

}

function fuel(fuel,id){
    let combustible = fuel.find((item) => item.id == id)
    return combustible
}

function precioCoche(precioOriginal, descuento){
    let precioFinal = '';
    if(descuento){
        precioFinal = '<span class="text-muted text-decoration-line-through">'+toCurrency(precioOriginal)+'</span> - '+toCurrency(descuento)
    }else{
        precioFinal = toCurrency(precioOriginal)
    }
    return precioFinal
}

function toCurrency(precio){
    return precio.toLocaleString()+'€'
}

function getImg(file){
    return file ? 'media/photos/'+file : 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg'
}