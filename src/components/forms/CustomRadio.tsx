import { RadioGroup, Radio, useRadio, VisuallyHidden, RadioProps, cn } from "@nextui-org/react";

export const CustomRadio = (props: RadioProps) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "group inline-flex items-center justify-between hover:bg-content2 flex-row-reverse",
          "w-full cursor-pointer border-2 border-default rounded-lg gap-4 p-2",
          "data-[selected=true]:border-primary",
        ),
      }}
    >
      {children}
    </Radio>
  );
};

