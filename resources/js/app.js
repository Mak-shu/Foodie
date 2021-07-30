//client code
import axios from 'axios'
import moment from 'moment'
import Noty from 'noty'
import { initAdmin } from './admin'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(food) {
    //to send request to database toadd the selected food to cart we'll use axios library , we sending data so post request
    axios.post('/update-cart', food).then(function (res) {
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type: 'success',
            timeout: 500,
            text: "Item Added To Cart!",
            progressBar: false
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 500,
            text: "Something Went Wrong!",
            progressBar: false
        }).show();
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let food = JSON.parse(btn.dataset.food)
        updateCart(food)
    })
})

//Remove alert after 1 second
const alertMsg = document.querySelector('#success-alert')
if (alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 1000)
}

//Delivery Status
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
       let dataProp = status.dataset.status
       if(stepCompleted) {
            status.classList.add('step-completed')
       }
       if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
           if(status.nextElementSibling) {
            status.nextElementSibling.classList.add('current')
           }
       }
    })
}

updateStatus(order);

//Socket-Client Side
let socket = io()
initAdmin(socket)
//Join Room
if(order) {
    socket.emit('join', `order_${order._id}`)
}

let adminAreaPath = window.location.pathname
if(adminAreaPath.includes('admin')){
    socket.emit('join','adminRoom')
}

socket.on('orderUpdated' , (data) =>{
    const updatedOrder = { ...order }
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    updateStatus(updatedOrder)
    new Noty({
        type: 'success',
        timeout: 500,
        text: `Order ${updatedOrder.status}`,
        progressBar: false
    }).show();
})