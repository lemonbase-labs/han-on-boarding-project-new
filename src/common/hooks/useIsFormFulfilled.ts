import { FormProps } from "antd";
import { useState } from "react";

export const useIsFormFulfilled = () => {
  const [fulfilled, setFulfilled] = useState(false);

  const onFieldsChange: FormProps["onFieldsChange"] = (_, fields) => {
    const fulfilled = fields.every(({ value }) => !!value);
    setFulfilled(fulfilled);
  };

  return { fulfilled, onFieldsChange };
};
