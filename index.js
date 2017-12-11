var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
Authentication = require('./models/authentication.js');
Multiplication = require('./models/multiplication.js');
SchoolRegister = require('./models/schoolRegistration.js');
StudentRegister = require('./models/studentRegistration.js');
EmployeeRegister = require('./models/employeeRegistration.js');
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
//Login post request to mlab from server
app.post('/api/login', function (request, response) {
    if (request.body.type == "superAdmin") {
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
                return response.status(200).send(get)
            })
        });
    }
    else if (request.body.type == "admin") {
        SchoolRegister.findOne({ email: request.body.email }, function (err, email) {
            if (err) {
                console.log("email err", err)
                return response.status(500).send(err)
                // return err
            }
            if (!email) {
                console.log("email 404 err")
                return response.status(404).send()
            }
            SchoolRegister.findOne({ password: request.body.password }, function (err, get) {
                if (err) {
                    console.log("get", err)
                    return response.status(500).send(err)
                }
                if (!get) {
                    return response.status(404).send()
                }
                console.log("Login Succcessfully!!! Welcome ", get.name)
                return response.status(200).send(get)
            })
        });
    }
    else if (request.body.type == "student") {
        StudentRegister.findOne({ email: request.body.email }, function (err, email) {
            if (err) {
                console.log("email err", err)
                return response.status(500).send(err)
                // return err
            }
            if (!email) {
                console.log("email 404 err")
                return response.status(404).send()
            }
            StudentRegister.findOne({ password: request.body.password }, function (err, get) {
                if (err) {
                    console.log("get", err)
                    return response.status(500).send(err)
                }
                if (!get) {
                    return response.status(404).send()
                }
                console.log("Login Succcessfully!!! Welcome ", get.name)
                return response.status(200).send(get)
            })
        });
    }
    else {
        EmployeeRegister.findOne({ email: request.body.email }, function (err, email) {
            if (err) {
                console.log("email err", err)
                return response.status(500).send(err)
                // return err
            }
            if (!email) {
                console.log("email 404 err")
                return response.status(404).send()
            }
            EmployeeRegister.findOne({ password: request.body.password }, function (err, get) {
                if (err) {
                    console.log("get", err)
                    return response.status(500).send(err)
                }
                if (!get) {
                    return response.status(404).send()
                }
                console.log("Login Succcessfully!!! Welcome ", get.name)
                return response.status(200).send(get)
            })
        });
    }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Multiplication API
app.post('/api/multiplication', function (request, response) {
    response.header('Access-Control-Allow-Origin', "*");
    num1 = request.body.num1
    num2 = request.body.num2
    console.log("Hello Sir Zohaib your answer is ", num1 * num2)
    // return response.send("Hello sir Zohaib your answer is ", num1*num2);
})
// //register school post request to mlab from server
app.post('/api/schoolRegistration', function (request, response) {
    response.header('Access-Control-Allow-Origin', "*");
    var data = {
        email: request.body.email,
        password: request.body.password,
        amount: request.body.amount,
        ownerName: request.body.ownerName,
        registrationDate: request.body.registrationDate,
        schoolName: request.body.schoolName,
        schoolID: request.body.schoolID,
        type: "admin"
    };
    var SchoolData = new SchoolRegister(data);
    SchoolData.save(function (err, getData) {
        if (!err) {
            console.log("data", getData)
            return response.status(200).send(getData);
        } else {
            console.log("Err", err)
            return response.status(500).send(err);
        }
    })
})
// //register employee post request to mlab from server
app.post('/api/employeeRegistration', function (request, response) {
    response.header('Access-Control-Allow-Origin', "*");
    var data = {
        email: request.body.email,
        password: request.body.password,
        employeeName: request.body.employeeName,
        fatherName: request.body.fatherName,
        registrationDate: request.body.registrationDate,
        employeeType: request.body.employeeType,
        employeeID: request.body.employeeID,
        salary: request.body.salary,
        type: "employee"
    };
    var EmployeeData = new EmployeeRegister(data);
    EmployeeData.save(function (err, getData) {
        if (!err) {
            console.log("data", getData)
            return response.status(200).send(getData);
        } else {
            console.log("Err", err)
            return response.status(500).send(err);
        }
    })
})
// //register student post request to mlab from server
app.post('/api/studentRegistration', function (request, response) {
    response.header('Access-Control-Allow-Origin', "*");
    var data = {
        email: request.body.email,
        password: request.body.password,
        studentName: request.body.studentName,
        fatherName: request.body.fatherName,
        registrationDate: request.body.registrationDate,
        class: request.body.class,
        QRno: request.body.QRno,
        studentFees: request.body.studentFees,
        type: "student"
    };
    var StudentData = new StudentRegister(data);
    StudentData.save(function (err, getData) {
        if (!err) {
            console.log("data", getData)
            return response.status(200).send(getData);
        } else {
            console.log("Err", err)
            return response.status(500).send(err);
        }
    })
})
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