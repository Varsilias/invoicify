import { useField, useFormikContext } from "formik";
import { useEffect } from "react";

interface IFormikContext {
  values: any;
  touched: any;
  setFieldValue: any;
}

const ReadOnlyInput: React.FC<{ name: string; index: number }> = (props) => {
  const {
    values: { items },
    touched,
    setFieldValue,
  }: IFormikContext = useFormikContext();

  const [field, _] = useField(props);

  //   console.log({ items, touched });
  //   console.log(props.name);
  //   console.log(items[props.index]);

  useEffect(() => {
    if (
      (items[props.index].quantity && items[props.index].price) ||
      touched?.items?.length > 0
    ) {
      setFieldValue(
        props.name,
        items[props.index].quantity * items[props.index].price
      );
    }
  }, [
    items[props.index].quantity,
    items[props.index].price,
    setFieldValue,
    props.name,
    touched.items,
  ]);

  return (
    <>
      <input
        className="text-sm-variant py-4 outline-none text-invoicify-06 bg-white dark:bg-invoicify-12"
        {...field}
        disabled={true}
        readOnly
      />
    </>
  );
};

export default ReadOnlyInput;
