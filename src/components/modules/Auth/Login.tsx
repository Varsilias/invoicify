import { Field, FieldProps, Form, Formik } from "formik";
import Input from "../../general/forms/Input";
import PrimaryButton from "../../general/buttons/PrimaryButton";
import { Link } from "react-router-dom";
import { loginFormValidation } from "../../general/forms/validation-schema";

const Login = () => {
  const initialValues = {
    password: "",
    email: "",
  };

  return (
    <section className="pb-36">
      <div className="py-8 md:py-8 px-8 bg-white dark:bg-invoicify-03 mt-8 rounded-md">
        <h1 className="text-base text-invoicify-01 mb-8">Login</h1>
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={loginFormValidation}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {() => (
              <Form>
                <div className="email flex flex-col mb-4 md:basis-1/2 grow md:pr-0">
                  <Field name="email">
                    {({ field, form, meta }: FieldProps) => (
                      <Input
                        field={field}
                        form={form}
                        meta={meta}
                        inputType="email"
                        label="E-mail"
                      />
                    )}
                  </Field>
                </div>

                <div className="password flex flex-col mb-4 md:basis-1/2 grow md:pl-0">
                  <Field name="password">
                    {({ field, form, meta }: FieldProps) => (
                      <Input
                        field={field}
                        form={form}
                        meta={meta}
                        inputType="password"
                        label="Password"
                      />
                    )}
                  </Field>
                </div>

                <div className="hidden md:block md:pb-8 md:space-y-2">
                  <p className="text-invoicify-09 text-body">
                    - All fields are required
                  </p>
                </div>

                <div className="hidden md:flex md:pb-4 space-x-2 w-full items-center justify-end md:space-x-2">
                  <div className="edit_button">
                    <Link
                      className="whitespace-nowrap hover:text-invoicify-05 hover:underline cursor-pointer dark:text-invoicify-05 px-4 py-4 text-invoicify-06"
                      to={"/auth/sign-up"}
                    >
                      Not yet a user? Sign up instead!
                    </Link>
                  </div>

                  <div className="mark_paid_button">
                    <PrimaryButton
                      type="submit"
                      className="whitespace-nowrap rounded-3xl cursor-pointer px-6 py-4 text-white bg-invoicify-01"
                    >
                      Login
                    </PrimaryButton>
                  </div>
                </div>

                <div className="md:hidden bg-white drop-shadow-[0_75px_75px_rgba(0,0,0,0.7)] dark:bg-invoicify-03 px-6 py-[22px] fixed bottom-0 h-[91px] left-0 w-full">
                  <div className="flex items-center justify-between space-x-2">
                    <div className="edit_button">
                      <Link
                        className="whitespace-nowrap hover:text-invoicify-05 hover:underline cursor-pointer dark:text-invoicify-05 px-4 py-4 text-invoicify-06"
                        to={"/auth/sign-up"}
                      >
                        Sign up instead!
                      </Link>
                    </div>

                    <div className="mark_paid_button">
                      <PrimaryButton
                        type="submit"
                        className="whitespace-nowrap rounded-3xl cursor-pointer px-4 py-4 text-white bg-invoicify-01"
                      >
                        Login
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

export default Login;
