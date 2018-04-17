'use strict';

module.exports = function(Payment) {

    Payment.paymentBetweenDates = function(fromDate, toDate, cb) {
        var payments = [];
        var newFromDate = new Date(fromDate);
        var newToDate = new Date(toDate);
        var myJson = require('../../mydata.json').models.Payment;
        Object.keys(myJson).forEach(function(key){
            var obj = JSON.parse(myJson[key]);
            var date = new Date(obj.date);  
            if (date >= newFromDate && date <= newToDate){
                   payments.push(obj);
            } 
        })
        cb(null, payments);   
    }
};   
