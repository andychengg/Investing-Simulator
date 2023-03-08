// quick demo of python stock service 


const getStockInfo = require('./stockService');


getStockInfo(['aapl','goog'], (data)=>{
    console.log(data);
}, ()=>{console.error('error!')});
