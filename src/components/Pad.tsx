type PadProps = {
  color: string;
  isActive: boolean;
  isCurrentStep: boolean;
  onClick: () => void;
};

export function Pad({ color, isActive, isCurrentStep, onClick }: PadProps) {
  console.log("current step:", isCurrentStep);

  return (
    <button
      className={`aspect-3/1 cursor-pointer rounded-sm hover:opacity-80 ${color} ${isActive ? "opacity-100" : "opacity-50"} ${isCurrentStep ? "brightness-175" : ""} [rounded-[10px] h-[25px] w-full p-2`}
      onClick={onClick}
    ></button>
  );
}
// aspect-2/1 rounded-sm hover:opacity-80 cursor-pointer ${color} ${isActive ? "opacity-100" : "opacity-50"} height-[200px] width-[400px] [rounded-[10px] p-2
