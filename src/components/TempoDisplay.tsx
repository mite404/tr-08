type TempoBtnProps = {
  bpmValue: number;
  onClick: () => void;
};

export function TempoDisplay({ bpmValue, onClick }: TempoBtnProps) {
  return (
    // BPM Display
    <div className="flex">
      <div
        className={`h-10 grow items-center rounded-tl-lg rounded-bl-lg bg-red-950 px-4`}
      >
        <span className="text-sm text-red-600">BPM</span>
        <span className="text-3xl font-bold text-red-600">{bpmValue}</span>
      </div>

      {/* arrow container */}
      <div className="flex h-10 flex-col">
        <button className="flex h-1/2 w-10 cursor-pointer items-center justify-center rounded-tr-lg bg-gray-500 p-0 text-sm select-none hover:opacity-80">
          ⇧
        </button>
        <button className="flex h-1/2 w-10 cursor-pointer items-center justify-center rounded-br-lg bg-gray-500 p-0 select-none hover:opacity-80">
          ⇩
        </button>
      </div>
    </div>
  );
}
