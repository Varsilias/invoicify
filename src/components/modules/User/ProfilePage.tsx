import { Field, FieldProps, Form, Formik } from "formik";
import Input from "../../general/forms/Input";
import PrimaryButton from "../../general/buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { updateProfileFormValidation } from "../../general/forms/validation-schema";

const ProfilePage = () => {
  const navigate = useNavigate();

  const initialValues = {
    firstname: "John",
    lastname: "Doee",
    email: "john2@gmail.com",
    street: "123 St. John's street",
    city: "London",
    postCode: "E1 3EZ",
    country: "United Kingdom",
  };

  return (
    <section className="pb-36">
      <div className="py-8 md:py-8 px-8 bg-white dark:bg-invoicify-03 mt-8 rounded-md">
        <h1 className="text-base text-invoicify-01 mb-8">Profile</h1>
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={updateProfileFormValidation}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <div className="flex items-center mb-3 w-full md:space-x-5 flex-wrap md:flex-nowrap">
                  <div className="firstname flex flex-col mb-4 md:basis-1/2 grow md:pr-0">
                    <Field name="firstname">
                      {({ field, form, meta }: FieldProps) => (
                        <Input
                          field={field}
                          form={form}
                          meta={meta}
                          inputType="text"
                          label="Firstname"
                        />
                      )}
                    </Field>
                  </div>

                  <div className="lastname flex flex-col mb-4 md:basis-1/2 grow md:pl-0">
                    <Field name="lastname">
                      {({ field, form, meta }: FieldProps) => (
                        <Input
                          field={field}
                          form={form}
                          meta={meta}
                          inputType="text"
                          label="Lastname"
                        />
                      )}
                    </Field>
                  </div>
                </div>

                <div className="flex items-center mb-3 w-full md:space-x-5 flex-wrap md:flex-nowrap">
                  <div className="email flex flex-col mb-4 md:basis-1/2 grow md:pr-0">
                    <Field name="email">
                      {({ field, form, meta }: FieldProps) => (
                        <Input
                          field={field}
                          form={form}
                          meta={meta}
                          inputType="email"
                          label="E-mail"
                          disabled={true}
                        />
                      )}
                    </Field>
                  </div>

                  <div className="street flex flex-col mb-4 md:basis-1/2 grow md:pl-0">
                    <Field name="street">
                      {({ field, form, meta }: FieldProps) => (
                        <Input
                          field={field}
                          form={form}
                          meta={meta}
                          inputType="text"
                          label="Street"
                        />
                      )}
                    </Field>
                  </div>
                </div>

                <div className="flex items-center mb-3 w-full md:space-x-5 flex-wrap md:flex-nowrap">
                  <div className="city flex flex-col mb-4 md:basis-1/2 grow md:pr-0">
                    <Field name="city">
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

                  <div className="post_code flex flex-col mb-4 md:basis-1/2 grow md:pl-0">
                    <Field name="postCode">
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
                </div>
                <div className="flex items-center mb-3 w-full md:space-x-5 flex-wrap md:flex-nowrap">
                  <div className="country flex flex-col mb-4 md:basis-1/2 grow md:pr-0">
                    <Field name="country">
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

                <div className="hidden md:block md:pb-8 md:space-y-2">
                  <p className="text-invoicify-09 text-body">
                    - All fields must be added
                  </p>
                  <p className="text-invoicify-09 text-body">
                    - All items must be added
                  </p>
                </div>

                <div className="hidden md:flex md:pb-4 space-x-2 w-full items-center justify-end md:space-x-2">
                  <div className="edit_button">
                    <PrimaryButton
                      type="button"
                      className="whitespace-nowrap rounded-3xl hover:bg-invoicify-05 cursor-pointer dark:text-invoicify-05 dark:bg-[#373B53] bg-[#373B53] px-4 py-4 text-invoicify-06"
                      onClick={() => navigate(-1)}
                    >
                      Go Back
                    </PrimaryButton>
                  </div>

                  <div className="mark_paid_button">
                    <PrimaryButton
                      type="submit"
                      className="whitespace-nowrap rounded-3xl cursor-pointer px-6 py-4 text-white bg-invoicify-01"
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
                        className=" whitespace-nowrap rounded-3xl hover:bg-invoicify-05 cursor-pointer dark:text-invoicify-05 dark:bg-[#373B53] bg-[#373B53] px-4 py-4 text-invoicify-06"
                        onClick={() => navigate(-1)}
                      >
                        Go Back
                      </PrimaryButton>
                    </div>

                    <div className="mark_paid_button">
                      <PrimaryButton
                        type="submit"
                        className="whitespace-nowrap rounded-3xl cursor-pointer px-4 py-4 text-white bg-invoicify-01"
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
      </div>
    </section>
  );
};

export default ProfilePage;
