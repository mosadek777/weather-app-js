// let aa = document.getElementById("aa");
let bgTime = document.getElementById("bgTime");
let cWthr = document.getElementById("cWthr");
let search = document.getElementById("search");
let mawtini = document.getElementById("mawtini")
let elqahira = document.getElementById("elqahira")
let dakhla = document.getElementById("dakhla")
let palas = document.getElementById("palas")
// let clockNow = document.getElementById("clockNow");

let myDate = new Date();

let theTime = myDate.toLocaleTimeString();
// دي عشان تجيب اليوم الي انت عاوزه
let theDay;
let numOfDay;
function getTheDay() {
    if (numOfDay == 1 || numOfDay == 8) {
        theDay = "Monday";
        return theDay;
    } else if (numOfDay == 2 || numOfDay == 9) {
        theDay = "Tuesday";
        return theDay;
    } else if (numOfDay == 3) {
        theDay = "Wednesday";
        return theDay;
    } else if (numOfDay == 4) {
        theDay = "Thursday";
        return theDay;
    } else if (numOfDay == 5) {
        theDay = "Friday";
        return theDay;
    } else if (numOfDay == 6) {
        theDay = "Saturday";
        return theDay;
    } else if (numOfDay == 7) {
        theDay = "Sunday";
        return theDay;
    }
}

// الشرط ده عشان يغير الخلفية على حسب الوقت
if (myDate.getHours() >= 6 && myDate.getHours() <= 17) {
    cWthr.classList.remove("text-white");
    cWthr.classList.add("text-yelow");
    bgTime.classList.remove("bg-imgPm");
    bgTime.classList.add("bg-imgAm");
} else {
    cWthr.classList.remove("text-yelow");
    cWthr.classList.add("text-white");
    bgTime.classList.remove("bg-imgAm");
    bgTime.classList.add("bg-imgPm");
}
// console.log(typeof(myDate.toLocaleTimeString()))
// aa.innerHTML = myDate.getHours();


// ده كود البحث عن المكان
let srchVlu;
search.addEventListener("blur", function () {
    srchVlu = search.value;

// ده عشان لو كتب اسرائيل تحولها لفلسطين
    if ((srchVlu.toLowerCase() == "isr" ||
        srchVlu.toLowerCase() == "isra" ||
        srchVlu.toLowerCase() == "israe" ||
        srchVlu.toLowerCase() == "israel") ||
        (srchVlu.toLowerCase() == "jeru" ||
            srchVlu.toLowerCase() == "jeru" ||
            srchVlu.toLowerCase() == "jerusa" ||
            srchVlu.toLowerCase() == "jerusal" ||
            srchVlu.toLowerCase() == "jerusalem") ||
        (srchVlu.toLowerCase() == "tel a" ||
            srchVlu.toLowerCase() == "tel av" ||
            srchVlu.toLowerCase() == "tel avi" ||
            srchVlu.toLowerCase() == "tel aviv" ||
            srchVlu.toLowerCase() == "tel aviv-" ||
            srchVlu.toLowerCase() == "tel aviv-y" ||
            srchVlu.toLowerCase() == "tel aviv-ya" ||
            srchVlu.toLowerCase() == "tel aviv-yaf" ||
            srchVlu.toLowerCase() == "tel aviv-yafo")) {
               
        srchVlu = "Palestine"; 
        alert(`مفيش دولة بنت كلب اسمها اسرائيل اكيد تقصد فلسطين`)
       

    }
    (async function () {
        await callWthr()
        await callBg()

    })()

})


// الكود ده عشان ينادي على الاي بي اي الخاص بالطقس
let myData;
let curDatat;
let cuntryName;
async function callWthr() {
    myData = await fetch("https://api.weatherapi.com/v1/forecast.json?key=44213cdad8f0471bb79115653211609&q=" + srchVlu + "&days=3&aqi=yes&alerts=yes")
    myData = await myData.json();
    curDatat = myData.current;
    frcstData = myData.forecast;
    cuntryName = myData.location.name;
    //الكود ده عشان لو بحث عن فلسطين تشغل اغنية موطني
    if (cuntryName == "Palestine" || cuntryName == "Ramallah") {
        mawtini.play();
    } else{
        mawtini.pause();
        mawtini.currentTime = 0;
    }
    
    
    
    
    if (cuntryName == "Cairo"||cuntryName == "Giza") {
        elqahira.play();
    } else  {
        elqahira.pause();
        elqahira.currentTime = 0;
    }

    

  
    if (cuntryName == "Dakhla"||cuntryName == "dakhla") {
        dakhla.play();
    } else  {
        dakhla.pause();
        dakhla.currentTime = 0;
    }

    






    // if (cuntryName == "Jerusalem" || cuntryName == "Israel") {
    //     cuntryName = "Palestine";
    // }
    // console.log("myData ===== > " + frcstData.forecastday[0].date)
    // console.log(curDatat)
    // console.log("==========================>" + curDatat.condition.text)
}


