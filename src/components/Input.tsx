import type { ComponentProps } from "react";

export type InputProps = ComponentProps<"input"> & {
  label?: string;
};

export default function Input(props: InputProps) {
  return (
    <div className="flex w-full flex-col gap-1">
      {props.label && (
        <label className="text-sm font-medium">{props.label}</label>
      )}
      <input
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-blue-500 ${props.className}`}
        {...props}
      />
    </div>
  );
}
