const express = require("express");
const path = require("path");
const mongoose = require('mongoose'); // npm i mongoose

const catchErrorFn = require("./catchErrorFn");
const importedFile = require("./importedFile");
const catchAsync = require("././utils/catchAsync");

console.log("Start: 'singleFile.js'");
console.log("Director Name: ", __dirname);

// Start: Mongoose Atlas connection
const PASSWORD = 'Lmynad1982'
const ATLASPROJECT = 'allaspects';
const DB = `mongodb+srv://lalama:${PASSWORD}@cluster0-51sod.gcp.mongodb.net/${ATLASPROJECT}?retryWrites=true&w=majority`;
//DB Connection String: 'mongodb+srv://lalama:Lmynad1982@cluster0-51sod.gcp.mongodb.net/allaspects?retryWrites=true&w=majority'

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB (Atlas) Connection Successful'));
// End: Mongoose Atlas connection

const app = express(); // express.Router();
app.use(express.json()); // to modify the body of data set as a middleware

app.set("view engine", "pug"); // setting the view/template engine to express
//app.set('views','./views'); // would work but should use, dir variable
app.set("views", path.join(__dirname, "views")); //proper way to define the root directory

// serving static files
// this enables URL access to the folder "public" in the file structure
//app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, "public"))); // much better way to specify a directory setting than above

const getTestTryCatchDiffMethod = (req, res, next) => {
  res.status(200).json({
    status: "success",
    location: "GET api without params [getTest]",
    message: "Try-Catch at a different function"
  });
};

const getMethodEx = (req, res, next) => {
  try {
    //const bodyData = JSON.parse(req.body);
    //console.log(bodyData);
    if (!req.body) {
      req.body.features.forEach(el => {
        console.log("el >> ", el);
      });
    } else {
      console.log("No data in Body");
    }

    res.status(200).json({
      status: "success",
      message: "worked fine!",
      location: "GET api without params  [getMethodEx]"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error,
      location: "GET api without params  [getMethodEx]"
    });
  }

  //next();
};

const getValueByParam = (req, res, next) => {
  try {
    console.log(req.params);

    const id = req.params.id * 1; // dirty js trick to convert to integer

    res.status(200).json({
      status: "success",
      location: "GET api with params [getValueByParam]",
      data: {
        id: req.params.id,
        param1: req.params.param1,
        param2: req.params.param2
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error,
      location: "GET api with params  [getValueByParam]"
    });
  }
};

const postValueByParamByBody = (param1, param2) =>
  catchAsync(async (req, res, next) => {
    res.status(201).json({
      status: "success",
      location: "POST api with params [postValueByParamByBody]",
      params: {
        param1: param1,
        param2: param2
      },
      data: {
        req_body: req.body
      }
    });
  });

// reference to route: "http://127.0.0.1:3000/api/v1/testAspects/overviewStatic"
const getOverviewStatic = catchAsync(async (req, res, next) => {
  res.status(200).render("overviewStatic", {
    title: "Static Single Card example",
    dataPassed: {
      tour_name: "The Forest Hiker",
      tourDesc: "Breathtaking hike through the Canadian Banff National Park",
      area: "Banff, Canada",
      days: 10,
      stops: 3,
      location: "Zion Canyon National Park",
      nextDate: "August 2021",
      difficulty: "Medium",
      participants: 10,
      rating: 3.4,
      tourPic1: "tour-5-2.jpg",
      rate: 297
    }
  }); // this will render the "overviewSingleCardStaticEx.pug" in the browser
});

// reference to route: "http://127.0.0.1:3000/api/v1/testAspects/tourStatic/:slug" ["http://127.0.0.1:3000/api/v1/testAspects/tourStatic/slug_static"]
// to be called by pressing on the "Details" button of overview page
const getTourStatic = catchAsync(async (req, res) => {
  try {
    console.log("getTourStatic - Start");
    //console.log(req.params.slug);
    console.log(res);
    res.status(200).render("tourStaticDynamicData", {
      title: req.params.slug,
      slug: req.params.slug,
      dataPassed: req.body.data
      /*dataPassed: {
        days: 10,
        location: "Zion Canyon National Park",
        nextDate: "August 2021",
        difficulty: "Medium",
        participants: 10,
        rating: 3.4,
        tourPic1: "tour-5-2.jpg"
      }*/
    }); // this will render the "tourStaticDynamicData.pug" in the browser
    console.log("getTourStatic - End");
  } catch (err) {
    console.log("getTourStatic - Error");
    console.log(err);
  }
});

const fillResponseWithData = catchAsync(async (req, res) => {
  console.log("fillResponseWithData - Start");
  try {
    res.status(200).json({
      status: "success",
      location: "get api with params [singleFile/fillResponse]",
      data: req.body.data
    });
  } catch (err) {
    console.log("fillResponseWithData - Error", err);
    res.status(501).json({
      status: "error",
      location: "get api with params [singleFile/fillResponse]",
      error: err,
      data: "N/A"
    });
  }
  console.log("fillResponseWithData - End");
});

/*
app.use((req, res, next) => {
  console.log("Test");

  if (catchErrorFn) console.log("catchErrorFn Not Null");
  next();
});
*/

// [URL: http://127.0.0.1:3000/api/v1/testAspects/importedEx]
// here called method is in "importedFile.js"
app.use(
  "/api/v1/testAspects/importedEx",
  importedFile.impoteredMethod("passedValue")
);

// [URL: http://127.0.0.1:3000/api/v1/testAspects/login]
// calling the "login.pug"
app.use("/api/v1/testAspects/login", importedFile.getLoginForm);

// set to execute from "Login" button but did not work ?????
// but worked when called from "login.js" using "axios"
// [URL: http://127.0.0.1:3000/api/v1/testAspects/loginBtnPressed]
app.use("/api/v1/testAspects/loginBtnPressed", importedFile.loginBtnPressed);

app.route("/api/v1/testAspects/getMethodEx").get(getMethodEx); // [URL: http://127.0.0.1:3000/api/v1/testAspects/getMethodEx]
app
  .route("/api/v1/testAspects/getTestTryCatchDiffMethod")
  .get(getTestTryCatchDiffMethod);
app.route("/api/v1/testAspects/getValueByParam/:id").get(getValueByParam); // [URL: http://127.0.0.1:3000/api/v1/testAspects/getValueByParam?id=12345&param1=value_param1&param2=value_param2]
app
  .route("/api/v1/testAspects/postValueByParamByBody")
  .post(postValueByParamByBody("param1_value", "param2_value"));

app.route("/api/v1/testAspects/overviewStatic").get(getOverviewStatic); // [URL: http://127.0.0.1:3000/api/v1/testAspects/overviewStatic]
app
  .route("/api/v1/testAspects/fillResponseWithData")
  .post(fillResponseWithData); // [URL: http://127.0.0.1:3000/api/v1/testAspects/fillResponseWithData]
app.route("/api/v1/testAspects/tourStaticDynamicData/:slug").get(getTourStatic); // [URL: http://127.0.0.1:3000/api/v1/testAspects/tourStaticDynamicData/slug_static]

app.all("*", (req, res, next) => {
  //next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404)); // this forward to global error handling middleware (??)
  res.status(500).json({
    status: "error",
    message: "No route defined!",
    location: "app.all('*')"
  });
});

// START THE SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App [singelFile.js] running on port ${port}.....`);
});
