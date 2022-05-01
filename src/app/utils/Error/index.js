
class newError extends Error{
    constructor(errorBody) {
        super(errorBody.error_type);
        this.error = errorBody.error;
        this.error_type = errorBody.error_type;
        this.data = errorBody.data;
    }
}

module.exports = newError