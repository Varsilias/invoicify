import { FieldProps } from "formik";

interface InputProps extends FieldProps {
  inputType: string;
  label: string;
  disabled?: boolean;
  readOnly?: boolean;
  min?: number;
}

const Input: React.FC<InputProps> = ({
  field,
  form,
  meta,
  inputType,
  label,
  disabled,
  ...props
}) => {
  // console.log({ field, form, meta, inputType });

  return (
    <div>
      <label
        htmlFor={label}
        className={`${
          meta.touched && meta.error ? "text-invoicify-09" : "text-invoicify-07"
        } text-body-variant pb-2 flex justify-between`}
      >
        <span>{label}</span>
        {meta.touched && meta.error && (
          <span className="text-xs">{meta.error}</span>
        )}
      </label>
      <input
        type={inputType}
        {...field}
        {...props}
        disabled={disabled}
        className={`${
          meta.touched && meta.error
            ? "border-invoicify-09 dark:border-invoicify-09"
            : "border-invoicify-05 dark:border-invoicify-04"
        } ${
          disabled ? "opacity-50" : ""
        } w-full px-5 py-4 outline-none border border-invoicify-05 rounded text-sm-variant dark:text-white dark:bg-invoicify-03`}
      />
    </div>
  );
};

export default Input;
