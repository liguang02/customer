const express = require('express')
const Customer = require('../models/CustomerModel')
const router = express.Router()
const mongoose = require('mongoose')

//Get all customers
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find({}).sort({createdAt: -1}); // Wait for the database query to complete
        res.status(200).json(customers); // Send the resolved data as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message }); // Handle errors properly
    }
});

//Get a single customer
router.get('/:id', async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid id'})
    }
    const customer = await Customer.findById(id)

    if(!customer){
        return res.status(404).json({error: 'Customer not found'})
    }
    res.status(200).json(customer)
})

//Post a new customer
router.post('/', async (req, res) => {
    console.log(req.body)
    const {name, icNumber, dateOfBirth, address, addressCountry, addressPostcode} = req.body

    try {
        const customer = await Customer.create({name, icNumber, dateOfBirth, address, addressCountry, addressPostcode})
        res.status(200).json(customer)
    }catch(error){
        res.status(400).json({error: error.message})
    }
})

//Update a customer
router.put('/:id', async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid id'})
    }

    const customer = await Customer.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if(!customer){
        return res.status(404).json({error: 'Customer not found'})
    }
    
    res.status(200).json(customer)
})
module.exports = router