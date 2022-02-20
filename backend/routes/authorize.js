function authPage(permission) {
    return function (request, response, next) {
        var userRole = request.query.role
        if (permission.includes(userRole)) {
            next()
        } else response.send({
            mess: 'You do not have permission'
        })
    }
}
module.exports = authPage