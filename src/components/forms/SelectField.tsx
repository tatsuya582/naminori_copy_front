import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { type FieldValues } from "react-hook-form";
import { type SelectFieldProps } from "@/type";

// SelectItemはoptionsで渡すか、childrenで渡すかしてください。
// optionsは文字列の配列で、childrenはReactNodeを受け取ります。
// childrenを使用する場合は、SelectItemを直接渡すことができます。
// optionsを使用する場合は、文字列の配列を渡すと、SelectItemが自動的に生成されます。
// 両方使う場合は、childrenが先に表示されます。
const SelectField = <T extends FieldValues>({ form, name, placeholder, options, children }: SelectFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-full py-6">
                <SelectValue
                  placeholder={placeholder}
                  {...field}
                  className="block w-full py-3 px-3 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {children}
              {options?.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectField;
