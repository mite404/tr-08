type ButtonProps = {
  text: string;
  onClick: () => void;
};

export function Button({ text, onClick }: ButtonProps) {
  return (
    <button
      className={`flex aspect-3/1 h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-gray-500 p-4 hover:opacity-80`}
      onClick={onClick}
    >
      <span className="text-xl font-bold text-gray-800">{text}</span>
    </button>
  );
}
