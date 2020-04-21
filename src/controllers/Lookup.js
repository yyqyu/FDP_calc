"use strict"

const moment = require("moment")
const momentTZ = require('moment-timezone')
const EventEmitter = require("eventemitter3")
const dataTimes = require("../data/times.json")
const {on} = require("../utils/dom")
const aiportsTz=require("../data/airportsTz.json")
const easaFTL = require("../data/easaFTL_83_2014.json")


/**
 * @param {JSON} input_Elements
 * @param {HTMLButtonElement} buttonElement
 */

function Lookup(input_elements,buttonElement){
        this.input_elements = input_elements
        this.events = new EventEmitter()

}

Lookup.prototype.lookupMax=function(){
    
    let departureTz
    for (const airport of aiportsTz){
        if (airport.icao === this.input_elements.dep){
            departureTz=airport.tz
        }
    }
    console.log("departure tz: ",departureTz)
    /**@type {moment}  */
    let checkIn=dataTimes.fdpStartMoment.tz("Europe/Zurich")
    console.log("Check In Time [LT] :",checkIn.format())

    let checkInInt
    checkInInt=checkIn.hour()*60
    checkInInt+=checkIn.minute()
    console.log("checkin as int minutes: ",checkInInt)
    let legs = parseInt(this.input_elements.legs,10)
    
//iterate through easa ftl json to find the maximum flight duty period
//in minutes
    for (const section of easaFTL) {
        if (section.start){
            if (checkInInt>=section.start && checkInInt <=section.end) {
               console.log("section found: ",section)
               for (const values of section.fdp_list) {
                   if (legs===values.max_sectors) {
                       console.log("max fdp [min]: ",values.max_fdp)
                       let maxFDP = values.max_fdp
                       this.events.emit("lookupCompleted",maxFDP)                 
                   }                   
               }
            }
        }      
    }
}

module.exports = Lookup