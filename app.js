

const express = require('express'); // make flexible Node.js web application framework
const path = require('path');


var app = express(); // make variable
app.use(express.static(path.join(__dirname,'public-flutter')));
app.get('/',(request, response) => {

      // أرسل الطلبات المستردة كاستجابة
      response.sendFile(path.join(__dirname,'public-flutter/index.html'));
    });
const mysql = require('mysql'); // make Node.js work with database (MYSQL)
const bodyparser = require('body-parser'); // Node.js body parsing middleware.
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.all('*', function(req, res,next) {
    /**
     * Response settings
     * @type {Object}
     */
    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };

    /**
     * Headers
     */
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.sendStatus(205);
    }
    else {
        next();
    }


});
/*
//host: '145.14.145.234',
//connecting to database 
const mc = mysql.createPool({
    host: 'roxmo.000webhostapp.com',
    user: 'id21714237_roaa',
    password: 'Roaa@3377',
    database: 'id21714237_mo',
    multipleStatements: true
    
});
*/


/*
//connecting to database 
const mc = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mo',
    multipleStatements: true
});
*/

///
//connecting to database 
const mc = mysql.createPool({
    host: 'bfcq3vlnu5jqg1rsbl2l-mysql.services.clever-cloud.com',
    user: 'uxqpdvz4vhlnscho',
    password: 'wn01A8RyjOu4RXjOspTS',
    database: 'bfcq3vlnu5jqg1rsbl2l',
    multipleStatements: true
});

// open broswer on this -> "localhost:4000/" // 81.16.28.103:4000

var port = process.env.PORT || 4000
console.log("Running on port:" + port)
app.listen(port)



/*
var port = process.env.PORT || 4000
const ipAddress = '192.168.192.127'; // استبدل بالعنوان الذي تريده
console.log("Running on port:" + port)
app.listen(port, ipAddress, () => {
    console.log(`Server is running on http://${ipAddress}:${port}`);
});
*/


/// GET


  
app.get('/orders', (request, response) => {
    // قم بتنفيذ استعلام قاعدة البيانات اللازم لاسترداد الطلبات
    let selectQuery = 'SELECT * FROM orders WHERE status = "طلب"';
    
    mc.query(selectQuery, function (error, results, fields) {
      if (error) throw error;
  
      
    // عرض الطلبات المستردة في سجل الخادم
    console.log('الطلبات المستردة:', results);

      // أرسل الطلبات المستردة كاستجابة
      response.send(results);
    });
  });
 
  app.get('/manager', (request, response) => {
    // قم بتنفيذ استعلام قاعدة البيانات اللازم لاسترداد الطلبات
    let selectQuery = 'SELECT * FROM orders WHERE status = "محذوف"';
    
    mc.query(selectQuery, function (error, results, fields) {
      if (error) throw error;
  
      // أرسل الطلبات المستردة كاستجابة
      response.send(results);
    });
  });

  app.delete('/ordersde/:orderId', (request, response) => {
    const orderId = request.params.orderId;
    
    // قم بتحويل orderId إلى رقم صحيح
    const id = parseInt(orderId);
    
    // قم بتحديث حالة الطلب المحدد إلى "محذوف" في قاعدة البيانات
    let updateQuery = `UPDATE orders SET status = "محذوف" WHERE id = ${id}`;
    mc.query(updateQuery, (err, result) => {
      if (err) {
        console.log('حدث خطأ أثناء تحديث حالة الطلب');
        throw err;
      }
      console.log(`تم حذف الطلب ${id} بنجاح`);
      response.send(`تم حذف الطلب ${id} بنجاح`);
    });
  });
  app.delete('/Managerde/:orderId', (request, response) => {
    const orderId = request.params.orderId;
    
    // قم بتحويل orderId إلى رقم صحيح
    const id = parseInt(orderId);
    
    // قم بتحديث حالة الطلب المحدد إلى "محذوف" في قاعدة البيانات
    let updateQuery = `UPDATE orders SET status = "done" WHERE id = ${id}`;
    mc.query(updateQuery, (err, result) => {
      if (err) {
        console.log('حدث خطأ أثناء تحديث حالة الطلب');
        throw err;
      }
      console.log(`تم حذف الطلب ${id} بنجاح`);
      response.send(`تم حذف الطلب ${id} بنجاح`);
    });
  });
