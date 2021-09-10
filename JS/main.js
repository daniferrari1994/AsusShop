

/* -----VARIABLES ----- */


const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}


/* -----EVENTOS Y FUNCIONES ----- */


$(document).ready(function(){
   const cards = $('#cards');
   const items = $('#items');

   if (localStorage.getItem('carrito')) {
      carrito = JSON.parse(localStorage.getItem('carrito'))
      llenarCarrito()
  }

   $(cards).click(function (e){
      addCarrito(e);
   })
   $(items).click(function (e){
      btnAccion(e)
   })

   const addCarrito = e =>{
      if (e.target.classList.contains('btn-dark')){
          setCarrito(e.target.parentElement)
      }
      e.stopPropagation()
   }

   const setCarrito = objeto => {
      const producto ={
          id: objeto.querySelector('.btn-dark').dataset.id,
          name: objeto.querySelector('h5').textContent,
          price: objeto.querySelector('p').textContent,
          cantidad: 1
      }
   
      if(carrito.hasOwnProperty(producto.id)){
          producto.cantidad = carrito[producto.id].cantidad + 1
      }
   
      carrito[producto.id] = {...producto}
      llenarCarrito()
   }

   $('#enviar').click(function(){
      $('#bienvenida').slideUp(1000);
   })

   $('#enviar').click(function(){
      const nombre = $('#nombre').val();
      const apellido = $('#apellido').val();
      $('#feedback').text("Hola " + nombre + " " + apellido);

      const myJSON = {nombre , apellido};
      const myString = JSON.stringify(myJSON);
      localStorage.setItem("myJSON", myString);
   });
   localStorage.getItem('myJSON');
});

const llenarCarrito = () => {
   //console.log(carrito)
   items.innerHTML = ''
   Object.values(carrito).forEach(producto =>{
       templateCarrito.querySelector('th').textContent = producto.id
       templateCarrito.querySelectorAll('td')[0].textContent = producto.name
       templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
       templateCarrito.querySelector('.btn-info').dataset.id = producto.id
       templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
       templateCarrito.querySelector('span').textContent = producto.cantidad * producto.price

       const clone = templateCarrito.cloneNode(true)
       fragment.appendChild(clone)
   })
   items.appendChild(fragment)

   llenarFooter()

   localStorage.setItem('carrito', JSON.stringify(carrito))
}

const llenarFooter = () => {
   footer.innerHTML = ''
   if(Object.keys(carrito).length === 0){
       footer.innerHTML = `<th scope="row" colspan="5">Carrito vacio - comienza a comprar!</th>`

       return
   }

   const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad,0)
   const nPrice = Object.values(carrito).reduce((acc, {cantidad, price}) => acc + cantidad * price,0)

   templateFooter.querySelectorAll('td')[0].textContent = nCantidad
   templateFooter.querySelector('span').textContent = nPrice

   const clone = templateFooter.cloneNode(true)
   fragment.appendChild(clone)
   footer.appendChild(fragment)

   const btnVaciar = document.getElementById('vaciar-carrito')
   btnVaciar.addEventListener('click', () =>{
       carrito = {}
       llenarCarrito()
   })

   const btnComprar = document.getElementById('realizar-compra')
   btnComprar.addEventListener('click', () =>{
      carrito = {}
      llenarCarrito()
   })
}

const btnAccion = e => {
   // AUMENTO DE PRODUCTOS
   if(e.target.classList.contains('btn-info')){
       const producto = carrito[e.target.dataset.id]
       producto.cantidad++
       carrito[e.target.dataset.id] = {...producto}
       llenarCarrito()
   }

   if(e.target.classList.contains('btn-danger')){
       const producto = carrito[e.target.dataset.id]
       producto.cantidad--
       if(producto.cantidad === 0){
           delete carrito[e.target.dataset.id]
       }
       llenarCarrito()
   }

   e.stopPropagation()
}



/* -----ARRAY DE OBJETOS ----- */



let productos = [
    {
       price:95000,
       id:1,
       name:"Radeon RX 5500 XT 8GB",
       image:"images/comp01.jpg"
    },
    {
       price:30750,
       id:2,
       name:"b550-f am4",
       image:"images/comp02.jpg"
    },
    {
       price:54280,
       id:3,
       name:"z590-e gaming wi-fi",
       image:"images/comp03.jpg"
    },
    {
       price:42600,
       id:4,
       name:"LC 240",
       image:"images/comp04.png"
    },
    {
       price:45550,
       id:5,
       name:"THOR 850P 80Plus 850W",
       image:"Images/comp05.png"
    }
 ]

productos.forEach(productos => {
   templateCard.querySelector('h5').textContent = productos.name
   templateCard.querySelector('p').textContent = productos.price
   templateCard.querySelector('img').setAttribute("src", productos.image)
   templateCard.querySelector('.btn-dark').dataset.id = productos.id

   const clone = templateCard.cloneNode(true)
   fragment.appendChild(clone)
})
cards.appendChild(fragment)