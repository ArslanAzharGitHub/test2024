const response = (res, status, result) => {
    res.status(status).json({ result });
};
export default response;