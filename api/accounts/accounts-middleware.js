const Account = require("../accounts/accounts-model")

exports.checkAccountPayload = async (req, res, next) => {
    const {name, budget} = req.body
    if(name && budget){
      next();
    }else{
      res.status(400).json({message:"name and budget are required"})
    } 
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId =async (req, res, next) => {
  try{const account = await Account.getById(req.params.id);
    if(account){
      req.account = account
      next()
    }else{
      res.status(404).json({message:"account not found"})
    }
  }catch(err){
    next(err)
  }
}
