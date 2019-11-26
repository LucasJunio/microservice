const HTTPStatus = require('http-status');

function onSuccess(res, data) {
    return res.status(HTTPStatus.OK).json(data);
}

function onServerError(res, message) {
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
        message: [message]
    });
}

function onError(res, err, message) {
    if (err.data) {
        return onServerError(res, `${message} error: ${err}. detail: ${err.data.message}.`, err);
    }
    return onServerError(res, `${message} error: ${err}.`, err);
}

function errorHandlerApi(err, req, res) {
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
        errorCode: 'ERR-001',
        message: 'Internal Server Error'
    });
}

function onBadRequest(res, message) {
    return res.status(HTTPStatus.BAD_REQUEST).json({
        message
    });
}

module.exports = {
    onSuccess,
    onError,
    onBadRequest,
    errorHandlerApi,
};

