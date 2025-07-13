export const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (err.name === 'ValidationError') {
        err.statusCode = 400;
        err.status = 'fail';
        err.isOperational = true;
        err.message = Object.values(err.errors)
            .map(e => e.message)
            .join(' | ');
    }

    if (process.env.NODE_ENV === 'development') {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }

    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }

    console.error('ERROR', err);
    res.status(500).json({
        status: 'error',
        message: 'Algo salió mal'
    });
};
