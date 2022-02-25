const conn = require('../connect');
module.exports = function (app) {

    app.get('/favourites', function (request, response) {
        let sql = 'SELECT f.*, c.name as category FROM favourite f JOIN category c ON f.category_id = c.id'
        conn.query(sql, function (err, data) {
            response.send({
                myData: data,
                result: data.length ? 200 : ""
            })
        })
    })

    app.post('/favourites', function (request, response) {
        let sql = 'INSERT INTO favourite SET ?';
        conn.query(sql, request.body, function (err, data) {
            response.send({
                result: data.length ? 200 : ""
            })
        })
    })

    app.put('/favourites/:id', function (request, response) {
        let sql = 'UPDATE favourite SET ? WHERE id = ?';
        conn.query(sql, [request.body, request.params.id], function (err, data) {
            response.send({
                myData: data,
                result: data.length ? 200 : ""
            })
        })
    })

    app.delete('/favourites', function (request, response) {
        let sql = 'DELETE FROM favourite';
        conn.query(sql, request.params.id, function (err, data) {
            response.send({
                result: data.length ? 200 : ""
            })
        })
    })

    app.delete('/favourites/:id', function (request, response) {
        let sql = 'DELETE FROM favourite WHERE id = ?';
        conn.query(sql, request.params.id, function (err, data) {
            response.send({
                result: data.length ? 200 : ""
            })
        })
    })
}