/*
  app.put('/update/:orderId', function (req, res) {
    const orderId = req.params.orderId;
    const id = parseInt(orderId);

    var updatedData = {
   "tablenumber":req.body.tablenumber,
   "tea":req.body.tea,
   "hamed":req.body.hamed,
   "teaAndmilk":req.body.teaAndmilk,
   "nescafe":req.body.nescafe,
   "cappuccino":req.body.cappuccino,
   "cacau":req.body.cacau,
   "milk":req.body.milk,
   "nestle":req.body.nestle,
   "hotChocolate":req.body.hotChocolate,
   "cofee":req.body.cofee,
   "lableby":req.body.lableby	,
   "baklaa":req.body.baklaa,
   "banana":req.body.banana,
   "bananaAndMilk":req.body.bananaAndMilk,
   "bananaAnd":req.body.bananaAnd,
   "bananaAndStrawberry":req.body.bananaAndStrawberry,
   "orangeAndLemon":req.body.orangeAndLemon,
   "orange":req.body.orange,
   "lemon":req.body.lemon,
   "strawberry":req.body.strawberry,
   "watermelon":req.body.watermelon,
   "pepsi":req.body.pepsi,
   "miranda":req.body.miranda,
   "seven":req.body.seven	,
   "tiger":req.body.tiger,
   "mikiki":req.body.mikiki,
   "cocktail":req.body.cocktail	,
   "water":req.body.water,
   "arkela":req.body.arkela,
   "status":"طلب",
   "price":req.body.price,
   
    };

    console.log("Data to update:", updatedData); // للتأكيد على البيانات المرسلة للتحديث

    let updateQuery = `UPDATE orders SET ? WHERE id = ?`;

    mc.query(updateQuery, [updatedData, id], (err, result) => {
        if (err) {
            console.error('Error updating order:', err);
            return res.status(500).send('Error updating order');
        }
        if (result.affectedRows === 0) {
            // لا توجد صفوف تأثرت بالتحديث
            console.log(`No rows updated for order ${id}`);
            return res.status(404).send(`No order found with id ${id}`);
        }
        console.log(`Order ${id} updated successfully`);
        res.send(`Order ${id} updated successfully`);
    });
});
*/
app.put('/update/:orderId', function (req, res) {
    const orderId = req.params.orderId;
    const id = parseInt(orderId);
    
    var updatedData = {};
    if (req.body.tablenumber) updatedData.tablenumber = req.body.tablenumber;
    if (req.body.tea) updatedData.tea = req.body.tea;
    if (req.body.hamed) updatedData.hamed = req.body.hamed;
    if (req.body.teaAndmilk) updatedData.teaAndmilk = req.body.teaAndmilk;
    if (req.body.nescafe) updatedData.nescafe = req.body.nescafe;
    if (req.body.cappuccino) updatedData.cappuccino = req.body.cappuccino;
    if (req.body.cacau) updatedData.cacau = req.body.cacau;
    if (req.body.milk) updatedData.milk = req.body.milk;
    if (req.body.nestle) updatedData.nestle = req.body.nestle;
    if (req.body.hotChocolate) updatedData.hotChocolate = req.body.hotChocolate;
    if (req.body.cofee) updatedData.cofee = req.body.cofee;
    if (req.body.lableby) updatedData.lableby = req.body.lableby;
    if (req.body.baklaa) updatedData.baklaa = req.body.baklaa;
    if (req.body.banana) updatedData.banana = req.body.banana;
    if (req.body.bananaAndMilk) updatedData.bananaAndMilk = req.body.bananaAndMilk;
    if (req.body.bananaAnd) updatedData.bananaAnd = req.body.bananaAnd;
    if (req.body.bananaAndStrawberry) updatedData.bananaAndStrawberry = req.body.bananaAndStrawberry;
    if (req.body.orangeAndLemon) updatedData.orangeAndLemon = req.body.orangeAndLemon;
    if (req.body.orange) updatedData.orange = req.body.orange;
    if (req.body.lemon) updatedData.lemon = req.body.lemon;
    if (req.body.strawberry) updatedData.strawberry = req.body.strawberry;
    if (req.body.watermelon) updatedData.watermelon = req.body.watermelon;
    if (req.body.pepsi) updatedData.pepsi = req.body.pepsi;
    if (req.body.miranda) updatedData.miranda = req.body.miranda;
    if (req.body.seven) updatedData.seven = req.body.seven;
    if (req.body.tiger) updatedData.tiger = req.body.tiger;
    if (req.body.mikiki) updatedData.mikiki = req.body.mikiki;
    if (req.body.cocktail) updatedData.cocktail = req.body.cocktail;
    if (req.body.water) updatedData.water = req.body.water;
    if (req.body.arkela) updatedData.arkela = req.body.arkela;
    if (req.body.price) updatedData.price = req.body.price;
    updatedData.status = "طلب";

    let updateQuery = `UPDATE orders SET ? WHERE id = ?`;

    mc.query(updateQuery, [updatedData, id], (err, result) => {
        if (err) {
            console.error('حدث خطأ أثناء تحديث حالة الطلب:', err);
            res.status(500).send('خطأ في تحديث الطلب');
            return;
        }
        if (result.affectedRows === 0) {
            console.log(`لا يوجد طلب بالمعرف ${id} لتحديثه أو البيانات المراد تغييرها متطابقة.`);
            res.status(404).send(`لا يوجد طلب بالمعرف ${id} لتحديثه أو البيانات المراد تغييرها متطابقة.`);
            return;
        }
        console.log(`تم تجديد الطلب ${id} بنجاح`);
        res.send(`تم تجديد الطلب ${id} بنجاح`);
    });
     

});



