import type { ComponentProps } from "react";

export type ButtonProps = ComponentProps<"button">;

export default function Button(props: ButtonProps) {
  return (
    <button
      className="w-fit bg-blue-600 text-gray-50 py-2 px-4 rounded-md hover:bg-blue-500 transition font-medium"
      {...props}
    />
  );
}
