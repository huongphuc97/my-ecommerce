const conn = require('../connect');
module.exports = function (app) {

    app.get('/review', function (request, response) {
        let sql = 'SELECT name, email, rating, text_review, title, DAY(created_at) as day ,MONTHNAME(created_at) as month, YEAR(created_at) as year FROM review ORDER BY id DESC'
        conn.query(sql, function (err, data) {
            response.send({
                myData: data,
                result: data.length ? 200 : ""
            })
        })
    })

    app.get('/review/:id', function (request, response) {
        let sql = 'SELECT f.*, c.name as category FROM favourite f JOIN category c ON f.category_id = c.id WHERE id = ?'
        conn.query(sql, request.params.id, function (err, data) {
            response.send({
                myData: data[0],
                result: data.length ? 200 : ""
            })
        })
    })

    app.post('/review', function (request, response) {
        let sql = 'INSERT INTO review SET ?';
        conn.query(sql, request.body, function (err, data) {
            response.send({
                result: data.length ? 200 : ""
            })
        })
    })

}