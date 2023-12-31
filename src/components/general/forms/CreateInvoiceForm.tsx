import { Form, FieldArray, FieldProps, Field, Formik } from "formik";
import { ArrowDown, DeleteIcon } from "../../icons";
import PrimaryButton from "../buttons/PrimaryButton";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import { useNavigate } from "react-router-dom";
import { createInvoiceFormValidationSchema } from "./validation-schema";
import Input from "./Input";
import ReadOnlyInput from "./ReadOnlyInput";
import useGetProfileDetails from "../../../hooks/api/auth/useGetProfileDetails";
import { handleError } from "../../../utils";
import { Toast } from "../toast/Toast";
import { toast } from "react-toastify";
import useCreateInvoice from "../../../hooks/api/invoices/useCreateInvoice";

const CreateInvoiceForm = () => {
  const navigate = useNavigate();
  const [clickedButton, setClickedButton] = useState<"Save" | "Draft">("Save");
  const [initialValues, setInitialValues] = useState<Record<string, any>>({
    paymentDue: "",
    description: "",
    paymentTerms: "",
    clientName: "",
    clientEmail: "",
    senderAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    items: [
      {
        name: "",
        quantity: 1,
        price: 0,
        total: 0,
      },
    ],
  });
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const senderAddress = initialValues.senderAddress;
    const values = Object.values(senderAddress) as string[];
    const isProfileUpdated = values.every((element) => element !== "");

    if (!isProfileUpdated) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [initialValues, showWarning]);

  const { mutate: getProfileDetails } = useGetProfileDetails({
    onSuccess(data) {
      const res = data?.data;

      setInitialValues((prev) => {
        return {
          ...prev,
          senderAddress: {
            street: res?.data?.street ?? "",
            city: res?.data?.city ?? "",
            postCode: res?.data?.postCode ?? "",
            country: res?.data?.country ?? "",
          },
        };
      });
    },
    onError(error) {
      handleError(error, (message) =>
        toast(<Toast type="error">{message}</Toast>),
      );
    },
  });

  const { isLoading: creatingInvoice, mutate: createInvoice } =
    useCreateInvoice({
      onSuccess(data) {
        const res = data?.data;
        if (!res?.status || res?.status === "error") {
          toast(<Toast type="error">{res?.message}</Toast>);
        } else {
          toast(<Toast type="success">{"Invoice created successfully"}</Toast>);
          navigate("/");
        }
      },
      onError(error) {
        handleError(error, (message) =>
          toast(<Toast type="error">{message}</Toast>),
        );
      },
    });

  useEffect(() => {
    getProfileDetails({});
  }, [getProfileDetails]);

  const { ref } = useClickOutside({
    onClickOutside() {
      setShowDropdown(false);
    },
  });

  const dropdown = [
    { text: "Net 1 Day", value: 1 },
    { text: "Net 7 Days", value: 7 },
    { text: "Net 14 Days", value: 14 },
    { text: "Net 30 Days", value: 30 },
  ];

  const [paymentTerms, setPaymentTerms] = useState({
    text: "Net 1 Day",
    value: 1,
  });
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={createInvoiceFormValidationSchema}
        onSubmit={(values) => {
          const status = clickedButton === "Save" ? "Pending" : "Draft";

          const data = {
            description: values.description,
            status: status,
            clientName: values.clientName,
            clientEmail: values.clientEmail,
            clientAddress: values.clientAddress.street,
            clientCity: values.clientAddress.city,
            clientPostcode: values.clientAddress.postCode,
            clientCountry: values.clientAddress.country,
            paymentDue: values.paymentDue,
            paymentTerms: values.paymentTerms,
            items: values.items,
          };
          createInvoice(data);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            {showWarning ? (
              <div className="hidden md:block md:pb-[43px] md:space-y-2">
                <p className="text-invoicify-09 text-body">
                  - You have to update your profile before you can create a new
                  invoice
                  <span
                    className="text-invoicify-01 ml-1 cursor-pointer"
                    onClick={() => {
                      document.body.style.overflow = "";
                      navigate("/profile");
                    }}
                  >
                    <strong>Update Profile</strong>
                  </span>
                </p>
              </div>
            ) : null}
            {/* Bill From */}
            <section className="bill_from mb-10">
              <h2 className="pb-6 text-sm-variant text-invoicify-01">
                Bill From
              </h2>

              <div className="mb-6 w-full">
                {/* The name props is used to associate each field with an object key in the initial value object */}
                {/* See https://formik.org/docs/api/field */}
                <Field name="senderAddress.street">
                  {({ field, form, meta }: FieldProps) => (
                    <Input
                      field={field}
                      form={form}
                      meta={meta}
                      inputType="text"
                      label="Street Address"
                      disabled={true}
                    />
                  )}
                </Field>
              </div>

              <div className="flex items-center mb-3 w-full md:space-x-5 flex-wrap md:flex-nowrap">
                <div className="city flex flex-col mb-4 basis-1/2 grow pr-2 md:pr-0">
                  <Field name="senderAddress.city">
                    {({ field, form, meta }: FieldProps) => (
                      <Input
                        field={field}
                        form={form}
                        meta={meta}
                        inputType="text"
                        label="City"
                        disabled={true}
                        className="cursor-not-allowed"
                      />
                    )}
                  </Field>
                </div>

                <div className="post_code flex flex-col mb-4 basis-1/2 grow pl-2 md:pl-0">
                  <Field name="senderAddress.postCode">
                    {({ field, form, meta }: FieldProps) => (
                      <Input
                        field={field}
                        form={form}
                        meta={meta}
                        inputType="text"
                        label="Post Code"
                        disabled={true}
                      />
                    )}
                  </Field>
                </div>

                <div className="country flex flex-col mb-6 md:mb-4 basis-1/2 grow">
                  <Field name="senderAddress.country">
                    {({ field, form, meta }: FieldProps) => (
                      <Input
                        field={field}
                        form={form}
                        meta={meta}
                        inputType="text"
                        label="Country"
                        disabled={true}
                      />
                    )}
                  </Field>
                </div>
              </div>
            </section>

            {/* Bill To */}
            <section className="bill_to mb-10">
              <h2 className="pb-6 text-sm-variant text-invoicify-01">
                Bill To
              </h2>

              <div className="client_name flex flex-col mb-6">
                <Field name="clientName">
                  {({ field, form, meta }: FieldProps) => (
                    <Input
                      field={field}
                      form={form}
                      meta={meta}
                      disabled={showWarning}
                      inputType="text"
                      label="Client's Name"
                    />
                  )}
                </Field>
              </div>

              <div className="client_email flex flex-col mb-6">
                <Field name="clientEmail">
                  {({ field, form, meta }: FieldProps) => (
                    <Input
                      field={field}
                      form={form}
                      meta={meta}
                      disabled={showWarning}
                      inputType="text"
                      label="Client's Email"
                    />
                  )}
                </Field>
              </div>

              <div className="client_street_address flex flex-col mb-6">
                <Field name="clientAddress.street">
                  {({ field, form, meta }: FieldProps) => (
                    <Input
                      field={field}
                      form={form}
                      meta={meta}
                      disabled={showWarning}
                      inputType="text"
                      label="Street Address"
                    />
                  )}
                </Field>
              </div>

              <div className="flex items-center mb-3 w-full md:space-x-5 flex-wrap md:flex-nowrap">
                <div className="city flex flex-col mb-4 basis-1/2 grow pr-2 md:pr-0">
                  <Field name="clientAddress.city">
                    {({ field, form, meta }: FieldProps) => (
                      <Input
                        field={field}
                        form={form}
                        meta={meta}
                        disabled={showWarning}
                        inputType="text"
                        label="City"
                      />
                    )}
                  </Field>
                </div>

                <div className="post_code flex flex-col mb-4 basis-1/2 grow pl-2 md:pl-0">
                  <Field name="clientAddress.postCode">
                    {({ field, form, meta }: FieldProps) => (
                      <Input
                        field={field}
                        form={form}
                        meta={meta}
                        disabled={showWarning}
                        inputType="text"
                        label="Post Code"
                      />
                    )}
                  </Field>
                </div>

                <div className="country flex flex-col mb-6 md:mb-4 basis-1/2 grow">
                  <Field name="clientAddress.country">
                    {({ field, form, meta }: FieldProps) => (
                      <Input
                        field={field}
                        form={form}
                        meta={meta}
                        disabled={showWarning}
                        inputType="text"
                        label="Country"
                      />
                    )}
                  </Field>
                </div>
              </div>
            </section>

            <section className="date_info mb-[69px]">
              <div className="md:flex w-full">
                <div className="invoice_date w-full md:pr-2 flex flex-col mb-6">
                  <Field name="paymentDue">
                    {({ field, form, meta }: FieldProps) => (
                      <Input
                        field={field}
                        form={form}
                        meta={meta}
                        disabled={showWarning}
                        inputType="date"
                        label="Invoice Date"
                      />
                    )}
                  </Field>
                </div>

                <div ref={ref} className="relative md:pl-2 w-full">
                  <div className="payment_terms flex flex-col mb-6">
                    <label
                      htmlFor="payment_terms"
                      className="text-body-variant text-invoicify-07 pb-2"
                    >
                      Payment Terms
                    </label>
                    <div
                      className={`${
                        showDropdown ? "border-invoicify-01" : ""
                      } flex px-5 py-4 outline-none border border-invoicify-05 dark:border-invoicify-04 rounded text-sm-variant dark:text-white dark:bg-invoicify-03`}
                      onClick={() =>
                        !showWarning && setShowDropdown(!showDropdown)
                      }
                    >
                      <div id="paymentTerms" className="w-[96%]">
                        {paymentTerms?.text}
                      </div>

                      <div>
                        <ArrowDown />
                      </div>
                    </div>
                  </div>
                  {showDropdown && (
                    <div
                      className="absolute bg-white dark:bg-invoicify-04 -bottom-38 w-full rounded-lg shadow-xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ul>
                        {dropdown.map(({ text, value }) => (
                          <li
                            key={`${text}-${value}`}
                            className="border-b border-b-invoicify-05 dark:border-b-invoicify-03 px-6 py-4 text-sm-variant hover:text-invoicify-01 cursor-pointer dark:text-white dark:hover:text-invoicify-01"
                            onClick={() => {
                              setPaymentTerms({ text, value });
                              setFieldValue("paymentTerms", value);
                              setShowDropdown(false);
                            }}
                          >
                            {text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="project_description flex flex-col mb-6">
                <Field name="description">
                  {({ field, form, meta }: FieldProps) => (
                    <Input
                      field={field}
                      form={form}
                      meta={meta}
                      disabled={showWarning}
                      inputType="text"
                      label="Project Description"
                    />
                  )}
                </Field>
              </div>
            </section>

            <section className="item_list pb-40 md:pb-8">
              <h2 className="pb-6 text-base-variant text-[18px] text-[#777F98]">
                Item List
              </h2>

              <FieldArray
                name="items"
                render={(arrayHelpers: any) => {
                  const items: {
                    name: string;
                    quantity: number;
                    price: number;
                    total: number;
                  }[] = values.items;

                  return (
                    <div>
                      {items && items.length > 0
                        ? items.map((_, index: number) => (
                            <div
                              className="item_name flex flex-col md:flex-row mb-6 md:space-x-5"
                              key={index}
                            >
                              <div className="md:mt-0 md:basis-1/2 md:grow">
                                <Field name={`items[${index}].name`}>
                                  {({ field, form, meta }: FieldProps) => (
                                    <Input
                                      field={field}
                                      form={form}
                                      meta={meta}
                                      disabled={showWarning}
                                      inputType="text"
                                      label="Item Name"
                                    />
                                  )}
                                </Field>
                              </div>

                              <div className="flex space-x-4 items-center mt-6 md:mt-0  w-full">
                                <div className="qty w-[30%] md:w-[25%]">
                                  <div className="qty flex flex-col mb-6">
                                    <Field name={`items[${index}].quantity`}>
                                      {({ field, form, meta }: FieldProps) => (
                                        <Input
                                          field={field}
                                          form={form}
                                          meta={meta}
                                          disabled={showWarning}
                                          inputType="number"
                                          label="Qty."
                                          min={1}
                                        />
                                      )}
                                    </Field>
                                  </div>
                                </div>
                                <div className="price w-[45%] md:w-[45%]">
                                  <div className="price flex flex-col mb-6">
                                    <Field name={`items[${index}].price`}>
                                      {({ field, form, meta }: FieldProps) => (
                                        <Input
                                          field={field}
                                          form={form}
                                          meta={meta}
                                          disabled={showWarning}
                                          inputType="text"
                                          label="Price"
                                        />
                                      )}
                                    </Field>
                                  </div>
                                </div>
                                <div className="total w-[20%] md:w-[20%]">
                                  <div className="total">
                                    <div className="total flex flex-col mb-6">
                                      <label
                                        htmlFor="total"
                                        className="text-body-variant text-invoicify-07 pb-2"
                                      >
                                        Total
                                      </label>
                                      <ReadOnlyInput
                                        name={`items.${index}.total`}
                                        index={index}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="delete cursor-pointer w-[5%]">
                                  <div
                                    className="flex justify-end md:justify-normal"
                                    onClick={() =>
                                      !showWarning && arrayHelpers.remove(index)
                                    }
                                  >
                                    <DeleteIcon />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        : null}

                      <PrimaryButton
                        className="rounded-3xl flex justify-center w-full hover:bg-invoicify-05 cursor-pointer dark:text-invoicify-06 dark:bg-invoicify-04 bg-[#F9FAFE] px-6 py-4 text-invoicify-06"
                        type="button"
                        disabled={showWarning}
                        onClick={() =>
                          arrayHelpers.push({
                            name: "",
                            quantity: 1,
                            price: 0,
                            total: 0,
                          })
                        }
                      >
                        + Add New Item
                      </PrimaryButton>
                    </div>
                  );
                }}
              />
            </section>

            <div className="hidden md:block md:pb-[43px] md:space-y-2">
              <p className="text-invoicify-09 text-body">
                - All fields must be added
              </p>
              <p className="text-invoicify-09 text-body">
                - All items must be added
              </p>
            </div>

            <div className="hidden md:flex md:pb-10 space-x-2 w-full items-center md:space-x-2">
              <div className="edit_button basis-[61.5%]">
                <PrimaryButton
                  type="button"
                  className="rounded-3xl hover:bg-invoicify-05 cursor-pointer dark:text-invoicify-05 dark:bg-invoicify-04 bg-[#F9FAFE] px-6 py-4 text-invoicify-07"
                  onClick={() => {
                    document.body.style.overflow = "";
                    navigate(-1);
                  }}
                  disabled={showWarning}
                >
                  Discard
                </PrimaryButton>
              </div>

              <div className="edit_button">
                <PrimaryButton
                  type="submit"
                  className="whitespace-nowrap rounded-3xl hover:bg-invoicify-05 cursor-pointer dark:text-invoicify-05 dark:bg-[#373B53] bg-[#373B53] px-4 py-4 text-invoicify-06"
                  onClick={() => setClickedButton("Draft")}
                  isLoading={clickedButton === "Draft" && creatingInvoice}
                  disabled={showWarning}
                >
                  Save as Draft
                </PrimaryButton>
              </div>

              <div className="mark_paid_button">
                <PrimaryButton
                  type="submit"
                  className="whitespace-nowrap rounded-3xl cursor-pointer px-6 py-4 text-white bg-invoicify-01"
                  onClick={() => setClickedButton("Save")}
                  isLoading={clickedButton === "Save" && creatingInvoice}
                  disabled={showWarning}
                >
                  Save & Send
                </PrimaryButton>
              </div>
            </div>

            <div className="md:hidden bg-white drop-shadow-[0_75px_75px_rgba(0,0,0,0.7)] dark:bg-invoicify-03 px-6 py-[22px] fixed bottom-0 h-[91px] left-0 w-full">
              <div className="flex items-center justify-between space-x-2">
                <div className="edit_button">
                  <PrimaryButton
                    type="button"
                    className="rounded-3xl hover:bg-invoicify-05 cursor-pointer dark:text-invoicify-05 dark:bg-invoicify-04 bg-[#F9FAFE] px-5 py-4 text-invoicify-07"
                    onClick={() => {
                      document.body.style.overflow = "";
                      navigate(-1);
                    }}
                    disabled={showWarning}
                  >
                    Discard
                  </PrimaryButton>
                </div>

                <div className="edit_button">
                  <PrimaryButton
                    type="submit"
                    className=" whitespace-nowrap rounded-3xl hover:bg-invoicify-05 cursor-pointer dark:text-invoicify-05 dark:bg-[#373B53] bg-[#373B53] px-4 py-4 text-invoicify-06"
                    onClick={() => setClickedButton("Draft")}
                    isLoading={clickedButton === "Draft" && creatingInvoice}
                    disabled={showWarning}
                  >
                    Save as Draft
                  </PrimaryButton>
                </div>

                <div className="mark_paid_button">
                  <PrimaryButton
                    type="submit"
                    className="whitespace-nowrap rounded-3xl cursor-pointer px-4 py-4 text-white bg-invoicify-01"
                    onClick={() => setClickedButton("Save")}
                    isLoading={clickedButton === "Save" && creatingInvoice}
                    disabled={showWarning}
                  >
                    Save & Send
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateInvoiceForm;
