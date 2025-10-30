import type { ComponentProps } from "react";

export type ButtonProps = ComponentProps<"button">;

export default function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={`w-fit bg-blue-600 text-gray-50 flex items-center gap-2 h-[36px] px-[12px] rounded-md hover:bg-blue-700 transition font-medium text-sm  ${props.className}`}
    />
  );
}
