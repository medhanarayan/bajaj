exports.handler = async () => {
    return {
        statusCode: 200,
        body: JSON.stringify({ operation_code: 'OP123' })
    };
};
