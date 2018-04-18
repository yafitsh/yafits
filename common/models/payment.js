'use strict';

module.exports = function(Payment) {

    Payment.paymentBetweenDates = function(p_date_start, p_date_end, cb) {
        var payments_list = [];
        var newp_date_start = formatDate(p_date_start);
        var newp_date_end = formatDate(p_date_end);
        var myJson = require('../../mydata.json').models.Payment;
        Object.keys(myJson).forEach(function(key){
            var obj = JSON.parse(myJson[key]);
            var date = formatDate(obj.date);  
            if (date >= newp_date_start && date <= newp_date_end){
                payments_list.push(obj);
            } 
        })
        cb(null, payments_list);   
    };


    var formatDate = function(date){
        var dateArr = date.split('-');
        var newDate = new Date(dateArr[2],dateArr[1],dateArr[0]);
        return newDate; 
    } 
};   
