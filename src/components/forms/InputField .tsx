import { FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { type FieldValues } from "react-hook-form";
import { type FormFields } from "@/type";

// errormessageはchildrenで渡すことができます。
const InputField = <T extends FieldValues>({ form, name, placeholder, type, children }: FormFields<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              className="py-6 px-3 flex-1 border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            />
          </FormControl>
          {children}
        </FormItem>
      )}
    />
  );
};

export default InputField;
