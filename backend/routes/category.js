const conn = require('../connect');

module.exports = function (app) {

    app.get('/categories', function (request, response) {
        let sql = 'SELECT * FROM category'
        conn.query(sql, function (err, data){
            response.send({
                myData: data,
                result: data.length ? 200 : ""
            })
        })
    })

    app.get('/categories/:id', function (request, response) {
        let sql = 'SELECT * FROM category WHERE id = ?'
        conn.query(sql, request.params.id, function (err, data) {
            response.send({
                myData: data[0],
                result: data.length ? 200 : ""
            })
        })
    })

    app.post('/categories', function (request, response) {
        let sql = 'INSERT INTO category SET ?';
        conn.query(sql, request.body, function (err, data) {
            response.send({
                result: data.length ? 200 : ""
            })
        })
    })

    app.put('/categories/:id', function (request, response) {
        let sql = 'UPDATE category SET ? WHERE id = ?';
        conn.query(sql, [request.body, request.params.id], function (err, data) {
            response.send({
                myData: data,
                result: data.length ? 200 : ""
            })
        })
    })

    app.delete('/categories/:id', function (request, response) {
        let sql = 'DELETE FROM category WHERE id = ?';
        conn.query(sql, request.params.id, function (err, data) {
            response.send({
                result: data.length ? 200 : ""
            })
        })
    })
}