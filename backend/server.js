import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.urlencoded())
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/myDB", {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log("DB connected"))

const customerSchema = mongoose.Schema({
    name: String,
    lname:String,
    email:String,
    phone:String
})

const Customer = new mongoose.model("Customer", customerSchema)

app.get("/api/getAll", (req, res) => {
    Customer.find({}, (err, setDetails) => {
        if(err){
            console.log(err)
        } else {
            res.status(200).send(setDetails)
        }
    })
})

app.get("/api/get/:id", async (req, res) => {
    const { id } = req.body
    try{
        const customer = await Customer.findById(req.params.id)
        res.status(200).json(customer)
    }catch(err){
        res.status(500).json(err)
    }
})

app.put('/api/update/:id', async (req, res) => {
    const  id  = req.body.id
    const name = req.body.name
    const lname = req.body.lname
    const email = req.body.email
    const phone = req.body.phone
    console.log(id , name,  lname , email , phone)
    try{
        await Customer.findByIdAndUpdate(req.params.id , {name:name , lname:lname, email:email, phone:phone})
    }catch(err){
        console.log(err)
    }
})

app.post("/api/add", (req, res) => {
    const { name } = req.body
    const { lname } = req.body
    const { email } = req.body
    const { phone } = req.body
    const detail = new Customer({
        name,
        lname,
        email,
        phone
    })
    detail.save( err => {
        if(err){
            console.log(err)
        }
        Customer.find({}, (err, setDetails) => {
            if(err){
                console.log(err)
            } else {
                res.status(200).send(setDetails)
            }
        })
    })
})

app.post("/api/delete", (req, res) => {
    const { id } = req.body
    Customer.deleteOne({ _id: id}, () => {
        Customer.find({}, (err,setDetails) => {
            if(err){
                console.log(err)
            } else {
                res.status(200).send(setDetails)
            }
        })
    })
})

app.listen(5000, () => {
    console.log(`Backend created at 5000`)
})
