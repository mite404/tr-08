type PadProps = {
  color: string;
  isActive: boolean;
  onClick: () => void;
};

export function Pad({ color, isActive, onClick }: PadProps) {
  return (
    <button
      className={`aspect-3/1 cursor-pointer rounded-sm hover:opacity-80 ${color} ${isActive ? "opacity-100" : "opacity-50"} h-[25px] w-full p-1`}
      onClick={onClick}
    ></button>
  );
}
