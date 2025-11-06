type PadProps = {
  color: string;
  isActive: boolean;
  isCurrentStep: boolean;
  is16thNote: boolean;
  onClick: () => void;
};

export function Pad({
  color,
  isActive,
  isCurrentStep,
  is16thNote,
  onClick,
}: PadProps) {
  console.log("current step:", isCurrentStep);

  return (
    <button
      className={`aspect-2/1 cursor-pointer rounded-sm hover:opacity-80 ${color} ${isActive ? "opacity-100" : "opacity-50"} ${isCurrentStep ? "brightness-175" : ""} ${is16thNote ? "brightness-135" : ""} [rounded-[10px] h-[25px] w-full p-2`}
      onClick={onClick}
    ></button>
  );
}
