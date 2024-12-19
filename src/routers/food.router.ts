import { Router } from "express"
import { sample_foods, sample_tags } from "../data"
import asynceHandeler from 'express-async-handler'
import { FoodModel } from "../models/food.model"

const router = Router()

router.get("/seed",asynceHandeler(
  async (req, res)=>{
    const foodsCount = await FoodModel.countDocuments()
    if(foodsCount>0){
      res.send("Seed is already done")
      return
    }
    await FoodModel.insertMany(sample_foods)
    res.send("Seed is done")
  }
))


router.get("/", asynceHandeler(
  async(req,res)=>{
    const foods = await FoodModel.find();
      res.send(foods)
  }
))


router.get('/search/:searchTerm',asynceHandeler(
  async (req,res)=>{
    const searchRegex = new RegExp(req.params.searchTerm,'i')
   const foods = await FoodModel.find({name:{$regex:searchRegex}})
    res.send(foods)
  }
))
// router.get('/search/:searchTerm',(req,res)=>{
//   const searchTerm = req.params.searchTerm
//   const  foods =sample_foods
//   .filter(food => food.name.toLowerCase()
//   .includes(searchTerm.toLowerCase()) )
//   res.send(foods)
// })

// router.get("/tags",(req,res)=>{
//   res.send(sample_tags)
// })
router.get("/tags", asynceHandeler(async (req, res) => {
  // Aggregating tags
  const tags = await FoodModel.aggregate([
      {
          $unwind: '$tags'
      },
      {
          $group: {
              _id: '$tags',
              count: { $sum: 1 }
          }
      },
      {
          $project: {
              _id: 0,
              name: '$_id',
              count: '$count'
          }
      },
      { 
          $sort: { count: -1 }
      }
  ]);

  // Creating "All" entry with the total count of documents
  const all = {
      name: 'All',
      count: await FoodModel.countDocuments()
  };

  // Adding "All" at the beginning of the tags array
  tags.unshift(all);

  // Sending the response with the tags array
  res.send(tags);
}));


router.get("/tags/:tagName", asynceHandeler(
  async (req, res) => {
  const foods = await FoodModel.find({ tags: req.params.tagName });
  res.send(foods);
}))


router .get("/:foodId",asynceHandeler(
  async(req,res)=>{
    const foods = await FoodModel.findById(req.params.foodId)
 
    res.send(foods)
  
  
  }
))

export default router