const User = require("../models/User")

const handleErrors = (err) => {
  console.log(err.message, err.code)

  let errors = {email: '', password: ''};

  if(err.code === 11000) {
    errors.email = "this user already exists"
  }

  if(err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message; 
    })
  }
  return errors;
}


module.exports.signup_get = (req, res) => {
  res.render("signup");
}

module.exports.login_get = (req, res) => {
  res.render("login");
}


module.exports.logout_get = (req, res) => {
  res.render("logout");
}


module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    console.log(user);
    res.status(201).json(user);

  } catch (error) {
    const errorMessage = handleErrors(error)
    res.status(400).json(errorMessage)
  }
}

module.exports.login_post = (req, res) => {
  res.send("login")
}

module.exports.logout_post = (req, res) => {
  res.send("helloo")
}

