const Menu = require('../../models/menu')
function homeController()
{
    return{
        async index(req,res)
        {   
            const food = await Menu.find()
            return res.render('home' , {food: food})
            
            // Menu.find().then(function(men){
            //     console.log(men)
            //     return res.render('home' , {men: men})
            // })  
        }
    }
}

module.exports = homeController         //whenever called , it will return us the return part of the homeController function