'use strict';

module.exports = function(Payment) {
    Payment.getDateOfPayment = function(fromDate, toDate, cb) { 
        var arr = [];
        var newFromDate = new date(fromDate);
        var newToDate = new date(toDate);
        Payment.foreach(function(paymObj){
            var date = new(paymObj.date);     
            if (+date > +newFromDate && +date < +newToDate){
                   arr.push(paymObj);
            } 
        }) 
        cb(null, arr);   
    }

    Payment.remoteMethod('getInfoBetweenDates',{
        description: "Returns the payments info between given dates",
        accept: [{
            arg: 'fromDate',
            type: 'string',
            required: true 
        },
        {
            arg: 'toDate',
            type: 'string',
            required: true
        }],
        http: {
            path: '/:fromDate/:toDate/getPaymentsInfoBetweenDates',
            verb: 'get'
        },
        returns: {
            arg: 'payments',
            type: 'array'
        }
    });
    
};
