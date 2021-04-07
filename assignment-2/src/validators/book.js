import Validator from "validator"
import isEmpty from "is-empty"

export const validateBookCreateInput = (data) => {
    const errors = {}

    data.name = !isEmpty(data.name) ? data.name : "";
    data.productType = !isEmpty(data.productType) ? data.productType : "";
    data.author = !isEmpty(data.author) ? data.author : "";
    data.publisher = !isEmpty(data.publisher) ? data.publisher : "";
    data.barcode = !isEmpty(data.barcode) ? data.barcode : "";
    data.category = !isEmpty(data.category) ? data.category : [];
    data.price = !isEmpty(data.price) ? data.price : "0";
    data.discount = !isEmpty(data.discount) ? data.discount : "0";
    data.description = !isEmpty(data.description) ? data.description : "";
    data.hidden = !isEmpty(data.hidden) ? data.hidden : false;

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    if (Validator.isEmpty(data.productType)) {
        errors.productType = "Product Type field is required";
    }

    if (Validator.isEmpty(data.author)) {
        errors.author = "Author field is required";
    }

    if (Validator.isEmpty(data.publisher)) {
        errors.publisher = "Publisher field is required";
    }

    if (Validator.isEmpty(data.barcode)) {
        errors.barcode = "Barcode field is required";
    }

    if (isEmpty(data.category)) {
        errors.category = "Category field is required"
    }

    if (!Validator.isNumeric(data.price)) {
        errors.price = "Price field is required";
    }

    if (!Validator.isNumeric(data.discount)) {
        errors.discount = "Discount field is required";
    }

    if (Validator.isEmpty(data.description)) {
        errors.description = "Description field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}

export const validateBookUpdateInput = (data) => {
    const errors = {}
    
    data.name = !isEmpty(data.name) ? data.name : "";
    data.author = !isEmpty(data.author) ? data.author : "";
    data.publisher = !isEmpty(data.publisher) ? data.publisher : "";
    data.category = !isEmpty(data.category) ? data.category : [];
    data.price = !isEmpty(data.price) ? data.price : "0";
    data.discount = !isEmpty(data.discount) ? data.discount : "0";
    data.description = !isEmpty(data.description) ? data.description : "";
    data.hidden = !isEmpty(data.hidden) ? data.hidden : false;

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    if (Validator.isEmpty(data.author)) {
        errors.author = "Author field is required";
    }

    if (Validator.isEmpty(data.publisher)) {
        errors.publisher = "Publisher field is required";
    }

    if (isEmpty(data.category)) {
        errors.category = "Category field is required"
    }

    if (!Validator.isNumeric(data.price)) {
        errors.price = "Price field is required";
    }

    if (!Validator.isNumeric(data.discount)) {
        errors.discount = "Discount field is required";
    }

    if (Validator.isEmpty(data.description)) {
        errors.description = "Description field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}