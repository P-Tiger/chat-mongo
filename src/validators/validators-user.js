import Parameter from 'parameter'
var parameter = new Parameter();

let keysPostUser = {
    name: {
        type: 'string',
        required: true,
        allowNull: false
    },
    password: {
        type: 'string',
        required: true,
        allowNull: false
    },
    email: {
        type: 'string',
        required: true,
        allowNull: false
    },
}

async function validatorsPostUser(req, res, next) {
    let errors = parameter.validate(keysPostUser, req.body)
    if (errors) {
        return res.status(400).send(errors)
    }
    await next();
}

export {
    validatorsPostUser
}