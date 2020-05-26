const express = require('express');
const morgan = require('morgan'); //HTTP request logger middleware

const tourRouter = require('./routes/tourRoutes'); //.js uzantısı vermeye gerek yok
const userRouter = require('./routes/userRoutes');

// app adında ve express'in tüm özelliklerine sahip bir değişken tanımladık
const app = express();

/** 1. MIDDLEWARES *************************************************************************************************/
//3rd party middleware
app.use(morgan('dev')); //dev, tiny, ...

//middleware. request ile response arasında birşeyler yapılacak
app.use(express.json()); //parse data from http body

//genelde iki parametre kullanılır. ilki "req", ikincisi "res". üçüncü bir parametre kullanıldığında
//ismi ne olursa olsun bu middleware tanımladığımız anlamına geliyor. Standart olması ve anlaşılması
//için request(req), response(res), element(el), (next) gibi isimler kullanılıyor.
// GLOBAL MIDDLEWARE
app.use((req, res, next) => {
  //console.log('TEST: Hello from the middleware :)');
  next(); //eğer bu kullanılmazsa uygulama çakılır (o noktada kalır). Middleware kullanılırsa next() mutlaka olacak
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.requestTime);
  next();
});

/** 2. MOUNT ROUTES ************************************************************************************************/
app.use('/api/v1/tours', tourRouter); //tourRouter middleware'i app'e bağlar. tourRouter sadece "api/v1/tours" isteğinde çalışır
app.use('/api/v1/users', userRouter); // app.use kullanılmasının nedeni bu middleware'leri uygulamaya bağlamak için.

/** 3. START SERVER ************************************************************************************************/
module.exports = app;
