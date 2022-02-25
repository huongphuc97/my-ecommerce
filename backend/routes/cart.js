const conn = require('../connect');

module.exports = function (app) {

    app.get('/cart', function (request, response) {
        let sql = 'SELECT * FROM cart ORDER BY name ASC'
        conn.query(sql, function (err, data) {
            response.send({
                myData: data,
            })
        })
    })

    app.get('/cart/:id', function (request, response) {
        let sql = 'SELECT * FROM cart WHERE id = ?'
        conn.query(sql, request.params.id, function (err, data) {
            response.send({
                myData: data[0],
            })
        })
    })

    app.post('/cart', function (request, response) {
        let sql = 'INSERT INTO cart SET ?';
        conn.query(sql, request.body, function (err, data) {
            response.send({
                result: data
            })
        })
    })

    app.put('/cart/:id', function (request, response) {
        let sql = 'UPDATE cart SET ? WHERE id = ?';
        conn.query(sql, [request.body, request.params.id], function (err, data) {
            response.send({
                myData: data,
                result: data.length ? 200 : ""
            })
        })
    })

    app.delete('/cart', function (request, response) {
        let sql = 'DELETE FROM cart';
        conn.query(sql, request.params.id, function (err, data) {
            response.send({
                result: data
            })
        })
    })

    app.delete('/cart/:id', function (request, response) {
        let sql = 'DELETE FROM cart WHERE id = ?';
        conn.query(sql, request.params.id, function (err, data) {
            response.send({
                result: data.length ? 200 : ""
            })
        })
    })
}