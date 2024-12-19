import dotenv from 'dotenv'
dotenv.config();
// process.env.MONGO_URI
 
import express from "express";
import cors from "cors";
import foodRouters from "./routers/food.router";
import userRouters from "./routers/user.router";
import { dbConnect } from './congifs/database.config';
import orderRouter from './routers/order.router';
// import { dbConnect } from "./configs/database.config";
dbConnect()

const app = express()
app.use(express.json())
//localhosst:4200;
//localhosst:5000;
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}))
app.use('/api/foods',foodRouters)
app.use('/api/users', userRouters)
app.use('/api/orders', orderRouter)

// app.get("/api/foods",(req,res)=>{
//       res.send(sample_foods)
// })


// app.get('/api/foods/search/:searchTerm',(req,res)=>{
//     const searchTerm = req.params.searchTerm
//     const  foods =sample_foods
//     .filter(food => food.name.toLowerCase()
//     .includes(searchTerm.toLowerCase()) )
//     res.send(foods)
// })

// app.get("/api/foods/tags",(req,res)=>{
//     res.send(sample_tags)
// })

// app.get("/api/foods/tag/:tagName", (req, res) => {
//     const tagName = req.params.tagName;
//     const foods =  sample_foods
//     .filter(food => food.tags?.includes(tagName) )
//     res.send(foods)
//     console.log(foods);
    

// })


// app.get("/api/foods/:foodId",(req,res)=>{
//     const foodId = req.params.foodId
//     const food = sample_foods.find(food => food.id == foodId) 
//     res.send(food)

 
// })


// app.post("/api/users/login", (req, res) => {
//     const { email, password } = req.body;
//     const user = sample_users.find(user => user.email === email &&
//          user.password === password);
    
//     if (user) {
//         res.send(generateTokenResponse(user)); // Generate token and attach it to the user
//       // Send user data with token
//     } else {
//         res.status(401).send({ message: "Invalid credentials" }); // Return error if user not found
//     }
// });

// // Corrected generateTokenResponse function
// const generateTokenResponse = (user: any) => {
//     const token = jwt.sign(
//         { email: user.email, isAdmin: user.isAdmin },
//         'SomeRandomText',
//         { expiresIn: "30d" }
//     );
//     user.token = token; // Add the token to the user object
//     return user; // Return the user with token
// };



const port = 3000;

app.listen(port,()=>{
    console.log("website sevrved on http://localhost:"+ port);
    
})

