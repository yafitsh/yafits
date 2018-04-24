'use strict';

module.exports = function(Payment) {
    Payment.paymentBetweenDates = function(p_date_start, p_date_end, auth_code, tz, office_code, cb) {
        var payments_list = [];
        var filterd_payments_list = [];
        var myJson = require('../../mydata.json').models.Payment;
       
        Object.keys(myJson).forEach(function(key){
            var obj = JSON.parse(myJson[key]);
            if (!tz){  
                var newp_date_start = formatDate(p_date_start);
                var newp_date_end = formatDate(p_date_end);
                var date = formatDate(obj.date);
                if (date >= newp_date_start && date <= newp_date_end && !auth_code){
                    payments_list.push(obj);
                } 
                else if (date >= newp_date_start && date <= newp_date_end && obj.auth_code == auth_code){
                    payments_list.push(obj);
                }
            }
            else if (tz == obj.tz){
                payments_list.push(obj);
            }      
        })

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        var request = require('sync-request');
        var res = request('GET', 'https://192.168.0.111/gov/sb/officeauthorizer/allowedAuthorities?officeCode='+office_code);
        var codeArr = JSON.parse(res.getBody());
        if (codeArr.length != 0){
            for (var i = 0; i < payments_list.length; ++i ){
                if (codeArr.includes(payments_list[i].auth_code)){
                    filterd_payments_list.push(payments_list[i]);
                }
            }
        }   
        cb(null, filterd_payments_list); 
    };

    var formatDate = function(date){
        var dateArr = date.split('-');
        var newDate = new Date(dateArr[2],dateArr[1],dateArr[0]);
        return newDate; 
    }
    
};   



