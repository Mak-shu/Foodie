//client code
import axios from 'axios'
import Noty from 'noty'

let addToCart = document.querySelectorAll('.add-to-cart')  
let cartCounter = document.querySelector('#cartCounter')

function updateCart(food)
{
    //to send request to database toadd the selected food to cart we'll use axios library , we sending data so post request
    axios.post('/update-cart', food).then(function(res){
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type : 'success',
            timeout: 500,
            text: "Item Added To Cart!",
            progressBar : false
          }).show();
    }).catch(err => {
        new Noty({
            type : 'error',
            timeout: 500,
            text: "Something Went Wrong!",
            progressBar : false
          }).show();
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click' , (e) =>{
        let food = JSON.parse(btn.dataset.food)
        updateCart(food)
    })
})
