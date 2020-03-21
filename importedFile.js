exports.impoteredMethod = passedParams => (req, res, next) => {
  try {
    res.status(400).json({
      status: "success",
      passedParams,
      location: "get api with params [impoteredFile/impoteredMethod]",
      data: "N/A"
    });
  } catch (err) {
    res.status(501).json({
      status: "error",
      passedParams,
      location: "get api with params [impoteredFile/impoteredMethod]",
      error: err,
      data: "N/A"
    });
  }
};

exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "Log into your account"
  });
};

exports.loginBtnPressed = (req, res) => {
  try {
      console.log('Success: invoked by pressing Login button [impoteredFile/loginBtnPressed]');
    res.status(200).json({
      status: "success",
      info: "invoked by pressing Login button",
      location: "get api with params [impoteredFile/loginBtnPressed]",
      data: "N/A"
    });
  } catch (err) {
    console.log('Error: invoked by pressing Login button [impoteredFile/loginBtnPressed]');
    res.status(400).json({
      status: "error",
      info: "invoked by pressing Login button",
      location: "get api with params [impoteredFile/loginBtnPressed]",
      error: err,
      data: "N/A"
    });
  }
};
