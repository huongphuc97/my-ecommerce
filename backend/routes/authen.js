const conn = require('../connect');
const jwt = require('jsonwebtoken');
const authPage = require('./authorize')


module.exports = function (app) {

    app.post('/accounts/login', function (request, response) {
        let sql = 'SELECT * FROM account WHERE username = ? AND password = ?'
        conn.query(sql, [request.body.username, request.body.password], function (err, data) {
            conn.query('UPDATE account SET last_login = now() WHERE username = ? AND password = ?', [request.body.username, request.body.password], function (err2, data2) {
                jwt.sign({ user: data }, "secretkey", function (err, token) {
                    response.send({
                        token: token
                    })
                })
            })
        })
    })

    app.get('/accounts/get', verifyToken, function (request, response) {
        jwt.verify(request.token, "secretkey", function (err, data) {
            response.send({
                myData: data
            })
        })
    })

    app.get('/accounts/user', function (request, response) {
        let sql = 'SELECT * FROM account';
        conn.query(sql, function (err, data) {
            response.send({
                myData: data
            })
        })
    })



    function verifyToken(request, response, next) {
        var bearHeader = request.headers['authorization'];
        if (typeof bearHeader !== 'undefined') {
            var bearHeader = bearHeader.split(' ')[1]
            request.token = bearHeader
            next()
        } else {
            response.sendStatus(403)
        }
    }

    app.post('/accounts/create', function (request, response) {
        let sql = 'INSERT INTO account SET ?';
        conn.query(sql, request.body, function (err, data) {
            response.send({
                result: data.length ? 200 : ""
            })
        })
    })

    app.put('/accounts/:id', function (request, response) {
        let sql = 'UPDATE account SET ? WHERE id = ?';
        conn.query(sql, [request.body, request.params.id], function (err, data) {
            response.send({
                myData: data,
                result: data.length ? 200 : ""
            })
        })
    })

    app.delete('/accounts/:id', function (request, response) {
        let sql = 'DELETE FROM account WHERE id = ?';
        conn.query(sql, request.params.id, function (err, data) {
            response.send({
                result: data.length ? 200 : ""
            })
        })
    })
}