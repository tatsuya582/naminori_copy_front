import { type Path, type FieldValues, type UseFormReturn } from "react-hook-form";

export type FormFields<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  placeholder?: string;
  type?: string;
  children?: React.ReactNode;
};

export type SelectFieldProps<T extends FieldValues> = FormFields<T> & {
  options?: string[];
};