app.post('/add', function (req, res) {

    
    var data = {
   //"id":req.body.id,
   "tablenumber":req.body.tablenumber,
   "tea":req.body.tea,
   "hamed":req.body.hamed,
   "teaAndmilk":req.body.teaAndmilk,
   "nescafe":req.body.nescafe,
   "cappuccino":req.body.cappuccino,
   "cacau":req.body.cacau,
   "milk":req.body.milk,
   "nestle":req.body.nestle,
   "hotChocolate":req.body.hotChocolate,
   "cofee":req.body.cofee,
   "lableby":req.body.lableby	,
   "baklaa":req.body.baklaa,
   "banana":req.body.banana,
   "bananaAndMilk":req.body.bananaAndMilk,
   "bananaAnd":req.body.bananaAnd,
   "bananaAndStrawberry":req.body.bananaAndStrawberry,
   "orangeAndLemon":req.body.orangeAndLemon,
   "orange":req.body.orange,
   "lemon":req.body.lemon,
   "strawberry":req.body.strawberry,
   "watermelon":req.body.watermelon,
   "pepsi":req.body.pepsi,
   "miranda":req.body.miranda,
   "seven":req.body.seven	,
   "tiger":req.body.tiger,
   "mikiki":req.body.mikiki,
   "cocktail":req.body.cocktail	,
   "water":req.body.water,
   "arkela":req.body.arkela,
   "status":"طلب",
   "price":req.body.price,
   

   
  
}



mc.query('INSERT INTO orders SET ?', data, function (error, results, fields) {
   if (error) {

       res.send({
           "code": 404,
           "MSG": "تمام"
       });

       try {
           
       } catch (err) {
          if (err.code === 'ER_DUP_ENTRY') {
              //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
          } else {
              //handleHttpErrors(err.message);
           }
       }

   } else {
       console.log('The solution is: ', results);
       if (error) throw error;
       res.send({
           "code": 200,
           "success": "عاشت ايدك"
       });
   }
});
});
//////
app.post('/day', function (req, res) {

    
    var data = {
   //"id":req.body.id,
   "teaTotal":req.body.teaTotal,
   "cofeeTotal":req.body.cofeeTotal,
   "priceTotal":req.body.priceTotal,
   "date":req.body.date,

  
}



mc.query('INSERT INTO daytota SET ?', data, function (error, results, fields) {
   if (error) {

       res.send({
           "code": 404,
           "MSG": "تمام"
       });

       try {
           
       } catch (err) {
          if (err.code === 'ER_DUP_ENTRY') {
              //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
          } else {
              //handleHttpErrors(err.message);
           }
       }

   } else {
       console.log('The solution is: ', results);
       if (error) throw error;
       res.send({
           "code": 200,
           "success": "عاشت ايدك"
       });
   }
});
});

