"use strict"
require("../scss/index.scss")

const GetInputData = require("./controllers/GetInputData")
const Calculate = require("./controllers/Calculate")
const dataTimes = require("./data/times.json")

const input_data=  {
    "regulation" : document.getElementById("regulationInput").value,
    "tz" : document.getElementById("timezoneInput").value,
    "stdb" : document.getElementById("standbyInput").checked,
    "fdpStartDate" : document.getElementById("fdpstartDateInput").value,
    "fdpStartTime": document.getElementById("fdpstartTimeInput").value,
    "legs" : document.getElementById("legsInput").value,
    "dep" : document.getElementById("departureLocationInput").value,
    "arr" : document.getElementById("arrivalLocationInput").value,
    "split" : document.getElementById("splitdutyInput").checked,
    "splitStart" : document.getElementById("splitdutystartInput").value,
    "splitEnd" : document.getElementById("splitdutyendInput").value,
}

const getInputData = new GetInputData(input_data)

//getInputData.startToLocal()

const calculate = new Calculate(input_data,
    document.getElementById("calculateButton"))

calculate.init()

