import { Form, FieldArray, FieldProps, Field, Formik } from "formik";
import { ArrowDown, DeleteIcon } from "../../icons";
import { formatDate } from "../../../utils";
import PrimaryButton from "../buttons/PrimaryButton";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect, useMemo } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import { useNavigate } from "react-router-dom";
import { editFormValidationSchema } from "./validation-schema";
import Input from "./Input";
import ReadOnlyInput from "./ReadOnlyInput";
import { handleError } from "../../../utils";
import { Toast } from "../../general/toast/Toast";
import { toast } from "react-toastify";
import useGetInvoiceByPublicId from "../../../hooks/api/invoices/useGetInvoiceByPublicId";
import useUpdateInvoice from "../../../hooks/api/invoices/useUpdateInvoice";
import Modal from "../modal";
import useDeleteInvoiceItem from "../../../hooks/api/invoices/useDeleteInvoiceItem";

const EditInvoiceForm = ({ publicId }: { publicId: string }) => {
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState<Record<string, any>>({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<Record<string, string>>({});

  const { isLoading, mutate: getInvoiceByPublicId } = useGetInvoiceByPublicId({
    onSuccess(data) {
      const res = data?.data;
      setInvoice(res?.data);
    },
    onError(error) {
      handleError(error, (message) => toast(<Toast>{message}</Toast>));
    },
  });

  const { isLoading: updatingInvoice, mutate: updateInvoice } =
    useUpdateInvoice({
      onSuccess(data) {
        const res = data?.data;
        if (!res?.status || res?.status === "error") {
          toast(<Toast type="error">{res?.message}</Toast>);
        } else {
          toast(<Toast type="success">{"Invoice updated successfully"}</Toast>);
          navigate("/");
        }
      },
      onError(error) {
        handleError(error, (message) =>
          toast(<Toast type="error">{message}</Toast>),
        );
      },
    });

  const { isLoading: deletingInvoiceItem, mutate: deleteInvoiceItem } =
    useDeleteInvoiceItem({
      onSuccess(data) {
        const res = data?.data;
        if (!res?.status || res?.status === "error") {
          toast(<Toast type="error">{res?.message}</Toast>);
        } else {
          toast(<Toast type="success">{"Item deleted successfully"}</Toast>);
          setShowModal(false);
        }
      },
      onError(error) {
        handleError(error, (message) =>
          toast(<Toast type="error">{message}</Toast>),
        );
      },
    });

  useEffect(() => {
    getInvoiceByPublicId({ publicId: publicId });
  }, [publicId, getInvoiceByPublicId, showModal]);

  const { ref } = useClickOutside({
    onClickOutside() {
      setShowDropdown(false);
    },
  });

  const dropdown = useMemo(
    () => [
      { text: "Net 1 Day", value: 1 },
      { text: "Net 7 Days", value: 7 },
      { text: "Net 14 Days", value: 14 },
      { text: "Net 30 Days", value: 30 },
    ],
    [],
  );

  const [paymentTerms, setPaymentTerms] = useState(
    dropdown.find(({ value }) => value === invoice.paymentTerms),
  );

  useEffect(() => {
    setPaymentTerms(
      dropdown.find(({ value }) => value === invoice.paymentTerms),
    );
  }, [dropdown, invoice]);

  return !isLoading ? (
    <div>
      <Formik
        initialValues={invoice}
        validationSchema={editFormValidationSchema}
        onSubmit={(values) => {
          delete values.senderAddress;
          delete values.total;
          console.log(values);

          updateInvoice({ ...values });
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
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
                      disabled={true}
                      inputType="text"
                      label="Street Address"
                      className="cursor-not-allowed"
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
                        disabled={true}
                        inputType="text"
                        label="City"
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
                        disabled={true}
                        inputType="text"
                        label="Post Code"
                        className="cursor-not-allowed"
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
                        disabled={true}
                        inputType="text"
                        label="Country"
                        className="cursor-not-allowed"
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
                      inputType="text"
                      label="Client's Email"
                    />
                  )}
                </Field>
              </div>

              <div className="client_street_address flex flex-col mb-6">
                <Field name="clientAddress">
                  {({ field, form, meta }: FieldProps) => (
                    <Input
                      field={field}
                      form={form}
                      meta={meta}
                      inputType="text"
                      label="Street Address"
                    />
                  )}
                </Field>
              </div>

              <div className="flex items-center mb-3 w-full md:space-x-5 flex-wrap md:flex-nowrap">
                <div className="city flex flex-col mb-4 basis-1/2 grow pr-2 md:pr-0">
                  <Field name="clientCity">
                    {({ field, form, meta }: FieldProps) => (
                      <Input
                        field={field}
                        form={form}
                        meta={meta}
                        inputType="text"
                        label="City"
                      />
                    )}
                  </Field>
                </div>

                <div className="post_code flex flex-col mb-4 basis-1/2 grow pl-2 md:pl-0">
                  <Field name="clientPostcode">
                    {({ field, form, meta }: FieldProps) => (
                      <Input
                        field={field}
                        form={form}
                        meta={meta}
                        inputType="text"
                        label="Post Code"
                      />
                    )}
                  </Field>
                </div>

                <div className="country flex flex-col mb-6 md:mb-4 basis-1/2 grow">
                  <Field name="clientCountry">
                    {({ field, form, meta }: FieldProps) => (
                      <Input
                        field={field}
                        form={form}
                        meta={meta}
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
                <div className="invoice_date w-full md:pr-2 flex flex-col mb-6 opacity-60">
                  <Field name="paymentDue">
                    {({ field, form, meta }: FieldProps) => (
                      <Input
                        field={{ ...field, value: formatDate(field.value) }}
                        form={form}
                        meta={meta}
                        inputType="text"
                        label="Invoice Date"
                        disabled={true}
                        readOnly={true}
                        className="cursor-not-allowed"
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
                      onClick={() => setShowDropdown(!showDropdown)}
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
                                    onClick={() => {
                                      const itemToRemove = values.items[index];

                                      if (
                                        !Object.keys(itemToRemove).includes(
                                          "publicId",
                                        )
                                      ) {
                                        arrayHelpers.remove(index);
                                      } else {
                                        setItemToRemove(itemToRemove);
                                        setShowModal(true);
                                      }
                                    }}
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

            <div className="hidden md:flex md:pb-10 justify-end space-x-2 items-center md:justify-end md:space-x-2">
              <div className="edit_button">
                <PrimaryButton
                  type="button"
                  className="rounded-3xl hover:bg-invoicify-05 cursor-pointer dark:text-invoicify-05 dark:bg-invoicify-04 bg-[#F9FAFE] px-6 py-4 text-invoicify-07"
                  onClick={() => {
                    document.body.style.overflow = "";
                    navigate(-1);
                  }}
                >
                  Cancel
                </PrimaryButton>
              </div>

              <div className="mark_paid_button">
                <PrimaryButton
                  type="submit"
                  className="rounded-3xl cursor-pointer px-6 py-4 text-white bg-invoicify-01"
                  isLoading={updatingInvoice}
                >
                  Save Changes
                </PrimaryButton>
              </div>
            </div>

            <div className="md:hidden bg-white drop-shadow-[0_75px_75px_rgba(0,0,0,0.7)] dark:bg-invoicify-03 px-6 py-[22px] fixed bottom-0 h-[91px] left-0 w-full">
              <div className="flex justify-end space-x-2 items-center md:justify-end md:space-x-2">
                <div className="edit_button">
                  <PrimaryButton
                    type="button"
                    className="rounded-3xl hover:bg-invoicify-05 cursor-pointer dark:text-invoicify-05 dark:bg-invoicify-04 bg-[#F9FAFE] px-6 py-4 text-invoicify-07"
                    onClick={() => {
                      document.body.style.overflow = "";
                      navigate(-1);
                    }}
                  >
                    Cancel
                  </PrimaryButton>
                </div>

                <div className="mark_paid_button">
                  <PrimaryButton
                    type="submit"
                    className="rounded-3xl cursor-pointer px-6 py-4 text-white bg-invoicify-01"
                    isLoading={updatingInvoice}
                  >
                    Save Changes
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <Modal showModal={showModal} onClick={() => setShowModal(false)}>
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[80%] md:w-[60%] lg:w-[40%] bg-white p-8 rounded-lg dark:bg-invoicify-03"
        >
          <div>
            <h1 className="text-base-variant mb-2 dark:text-white">
              Confirm Deletion
            </h1>
            <p className="text-body-sm text-invoicify-06">
              {`Are you sure you want to delete the following invoice item **${itemToRemove?.name}**? This action
              cannot be undone.`}
            </p>
            <div className="action_buttons mt-5 flex items-center space-x-2 justify-end">
              <div onClick={() => setShowModal(false)}>
                <PrimaryButton className="bg-[#F9FAFE] px-6 py-4 hover:bg-invoicify-05 text-invoicify-07 dark:text-white dark:bg-invoicify-04">
                  Cancel
                </PrimaryButton>
              </div>

              <PrimaryButton
                className="bg-invoicify-09 px-6 py-4 hover:bg-invoicify-10 text-white"
                isLoading={deletingInvoiceItem}
                onClick={() => {
                  deleteInvoiceItem({
                    publicId: invoice.publicId,
                    itemPublicId: itemToRemove?.publicId,
                  });
                }}
              >
                Delete
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  ) : null;
};

export default EditInvoiceForm;
