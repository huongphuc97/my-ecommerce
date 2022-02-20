const conn = require('../../connect');
const upload = require('../../upload');
const authPage = require('../authorize')
module.exports = function (app) {


    app.get('/products/admin', authPage('admin'), function (request, response) {
        let sql = 'SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id ORDER BY p.id ASC';
        conn.query(sql, function (err, data) {
            response.send({
                myData: data,
                result: data.length ? 200 : ""
            })
        })
    })

    app.get('/products/admin/pages=:id', authPage('admin'), function (request, response) {
        conn.query('SELECT COUNT(*) FROM product', function (err, data) {
            var perPage = 9
            var fullData = Object.values(data[0])
            fullData.forEach((totalItems) => {
                if (request.params.id == 1) {
                    let sql = 'SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id ORDER BY p.id ASC LIMIT 9'
                    conn.query(sql, function (err, data) {
                        response.send({
                            page: parseInt(request.params.id),
                            per_page: perPage,
                            total: totalItems,
                            total_pages: Math.floor(totalItems / perPage),
                            myData: data,
                        })
                    })
                }
                else if (request.params.id == 2) {
                    let sql = 'SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id ORDER BY p.id ASC LIMIT 9 OFFSET 9'
                    conn.query(sql, function (err, data) {
                        response.send({
                            page: parseInt(request.params.id),
                            per_page: perPage,
                            total: totalItems,
                            total_pages: Math.floor(totalItems / perPage),
                            myData: data,
                        })
                    })
                }
                else {
                    let sql = 'SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id ORDER BY p.id ASC LIMIT 9 OFFSET ' + (request.params.id - 1) * 9 + ''
                    conn.query(sql, function (err, data) {
                        response.send({
                            page: parseInt(request.params.id),
                            per_page: perPage,
                            total: totalItems,
                            total_pages: Math.floor(totalItems / perPage),
                            myData: data,
                        })
                    })
                }
            })
        })

        app.get('/accounts/admin', authPage('admin'), function (request, response) {
            let sql = 'SELECT * FROM account';
            conn.query(sql, function (err, data) {
                response.send({
                    myData: data
                })
            })
        })
    })
}
