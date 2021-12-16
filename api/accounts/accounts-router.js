const express = require("express");
const Account = require("./accounts-model");
const{checkAccountPayload, checkAccountId, checkAccountNameUnique} = require("./accounts-middleware")

const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try{
    const accounts = await Account.getAll()
      res.json(accounts)
  }catch(err){
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  try{
    const account = await Account.getById(req.params.id);
    res.json(account)
  }catch(err){
    next(err)
  } 
});

router.post('/',checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try{
    const newAccount = await Account.create({
      name: req.body.name.trim(),
      budget: req.body.budget
    });
    res.status(201).json(newAccount)
  }catch(err){
    next(err)
  }
});

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  try{
    const updated = await Account.updateById(req.params.id, req.body);
    res.status(200).json(updated) 
  } catch (err){
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try{
    const deletedAccount = await Account.deleteById(req.params.id)
    res.json(deletedAccount)
  }catch(err){
    next(err)
  }
});

module.exports = router;
