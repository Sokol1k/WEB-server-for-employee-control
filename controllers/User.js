const User = require('../models/User')

const destroy = async function (req, res) {
  try {

    const user = await User.deleteOne({ _id: req.user._id })

    if (!user.deletedCount) {
      res.status(400).send({
        message: 'No such user exists!'
      })
    } else {
      res.send({message: "The user has been deleted!"})
    }
    
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = {
  destroy
}