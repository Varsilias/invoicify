import * as Yup from "yup";

export const editFormValidationSchema = Yup.object().shape({
  description: Yup.string().required("can't be empty"),
  paymentTerms: Yup.mixed()
    .oneOf([1, 7, 14, 30])
    .required("payment terms must be either 1, 7, 14, or 30 days"),
  clientName: Yup.string().required("can't be empty"),
  clientEmail: Yup.string()
    .email("must be an email")
    .required("can't be empty"),
  senderAddress: Yup.object().shape({
    street: Yup.string().required("can't be empty"),
    city: Yup.string().required("can't be empty"),
    postCode: Yup.string().required("can't be empty"),
    country: Yup.string().required("can't be empty"),
  }),
  clientAddress: Yup.object().shape({
    street: Yup.string().required("can't be empty"),
    city: Yup.string().required("can't be empty"),
    postCode: Yup.string().required("can't be empty"),
    country: Yup.string().required("can't be empty"),
  }),
  items: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("item name is required"),
      quantity: Yup.number()
        .positive("must be positive")
        .required("quantity is required"),
      price: Yup.number()
        .positive("must be positive")
        .required("unit price is required"),
    })
  ),
});
