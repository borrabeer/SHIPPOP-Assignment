import Validator from "validator"
import isEmpty from "is-empty"

export const validateRegisterInput = (data) => {
    const errors = {}

    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";
    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    
    if (Validator.isEmpty(data.username)) {
        errors.username = "Username field is required";
    }
    
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "Confirm password field is required";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = "Passwords must match";
    }

    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "First name field is required";
    }

    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = "Last name field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}