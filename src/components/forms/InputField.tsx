import { FieldError } from "react-hook-form";
import {Input} from "@nextui-org/react";

type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  inputProps,
}: InputFieldProps) => {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap">
      <Input
        
        type={type}
        label={label}
        {...register(name)}
        //className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        {...inputProps}
        defaultValue={defaultValue}
        isInvalid={error?.message == undefined ? false : true}
        errorMessage={error?.message}
      />
      {/* {error?.message && (
        <p className="text-xs text-red-400">{error.message.toString()}</p>
      )} */}
    </div>
  );
};

export default InputField;