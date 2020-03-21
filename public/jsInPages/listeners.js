// called from the listner function
const login = async (email, password) => {
  console.log(
    "listeners.js/login >> ",
    "email >> ",
    email,
    " / password >> ",
    password
  );

  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:3000/api/v1/testAspects/loginBtnPressed",
      data: {
        email: email,
        password: password
      }
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

// to reference
const tourDtl = async tourName => {
  console.log("listeners.js/tourDtl >> ", "tourName >> ", tourName);
  try {
    const res = await axios({
      method: "POST", // use of "GET" does not support "data" part of it
      url: `http://127.0.0.1:3000/api/v1/testAspects/fillResponseWithData`,
      data: {
        tour_name: "X-The Rain Forest Hiker",
        tourDesc: "X-Breathtaking hike through the Canadian Banff National Park",
        area: "Banff, Canada",
        days: 10,
        stops: 3,
        location: "Montreal National Park",
        nextDate: "August 2021",
        difficulty: "Medium",
        participants: 10,
        rating: 3.4,
        tourPic1: "tour-5-2.jpg",
        rate: 297
      }
    });

    // format of the response received is modified by the AXIOS, hence below log-ins
    console.log("status >> ",res.data.status);
    console.log("data >> ",res.config.data);
    
    //res.locals.dataPassed = res.config.data;
    
    window.setTimeout(() => {
      location.assign(
        "/api/v1/testAspects/tourStaticDynamicData/slug_static454"
      );
    }, 1500);

  } catch (err) {
    console.log(err);
  }
};

var el = document.querySelector(".form");
if (el) {
  el.addEventListener(
    "submit",
    e => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      login(email, password);
    },
    false
  );
}

var elm = document.getElementById("anchorDtl");
if (elm) {
  elm.addEventListener(
    "click",
    e => {
      const cardTourName = document.getElementById("cardTourName").innerHTML;
      //console.log("cardTourName: ", cardTourName);
      tourDtl(cardTourName);
    },
    false
  );
}

/*document.querySelector(".form").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
});

// does not work when there is an actual "href" value w.r.t. element
document.getElementById("anchorDtl").addEventListener("click", e => {
  console.log("XXXXXX");
  const cardTourName = document.getElementById("cardTourName").innerHTML;
  console.log("cardTourName: ", cardTourName);
});*/
