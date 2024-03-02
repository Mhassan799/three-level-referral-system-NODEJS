const userModel = require('../model/userModel')
const bcrypt = require('bcryptjs')


const userController = {
    async register(req, res) {
        try {
            const { email, referByCode } = req.body;



            const checkExistingUser = await userModel.findOne({ email })
            console.log('checkExistingUser:', checkExistingUser)
            if (checkExistingUser) {
                return res.status(400).send({
                    success: false,
                    message: "this user already exist"
                })
            }

            if (!referByCode) {
                const refar = Math.floor(1000 + Math.random() * 9000);
                console.log('refar:', refar)

                const newUser = new userModel({

                    email, refralCode: refar


                })
                await newUser.save()
                return res.status(201).send({
                    success: true,
                    message: "user registered succesfully "
                })
            }
            if (referByCode) {
                const refar = Math.floor(1000 + Math.random() * 9000);
                console.log('refar:', refar)


                const newUser = new userModel({

                    email,
                    refralCode: refar,
                    referByCode

                })
                await newUser.save()
                return res.status(201).send({
                    success: true,
                    message: "user registered succesfully "
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).send({
                success: false,
                message: "something went wrong while registering a user",
                error: error.message
            })
        }
    },


    // login user constroller



    async getAllUsers(req, res) {
        try {
            // const id = req.query.id

            const users = await userModel.find()

            let data = []

            const myData = [{
                key1: 1
            }]


            users.forEach((obj) => {
                // data.unshift({...obj._doc, level2: 420})

                obj._doc["level2"] = 2321321;
                console.log("obj", {...obj});
                

            })
            // data[0].LEVEL = 420
            myData.forEach((obj) => {
                obj.level2 = 2321321;
            })
            console.log('users:', data)
            console.log('DEMO', myData)
            res.status(200).send({
                success: true,
                message: "user got succesfully",
                users,
                // checkCode
            })
        } catch (error) {
            console.log(error)
            res.status(401).send({
                success: false,
                message: "something went wrong",
                error: error.message
            })
        }
    },

    async getSingleUser(req, res) {
        try {
            const refralCode = req.query.refralCode
            let user = await userModel.find({ referByCode: refralCode })
            console.log('user',user)
            if (!user) {
             return   res.status(400).send({
                    success: false,
                    message: "no user found"
                })
            }
        


            let c = {}
            async function fetchRefreal(limit, i = 0) {
                if (i < limit) {
                    c = user[i]
                    console.log("c", c);
                    console.log('c',{...c})
                    
                    let codes = c?.refralCode
                    let email = c?.email
                    console.log('email:', email)
                    console.log('code:', codes)
                    // let refArray = []
                    console.log('level 2arha h ')
                    
                    const refUsers = await userModel.find({ referByCode: codes })
                    console.log('refered user:', refUsers)
                    
                    
                //    let b= c.level2 
                    user[i]._doc.level_2 = refUsers;
                    console.log('ID',c)
                    
                 
                    async function fetchReferal2(range, j =0){
                        if(j < range){
                            let d= refUsers[j]
                            console.log('dd',d)
                            // console.log('ddddddd',{...d})
    
                            let code = d?.refralCode;
                            let email = d?.email
                                console.log('level 3 arha h ')
    
                            console.log('email2:', email)
                            console.log('code2:', code)
    
    
                            const refUsers2 = await userModel.find({ referByCode: code })
                             console.log('refered user 2:', refUsers2)
    
                            if(refUsers){
                             refUsers[j]._doc.level_3=refUsers2
                            console.log('ID2',d)
                            await fetchReferal2(range, j+1)
                            }

                        }else{
                            // return res.json({refUsers})
                            //  res.status(201).send({
                            //     success: true,
                            //     message: "user got succesfully 222",
                            //     refUsers
                            // })
                            await fetchRefreal(limit, i + 1)
                        }
    
                }
                   await fetchReferal2(refUsers.length)
                
                }
                else {
                    
                    return res.status(200).json({
                        success: true,
                        message: "user got succesfully 222",
                        user
                    })
                }
                // await fetchRefreal(limit, i + 1)

               
            }




            // fetchedReferedUsers(user.length)
       fetchRefreal(user.length)

           
            

        } 
        
        catch (error) {
            console.log(error)
            res.status(401).send({
                success: false,
                message: "something went wrong",
                error: error.message
            })
        }
    }
}

module.exports = userController;