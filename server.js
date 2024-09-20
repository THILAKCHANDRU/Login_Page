const express =  require('express')
const db = require("./db.js")
const app =  express()
const path = require('path')
const PORT = process.env.PORT || 3000;
app.use(express.json())


app.get('/',async (req,res)=>{
    try{
        await db.query(`create table if not exists loginfo (username varchar(255) primary key ,  password varchar(255) not null)`);
        res.status(200).send("super da bunda")
    }
    catch(err){
        console.log(err)
    }
})


app.post('/bla',async(req,res)=>{
    console.log(req.body);
    const {username , password}=req.body;

    if (username!="" && password!="") {
        try{
            await db.query("insert into loginfo(username,password) values(?,?)",[username,password]);
            res.status(200).send({LOG:"user created successfully"})
        }
        catch(err){
            console.log(err);
            res.status(500).send("Internal server error!!")
        }
    } 

    else{
        res.status(400).send("Bad request!!")
    }
})

app.listen(PORT,()=>{console.log(`Server Running successfully in ${PORT}`)})