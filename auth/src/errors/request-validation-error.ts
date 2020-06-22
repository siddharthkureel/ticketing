import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
    statusCode = 400;
    public errors: ValidationError[]
    constructor(errors: ValidationError[]){
        super('invalid parameter');
        this.errors = errors
        // to bind protoype explicitly when converting to es5
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors() {
        return this.errors.map(err=>{
            return { message: err.msg, field: err.param }
        })
    }
}