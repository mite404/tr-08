type ButtonProps = {
  text: string;
  customStyles: string;
  onClick: () => void;
  disabled?: boolean;
};

export function PlayStopBtn({
  text,
  customStyles,
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <div className="rounded-lg bg-yellow-200 p-1">
      <button
        className={`flex aspect-3/1 h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-orange-500 p-6 hover:opacity-80 ${customStyles} ${disabled ? "opacity-50" : ""}`}
        onClick={onClick}
      >
        <div className="flex w-24 flex-col">
          <span className="text-lg leading-tight font-bold text-gray-800">
            START
          </span>
          <div className="border-b-2"></div>
          <span className="text-lg leading-tight font-bold text-gray-800">
            STOP
          </span>
        </div>
      </button>
    </div>
  );
}
