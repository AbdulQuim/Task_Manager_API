const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post("/tasks", auth, async (req, res) => {
    const task = new Task({...req.body, user: req.user._id});
    try {
      await task.save();
      res.status(201).send(task);  
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  router.get("/tasks", auth, async (req, res) => {
    const match = {}
    if(req.query.completed) {
      match.completed = req.query.completed === "true"
    }

    const sort = {}

    if(req.query.sortBy){
      const parts = req.query.sortBy.split(":")
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1
      // if(a[1] === "asc"){
      //   sort[a[0]] = 1
      // }else{
      //   sort[a[0]] = -1
      // }
    }

    try {
      const tasks = await Task.find({
        user: req.user._id
        , ...match
      }, null, {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      })
      res.send(tasks);  
    } catch (error) {
      res.status(500).send();
    }
  });
  
  router.get("/tasks/:id", auth, async (req, res) => {
    try {
      const task = await Task.findOne({_id: req.params.id, user: req.user._id})
      if (!task) {
        return res.status(404).send("Task not found!");
      }
      res.send(task);  
    } catch (error) {
      res.status(500).send();
    }
  });
  
  
  
  router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body) // converting incoming json object keys to an string array.
    const allowedUpdates = ['description', 'completed']
    const booleanCheck = updates.every( update => allowedUpdates.includes(update))
  
    if (!booleanCheck) {
      return res.status(400).send({error: 'Invalid updates!'})
    }
    
    try {
      const task = await Task.findOne({_id: req.params.id, user: req.user._id})
      
      //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
      if (!task) {
        return res.status(404).send("User not found!");
      }

      updates.forEach(update => task[update] = req.body[update])
      await task.save()

        res.send(task); 
    } catch (error) {
      res.status(400).send(error);
    }
      
  })
  
  router.delete('/tasks/:id', auth, async (req, res) => {
    try {
      const task = await Task.findOneAndDelete({_id: req.params.id, user: req.user._id})
      if (!task) {
        return res.status(404).send("Task not found!");
      }
        res.send(task);     
    } catch (error) {
      res.status(400).send(error);
    }
  })

module.exports = router