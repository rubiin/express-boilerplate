import {respondError, respondValidationError} from "../utils/responseHelper";

const buildUsefulErrorObject = (errors) => {
    let errorMessage = "";
    errors.map((error, i) => {
        // replace white space and slashes
        if (errors.length === i + 1) {
            errorMessage += `${error.message.replace(/['"]/g, "")}`;
        } else {
            errorMessage += `${error.message.replace(/['"]/g, "")}` + "\n";
        }
    });

    return errorMessage;
};

export const validateRequestBody = (schema, title, opt) => (req, res, next) => {
    const options = opt || {
        abortEarly: false,
    };
    const validation = schema.validate(req.body, options);
    if (validation.error) {
        const errors = validation.error
            ? buildUsefulErrorObject(validation.error.details)
            : null;

        const formattedMessage = validation.error.details.map((item)=>{
            return{
                [item.context.label]: item.message.replace(/['"]/g, "")
            }
        })

        return respondValidationError(res,{
            message:"Required fields missing or invalid",
            details:formattedMessage
        });
        //return respondError(res, 422, title, errors);
    }

    if (!req.value) {
        req.value = {};
    }
    req.value.body = validation.value;
    next();
};



export const validateApiRequestBodyNew = (schema, opt) => (req, res, next) => {
    const options = opt || {
        abortEarly: false,
    };
    const validation = schema.validate(req.body, options);
    if (validation.error) {

        console.log('validation.error',validation.error.details);

        const errors = validation.error
            ? buildUsefulErrorObject(validation.error.details)
            : null;

        const formattedMessage = validation.error.details.map((item)=>{
            return{
                [item.context.label]: item.message.replace(/['"]/g, "")
            }
        })

        return respondValidationError(res,{
            message:"Required fields missing or invalid",
            details:formattedMessage
        });
    }

    if (!req.value) {
        req.value = {};
    }
    req.value.body = validation.value;
    next();
};

export const validateApiRequestBody = (schema, opt) => (req, res, next) => {
    const options = opt || {
        abortEarly: false,
    };
    const validation = schema.validate(req.body, options);
    if (validation.error) {
        const errors = validation.error
            ? buildUsefulErrorObject(validation.error.details)
            : null;

        console.log("errors",errors);

        return respondApiError(res, 422, errors);
    }

    if (!req.value) {
        req.value = {};
    }
    req.value.body = validation.value;
    next();
};

export const validateRequestParams =
    (schema, title, opt) => (req, res, next) => {
        const options = opt || {
            abortEarly: false,
        };

        const validation = schema.validate(req.params, options);
        if (validation.error) {
            const errors = validation.error
                ? buildUsefulErrorObject(validation.error.details)
                : null;
            return respondError(res, 422, title, errors);
        }

        if (!req.value) {
            req.value = {};
        }
        req.value.body = validation.value;
        next();
    };

export const validateRequestQuery =
    (schema, title, opt) => (req, res, next) => {
        const options = opt || {
            abortEarly: false,
        };
        const validation = schema.validate(req.query, options);
        if (validation.error) {
            const errors = validation.error
                ? buildUsefulErrorObject(validation.error.details)
                : null;
            return respondError(res, 422, title, errors);
        }

        if (!req.value) {
            req.value = {};
        }
        req.value.body = validation.value;
        next();
    };

export const requireJsonData = (req, res, next) => {
    if (req.headers["content-type"] !== "application/json") {
        res.status(203).json({
            status: 203,
            message: "Bad Request.",
            error: `Server requires application/json got ${req.headers["content-type"]}`,
            data: [],
        });
    } else {
        next();
    }
};
