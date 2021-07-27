//Login and Registration
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController() {
    return {
        login(req, res) {
            return res.render('auth/login')
        },
        postLogin(req, res , next) {

            const { email, password } = req.body
            //Validations
            if (!email || !password) {
                req.flash('error', 'All Fields Are Required!')
                return res.redirect('/')
            }

            passport.authenticate('local',(err , user , info)=>{
                if(err)
                {
                    req.flash('error',info.message)
                    return next(err)
                }
                if(!user)
                {
                    req.flash('error',info.message)
                    return res.redirect('/login')
                }

                req.logIn(user , (err)=>{
                    if(err)
                    {
                        req.flash('error',info.message)
                        return next(err)
                    }
                    return res.redirect('/')
                })
            })(req,res,next)

        },
        register(req, res) {
            return res.render('auth/register')
        },
        async postRegister(req, res) {
            const { name, email, password } = req.body
            //Validations
            if (!name || !email || !password) {
                req.flash('error', 'All Fields Are Required!')
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect('/register')
            }

            //check if email already exists
            User.exists({ email: email }, (err, result) => {
                if (result) {
                    req.flash('error', 'Email Already Registered!')
                    req.flash('name', name)
                    req.flash('email', email)
                    return res.redirect('/register')
                }
            })

            //Hash Password
            const hashedPassword = await bcrypt.hash(password, 10)


            //Create a User
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword
            })

            user.save().then((user) => {

                return res.redirect('/')

            }).catch(err => {
                
                req.flash('error', 'Something Went Wrong!')
                return res.redirect('/register')
            })
        },
        logout(req,res)
        {   
            req.logout()
            return res.redirect('/login')
        }
    }
}

module.exports = authController