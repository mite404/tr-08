type ButtonProps = {
  text: string;
  onClick: () => void;
};

export function Button({ text, onClick }: ButtonProps) {
  return (
    <button
      className={`aspect-3/1 h-10 w-full cursor-pointer rounded-sm bg-gray-500 p-4 hover:opacity-80`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
