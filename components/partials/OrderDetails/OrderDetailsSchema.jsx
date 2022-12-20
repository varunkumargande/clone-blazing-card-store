import * as yup from "yup";

export const RatingSchema = yup.object().shape({
    shipping: yup.number().required().min(1),
    packaging: yup.number().required().min(1),
    accuracy: yup.number().required().min(1),
    description: yup.string()
    .required("Description is required")
    .min(30, "Description must be atleast of  30 charchters")
    .max(150, "Description must be maximum of  150 charcters"),
});