type ButtonProps = {
  color: string;
  isActive: boolean;
  onClick: () => void;
};

export function Pad({ color, isActive, onClick }: ButtonProps) {
  return (
    <button
      className={`aspect-2/1 rounded-sm hover:opacity-80 cursor-pointer ${color} ${isActive ? "opacity-100" : "opacity-50"} height-[300px] width-[600px] [rounded-[10px] p-2`}
      onClick={onClick}
    ></button>
  );
}
