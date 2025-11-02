type TempoBtnProps = {
  bpmValue: number;
  onClick: () => void;
};

export function SetTempoBtn({ bpmValue, onClick }: TempoBtnProps) {
  return (
    // BPM Display
    <div className="flex gap-2">
      <div
        className={`aspect-3/1 h-10 w-full grow items-center rounded-tl-lg rounded-bl-lg bg-red-950 p-4`}
      >
        <span className="text-sm text-red-600">BPM</span>
        <span className="text-3xl font-bold text-red-600">{bpmValue}</span>
      </div>
      {/* arrow container */}
      <div className="flex flex-col">
        <button className="cursor-pointer rounded-tr-lg bg-gray-500 hover:opacity-80">
          ⇧
        </button>
        <button className="cursor-pointer rounded-br-lg bg-gray-500 hover:opacity-80">
          ⇩
        </button>
      </div>
    </div>
  );
}
