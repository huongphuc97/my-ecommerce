const conn = require('../connect');
const upload = require('../upload');
const authPage = require('./authorize')


module.exports = function (app) {

    app.get('/products',function (request, response) {
        let sql = 'SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id ORDER BY p.id ASC';
        conn.query(sql, function (err, data) {
            response.send({
                myData: data,
                result: data.length ? 200 : ""
            })
        })
    })

    app.get('/products/search/bykey/:name', function (request, response) {
        request.params.name = '%' + request.params.name + '%';
        let sql = 'SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id WHERE p.name LIKE ? ORDER BY p.id ASC';
        conn.query(sql, request.params.name, function (err, data) {
            response.send({
                myData: data,
                result: data.length ? 200 : ""
            })
        })
    })

    app.get('/products/sort/newest', function (request, response) {
        let sql = 'SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id ORDER BY p.id DESC';
        conn.query(sql, function (err, data) {
            response.send({
                myData: data,
                result: data.length ? 200 : ""
            })
        })
    })

    app.get('/products/sort/oldest', function (request, response) {
        let sql = 'SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id ORDER BY p.id ASC';
        conn.query(sql, function (err, data) {
            response.send({
                myData: data,
                result: data.length ? 200 : ""
            })
        })
    })

    app.get('/products/sort/highprice', function (request, response) {
        let sql = 'SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id ORDER BY p.price DESC ';
        conn.query(sql, function (err, data) {
            response.send({
                myData: data,
                result: data.length ? 200 : ""
            })
        })
    })

    app.get('/products/sort/lowprice', function (request, response) {
        let sql = 'SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id ORDER BY p.price ASC';
        conn.query(sql, function (err, data) {
            response.send({
                myData: data,
                result: data.length ? 200 : ""
            })
        })
    })

    app.get('/products/range/:from,:to', function (request, response) {
        let sql = 'SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id WHERE p.price BETWEEN ? AND ? ORDER BY p.price DESC';
        conn.query(sql, [request.params.from, request.params.to], function (err, data) {
            response.send({
                myData: data,
                result: data.length ? 200 : ""
            })
        })
    })

    app.get('/products/women', function (request, response) {
        let sql = 'SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id WHERE c.id = 3';
        conn.query(sql, function (err, data) {
            response.send({
                myData: data,
                result: data.length ? 200 : ""
            })
        })
    })

    app.get('/products/women/page/:id', function (request, response) {
        conn.query('SELECT COUNT(*) FROM product', function (err, data) {
            var perPageWomen = 9
            var fullData = Object.values(data[0])
            fullData.forEach((totalItems) => {
                if (request.params.id == 1) {
                    let sql = 'SELECT p.*, c.name as category  FROM product p JOIN category c ON p.category_id = c.id WHERE p.category_id = 3 LIMIT 9';
                    conn.query(sql, function (err, data) {
                        response.send({
                            pageWomen: parseInt(request.params.id),
                            per_pageWomen: perPageWomen,
                            totalWomen: totalItems,
                            total_pagesWomen: Math.floor(totalItems / perPageWomen),
                            myData: data,
                        })
                    })
                }
                else if (request.params.id == 2) {
                    let sql = 'SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id WHERE p.category_id = 3  LIMIT 9 OFFSET 9';
                    conn.query(sql, function (err, data) {
                        response.send({
                            pageWomen: parseInt(request.params.id),
                            per_pageWomen: perPageWomen,
                            totalWomen: totalItems,
                            total_pagesWomen: Math.floor(totalItems / perPageWomen),
                            myData: data,
                        })
                    })
                }
                else {
                    let sql = 'SELECT  p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id  WHERE p.category_id = 3 LIMIT 9 OFFSET ' + (request.params.id - 1) * 9 + ''
                    conn.query(sql, function (err, data) {
                        response.send({
                            pageWomen: parseInt(request.params.id),
                            per_pageWomen: perPageWomen,
                            totalWomen: totalItems,
                            total_pagesWomen: Math.floor(totalItems / perPageWomen),
                            myData: data,
                        })
                    })
                }
            })
        })
    })
    app.get('/products/men', function (request, response) {
        let sql = 'SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id WHERE c.id = 4';
        conn.query(sql, function (err, data) {
            response.send({
                myData: data,
                result: data.length ? 200 : ""
            })
        })
    })
    app.get('/products/others', function (request, response) {
        let sql = 'SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id WHERE c.id = 5';
        conn.query(sql, function (err, data) {
            response.send({
                myData: data,
                result: data.length ? 200 : ""
            })
        })
    })

    app.get('/products/homepage=:id', function (request, response) {
        conn.query('SELECT COUNT(*) FROM product', function (err, data) {
            var perPage = 8
            var fullData = Object.values(data[0])
            fullData.forEach((totalItems) => {
                if (request.params.id == 1) {
                    let sql = 'SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id ORDER BY p.id ASC LIMIT 8'
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
                    let sql = 'SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id ORDER BY p.id ASC LIMIT 8 OFFSET 8'
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
                    let sql = 'SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id ORDER BY p.id ASC LIMIT 8 OFFSET ' + (request.params.id - 1) * 8 + ''
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
    })

    app.get('/products/pages=:id', function (request, response) {
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
    })

    app.post('/products', upload.single('image'), function (request, response) {
        const file = request.file;
        if (file) {
            request.body.image = file.filename;
        }
        let sql = 'INSERT INTO product SET ?';
        conn.query(sql, request.body, function (err, data) {
            response.send({
                result: data.length ? 200 : ""
            })
        })
    })
    
    app.put('/products/:id', function (request, response) {
        let sql = 'UPDATE product SET ? WHERE id = ?';
        conn.query(sql, [request.body, request.params.id], function (err, data) {
            response.send({
                myData: data,
                result: data.length ? 200 : ""
            })
        })
    })

    app.delete('/products/:id', function (request, response) {
        let sql = 'DELETE FROM product WHERE id = ?';
        conn.query(sql, request.params.id, function (err, data) {
            response.send({
                result: data.length ? 200 : ""
            })
        })
    })
}