// ده عشان ينادي على اي بي اي الصور
let imgCuntry;
async function callBg() {
    myData = await fetch("https://api.unsplash.com/search/photos?page=1&query=" + cuntryName + "&client_id=lrZA9bbQ567UbAbfLvMsrJlp4YOdUDBNiANacRd_tgM")
    myData = await myData.json();
    imgCuntry = myData.results;
    displayCurData();
    displayAllData()
    // displayData();
}


// ده عشان يعرض الطقس الحالي والساعة
function displayCurData() {
    let allDiv = ``;
    allDiv += `
        <div class="text-center py-3 row" id="cWthr">
            <div class="col-md-3 my-4">
                <h2 class="m-none fs-1 fw-bold">Time now</h2>
                <br>
                <h3 id="clockNow">55</h3>
                <p></p>
            </div>
            <div class="col-md-6">
                <p class="m-none fs-5">current weather</p>
                <h2 class="m-none fs-1 fw-bold">${curDatat.feelslike_c}<sup>o</sup>C</h2>
                <img class="m-none fs-5 w-10 m-auto" src="https://${curDatat.condition.icon}">
                <p class="m-none fs-5">${curDatat.condition.text}</p>
                <p class="m-none fs-3 tte fw-bold my-2" >${cuntryName}</p>
                <p id="palas" class='d-flex'></p>
            </div>
        </div> `

    document.getElementById("cWthr").innerHTML = allDiv;
}


// ده عشان يعرض طقس 3 ايام
function displayAllData() {
    let allDiv = ``;
    numOfDay = myDate.getDay();
    for (let i = 0; i < frcstData.forecastday.length; i++) {
        if (i == 0) {
            allDiv += `
            <div class="col-md-4 text-dWhite">
                <div class="w-100"> 
                    <div class="parnt">
                        <img class="w-100 h-100 ops img-fluid" src="${imgCuntry[i].urls.regular}"></img>
                        <div class="overlay py-3">
                            <h4 class="my-2 mb-2">Today</h4>
                            <img class="my-2 w-15 m-auto" src="https://${frcstData.forecastday[i].day.condition.icon}">
                            <p class="my-2 fw-bold">${frcstData.forecastday[i].day.maxtemp_c}<sup>o</sup>C / ${frcstData.forecastday[i].day.mintemp_c}<sup>o</sup>C</p>
                            <p class="mt-4">${curDatat.condition.text}</p>
                        </div>
                    </div>
                </div>
            </div> `
        } else if (i == 1) {
            allDiv += `
            <div class="col-md-4 text-dWhite">
                <div class="w-100"> 
                    <div class="parnt">
                        <img class="w-100 h-100 ops img-fluid" src="${imgCuntry[i].urls.regular}"></img>
                        <div class="overlay py-3">
                            <h4 class="my-2 mb-2">Tomorrow</h4>
                            <img class="my-2 w-15 m-auto" src="https://${frcstData.forecastday[i].day.condition.icon}">
                            <p class="my-2 fw-bold">${frcstData.forecastday[i].day.maxtemp_c}<sup>o</sup>C / ${frcstData.forecastday[i].day.mintemp_c}<sup>o</sup>C</p>
                            <p class="mt-4">${curDatat.condition.text}</p>
                        </div>
                    </div>                    
                </div>
            </div> `
        } else if (i == 2) {
            numOfDay += 2;
            allDiv += `
            <div class="col-md-4 text-dWhite">
                <div class="w-100">
                    <div class="parnt">
                        <img class="w-100 h-100 ops img-fluid" src="${imgCuntry[i].urls.regular}"></img>
                        <div class="overlay py-3">
                            <h4 class="my-2 mb-2">${getTheDay()}</h4>
                            <img class="my-2 w-15 m-auto" src="https://${frcstData.forecastday[i].day.condition.icon}">
                            <p class="my-2 fw-bold">${frcstData.forecastday[i].day.maxtemp_c}<sup>o</sup>C / ${frcstData.forecastday[i].day.mintemp_c}<sup>o</sup>C</p>
                            <p class="mt-4">${curDatat.condition.text}</p>
                        </div>
                    </div>    
                </div>
            </div> `
        }
    }

    document.getElementById("row").innerHTML = allDiv;
}







// let x = "my name is mo sadek and my age 29";
// // let y = JSON.parse(x);
// let y = x.slice(11,21)
// console.log(y);















