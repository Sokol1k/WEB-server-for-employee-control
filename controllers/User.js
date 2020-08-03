const User = require('../models/User')

const destroy = async function (req, res) {
  try {
    await User.deleteOne({ _id: req.user._id })

    res.send({message: "The user has been deleted"})
    
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = {
  destroy
}