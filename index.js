var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
 Authentication= require('./models/authentication.js');
 Multiplication= require('./models/multiplication.js');
 SchoolRegister= require('./models/schoolRegistration.js');
//cors XML k error ko resolve krne k liye lgya h and main purpose of cors to connect frontend to backend
var cors = require('cors')
cors({ credentials: true, origin: true })
app.use(cors())
// Parsers for POST data
app.use(bodyParser.json(), function (err, req, res, next) {
    if (err) {
        return res.status(500).json({ error: err });
    }
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
// connect database to mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://shw:shw12345@ds143245.mlab.com:43245/school-management-system', {
    useMongoClient: true
    /* other options */
});
//signup post request to mlab from server
app.post('/api/signup', function (request, response) {
    response.header('Access-Control-Allow-Origin', "*");
    var data = {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
    };
    var AuthData = new Authentication(data);
    AuthData.save(function (err, getData) {
        if (!err) {
            console.log("Signup Successfully!!! Welcome", getData.name)
            return response.status(200).send(getData);
        } else {
            console.log("Err", err)
            return response.status(500).send(err);
        }
    })
})
//Login post request to mlab from server
app.post('/api/login', function (request, response) {
    Authentication.findOne({ email: request.body.email }, function (err, email) {
        if (err) {
            console.log("email err", err)
            return response.status(500).send(err)
            // return err
        }
        if (!email) {
            console.log("email 404 err")
            return response.status(404).send()
        }

            Authentication.findOne({ password: request.body.password }, function (err, get) {
                if (err) {
                    console.log("get", err)
                    return response.status(500).send(err)
                }
                if (!get) {
                    return response.status(404).send()
                }
                console.log("Login Succcessfully!!! Welcome ", get.name)
                return response.status(200).send(get.name)
            })
    });
});
//Multiplication API
app.post('/api/multiplication', function (request, response) {
    response.header('Access-Control-Allow-Origin', "*");
    num1= request.body.num1
    num2= request.body.num2
    console.log("Hello Sir Zohaib your answer is ", num1*num2)
    // return response.send("Hello sir Zohaib your answer is ", num1*num2);
})
// //register school post request to mlab from server
// app.post('/api/schoolRegistration', function (request, response) {
//     response.header('Access-Control-Allow-Origin', "*");
//     var data = {
//         email: request.body.email,
//         password: request.body.password,
//         name: request.body.name,
//         date: request.body.date,
//         amount: request.body.amount,
//         type: request.body.type
//     };
//     var SchoolData = new SchoolRegister(data);
//     SchoolData.save(function (err, getData) {
//         if (!err) {
//             console.log("data", getData)
//             return response.status(200).send(getData);
//         } else {
//             console.log("Err", err)
//             return response.status(500).send(err);
//         }
//     })
//     var AuthData = new Authentication({ email: request.body.email, password: request.body.password, type: request.body.type });
//     AuthData.save(function (err, getData) {
//         if (!err) {
//             console.log("data", getData)
//             // return response.status(200).send(getData);
//         } else {
//             console.log("Err", err)
//             // return response.status(500).send(err);
//         }
//     })
// })
//create get request to mlab from server
app.get('/getData', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    SchoolRegister.find(function (err, data) {
        if (!err) {
            console.log("data", data)
            res.send(data)
        } else {
            console.log("Err", err)
            res.send(err)
        }
    });
})
// When successfully connected
mongoose.connection.on('connected to mongodb', function () {
    console.log('Mongoose default connection open to ');
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});
var port = process.env.PORT || 8000;
app.listen(port, function () {
    console.log("Server run on port " + port)
});