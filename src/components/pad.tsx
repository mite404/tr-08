import { react } from "react";

type ButtonProps = {
  color: string;
  isActive: boolean;
  onClick: () => void;
};

export function Pad({ color, isActive, onClick }: ButtonProps) {
  return (
    <button
      className={`aspect-2/1 rounded-sm hover:opacity-80 cursor-pointer ${isActive ? "opacity-100" : "opacity-50"} height-[200px] width-[400px] [rounded-[10px]`}
      onClick={onClick}
    >
      pad test
    </button>
  );
}