/////

/*
//managerr
app.get('/logmanagerr', (request, response) => {
    mc.query(`SELECT * FROM managerr ` , function (error, results, fields) {
        if (error) throw error;
        return response.send(results);
    });

});



/// POST     replacementofvertionpassport

app.post('/add', function (req, res) {

    
  var data = {
   //"id":req.body.NAME,
   "u_name":req.body.u_name,
   "u_phone":req.body.u_phone,
   "u_password":req.body.u_password,
             
  
}



mc.query('INSERT INTO users SET ?', data, function (error, results, fields) {
   if (error) {

       res.send({
           "code": 404,
           "MSG": "تمام"
       });

       try {
           
       } catch (err) {
          if (err.code === 'ER_DUP_ENTRY') {
              //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
          } else {
              //handleHttpErrors(err.message);
           }
       }

   } else {
       console.log('The solution is: ', results);
       if (error) throw error;
       res.send({
           "code": 200,
           "success": "عاشت ايدك"
       });
   }
});
});



//maneger
app.post('/managerr', function (req, res) {

    
    var data = {
   //"id":req.body.NAME,
   "name":req.body.name,
   "phone":req.body.phone,
  
             
  
}



mc.query('INSERT INTO managerr SET ?', data, function (error, results, fields) {
   if (error) {

       res.send({
           "code": 404,
           "MSG": "تمام"
       });

       try {
           
       } catch (err) {
          if (err.code === 'ER_DUP_ENTRY') {
              //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
          } else {
              //handleHttpErrors(err.message);
           }
       }

   } else {
       console.log('The solution is: ', results);
       if (error) throw error;
       res.send({
           "code": 200,
           "success": "عاشت ايدك"
       });
   }
});
});







/*


/// POST newpassport

app.post('/ss', function (req, res) {
mc.query("select id from users where users.u_name='"+req.body.n_firstname+"'", function (error, result, fields) {
    if (error) {
          console.log("error");
        res.send({
            "code": 404,
            "MSG": "no user whith that name"
        });
 
        
 
    } else {
        try {
            let uid=result[0].id;
            console.log(result[0].id);
            var data = {
                // "id":req.id,//user_id
             "n_email":req.body.n_email,
             "n_placeOforder":req.body.n_placeOforder,
             "n_typeOfmarrige":req.body.n_typeOfmarrige,
             "n_sex":req.body.n_sex,
            "n_placeOfbirth":req.body.n_placeOfbirth,
            "n_firstname":req.body.n_firstname,
            "n_fathersName":req.body.n_fathersName,
             "n_grandfatherName":req.body.n_grandfatherName,
             "n_surname":req.body.n_surname,
             "n_motherName":req.body.n_motherName,
             "n_motherFather":req.body.n_motherFather,
             "n_provinceCountry":req.body.n_provinceCountry,
             "n_maritalStatus":req.body.n_maritalStatus,
             "n_profession":req.body.n_profession,
             "n_dateOfbirth":req.body.n_dateOfbirth,
             "n_nationaliIDNumber":req.body.n_nationaliIDNumber,
             "n_address":req.body.n_address,
            "n_image":req.body.n_image,
            "n_image2":req.body.n_image2,
            "user_id":uid
              //"users": { "id": "1"}
             // },
          }
          
            mc.query('INSERT INTO newpassport SET?', data, function (error, results, fields) {
                if (error) {
                      console.log(error);
                    res.send({
                        "code": 404,
                        "MSG": "error"
                    });
             
                    
             
                } else {
                    try {
                        // console.log('The solution is: ', results);
                    if (error) throw error;
                    res.send({
                        "code": 200,
                        "success": "عاشت ايدك"
                    });
                } catch (err) {
                   if (err.code === 'ER_DUP_ENTRY') {
                       //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
                   } else {
                       //handleHttpErrors(err.message);
                    }
                }
                    
                }
             });
            console.log('The solution is: ', results);
        if (error) throw error;
        res.send({
            "code": 200,
            "success": "عاشت ايدك"
        });
    } catch (err) {
       if (err.code === 'ER_DUP_ENTRY') {
           //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
       } else {
           //handleHttpErrors(err.message);
        }
    }
        
    }
 });




 });
 

 /////renewpassport renewviow
 app.post('/renew', function (req, res) {
    mc.query("select id from users where users.u_phone='"+req.body.rn_phone+"'", function (error, result, fields) {
        if (error) {
              console.log("error");
            res.send({
                "code": 404,
                "MSG": "no user whith that phone"
            });
     
            
     
        } else {
            try {
                let uid=result[0].id;
                console.log(result[0].id);
                var data = {
                    // "id":req.id,
                 "rn_email":req.body.rn_email,
                 "rn_placeOforder":req.body.rn_placeOforder,
                 "rn_typeOfmarrige":req.body.rn_typeOfmarrige,
                 "rn_sex":req.body.rn_sex,
                 "rn_placeOfbirth":req.body.rn_placeOfbirth,
                 "rn_firstname":req.body.rn_firstname,
                 "rn_fathersName":req.body.rn_fathersName,
                 "rn_grandfatherName":req.body.rn_grandfatherName,
                 "rn_surname":req.body.rn_surname,
                 "rn_motherName":req.body.rn_motherName,
                 "rn_motherFather":req.body.rn_motherFather,
                 "rn_provinceCountry":req.body.rn_provinceCountry,
                 "rn_maritalStatus":req.body.rn_maritalStatus,
                 "rn_profession":req.body.rn_profession,
                 "rn_dateOfbirth":req.body.rn_dateOfbirth,
                 "rn_nationaliIDNumber":req.body.rn_nationaliIDNumber,
                 "rn_phone":req.body.rn_phone,
                 "rn_address":req.body.rn_address,
                 "rn_image":req.body.rn_image,
                 "user_id":uid
                  //"users": { "id": "1"}
                 // },
              }
              
                mc.query('INSERT INTO renewpassport SET?', data, function (error, results, fields) {
                    if (error) {
                          console.log(error);
                        res.send({
                            "code": 404,
                            "MSG": "error"
                        });
                 
                        
                 
                    } else {
                        try {
                            // console.log('The solution is: ', results);
                        if (error) throw error;
                        res.send({
                            "code": 200,
                            "success": "عاشت ايدك"
                        });
                    } catch (err) {
                       if (err.code === 'ER_DUP_ENTRY') {
                           //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
                       } else {
                           //handleHttpErrors(err.message);
                        }
                    }
                        
                    }
                 });
                console.log('The solution is: ', results);
            if (error) throw error;
            res.send({
                "code": 200,
                "success": "عاشت ايدك"
            });
        } catch (err) {
           if (err.code === 'ER_DUP_ENTRY') {
               //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
           } else {
               //handleHttpErrors(err.message);
            }
        }
            
        }
     });
    
    
    
    
     });

 /////////////
 app.post('/lost', function (req, res) {
    mc.query("select id from users where users.u_phone='"+req.body.L_phone+"'", function (error, result, fields) {
        if (error) {
              console.log("error");
            res.send({
                "code": 404,
                "MSG": "no user whith that phone"
            });
     
            
     
        } else {
            try {
                let uid=result[0].id;
                console.log(result[0].id);
                var data = {
                    // "id":req.id,
                 "L_email":req.body.L_email,
                 "L_placeOforder":req.body.L_placeOforder,
                 "L_typeOfmarrige":req.body.L_typeOfmarrige,
                 "L_sex":req.body.L_sex,
                 "L_placeOfbirth":req.body.L_placeOfbirth,
                 "L_firstname":req.body.L_firstname,
                 "L_fathersName":req.body.L_fathersName,
                 "L_grandfatherName":req.body.L_grandfatherName,
                 "L_surname":req.body.L_surname,
                 "L_motherName":req.body.L_motherName,
                 "L_motherFather":req.body.L_motherFather,
                 "L_provinceCountry":req.body.L_provinceCountry,
                 "L_maritalStatus":req.body.L_maritalStatus,
                 "L_profession":req.body.L_profession,
                 "L_dateOfbirth":req.body.L_dateOfbirth,
                 "L_nationaliIDNumber":req.body.L_nationaliIDNumber,
                 "L_phone":req.body.L_phone,
                 "L_address":req.body.L_address,
                 "L_image":req.body.L_image,  
                 "user_id":uid
                  //"users": { "id": "1"}
                 // },
              }
              
                mc.query('INSERT INTO replacementoflosepassport SET?', data, function (error, results, fields) {
                    if (error) {
                          console.log(error);
                        res.send({
                            "code": 404,
                            "MSG": "error"
                        });
                 
                        
                 
                    } else {
                        try {
                            // console.log('The solution is: ', results);
                        if (error) throw error;
                        res.send({
                            "code": 200,
                            "success": "عاشت ايدك"
                        });
                    } catch (err) {
                       if (err.code === 'ER_DUP_ENTRY') {
                           //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
                       } else {
                           //handleHttpErrors(err.message);
                        }
                    }
                        
                    }
                 });
                console.log('The solution is: ', results);
            if (error) throw error;
            res.send({
                "code": 200,
                "success": "عاشت ايدك"
            });
        } catch (err) {
           if (err.code === 'ER_DUP_ENTRY') {
               //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
           } else {
               //handleHttpErrors(err.message);
            }
        }
            
        }
     });
    
    
    
    
     });
 

     app.post('/vertion', function (req, res) {
        mc.query("select id from users where users.u_phone='"+req.body.v_phone+"'", function (error, result, fields) {
            if (error) {
                  console.log("error");
                res.send({
                    "code": 404,
                    "MSG": "no user whith that phone"
                });
         
                
         
            } else {
                try {
                    let uid=result[0].id;
                    console.log(result[0].id);
                    var data = {
                        // "id":req.id,
                     "v_email":req.body.v_email,
                     "v_placeOforder":req.body.v_placeOforder,
                     "v_typeOfmarrige":req.body.v_typeOfmarrige,
                     "v_sex":req.body.v_sex,
                     "v_placeOfbirth":req.body.v_placeOfbirth,
                     "v_firstname":req.body.v_firstname,
                     "v_fathersName":req.body.v_fathersName,
                     "v_grandfatherName":req.body.v_grandfatherName,
                     "v_surname":req.body.v_surname,
                     "v_motherName":req.body.v_motherName,
                     "v_motherFather":req.body.v_motherFather,
                     "v_provinceCountry":req.body.v_provinceCountry,
                     "v_maritalStatus":req.body.v_maritalStatus,
                     "v_profession":req.body.v_profession,
                     "v_dateOfbirth":req.body.v_dateOfbirth,
                     "v_nationaliIDNumber":req.body.v_nationaliIDNumber,
                     "v_phone":req.body.v_phone,
                     "v_address":req.body.v_address,
                     "v_image":req.body.v_image,  
                     "user_id":uid
                      //"users": { "id": "1"}
                     // },
                  }
                  
                    mc.query('INSERT INTO replacementofvertionpassport SET?', data, function (error, results, fields) {
                        if (error) {
                              console.log(error);
                            res.send({
                                "code": 404,
                                "MSG": "error"
                            });
                     
                            
                     
                        } else {
                            try {
                                // console.log('The solution is: ', results);
                            if (error) throw error;
                            res.send({
                                "code": 200,
                                "success": "عاشت ايدك"
                            });
                        } catch (err) {
                           if (err.code === 'ER_DUP_ENTRY') {
                               //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
                           } else {
                                                     }
                        }
                            
                        }
                     });
                    console.log('The solution is: ', results);
                if (error) throw error;
                res.send({
                    "code": 200,
                    "success": "عاشت ايدك"
                });
            } catch (err) {
               if (err.code === 'ER_DUP_ENTRY') {
                   //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
               } else {
                    
                   //handleHttpErrors(err.message);
                }
            }
                
            }
         });
        
        
        
        
         });
     
*/

