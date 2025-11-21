import { useState, useEffect } from "react";
import { getAngleFromDb, getDbFromAngle, clampAngle } from "../utils/helpers";

type KnobProps = {
  _trackIndex: number;
  inputDb: number;
  onDbChange: (newDbValue: number) => void;
};

const KNOB_LINE_OFFSET = -130;

// @ts-expect-error _trackIndex is intentionally unused for semantic clarity
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Knob({ _trackIndex, inputDb, onDbChange }: KnobProps) {
  const [isDragging, setIsDragging] = useState(false);

  const rotationAngle = getAngleFromDb(inputDb);
  const renderKnob = rotationAngle + KNOB_LINE_OFFSET;

  function handleMouseDown() {
    setIsDragging(true);
  }

  useEffect(() => {
    function handleWindowMouseMove(event: MouseEvent) {
      // allows new angle with full movement unclamped
      const newAngle = rotationAngle - event.movementY;

      const clampedAngle = clampAngle(newAngle);

      // convert clamped angle back to dB
      const newDb = getDbFromAngle(clampedAngle);
      // console.log("dbValue: ", newDb, "rotationAngle: ", newAngle);

      onDbChange(newDb); // 🔥 Fires repeatedly during drag
    }

    function handleWindowMouseUp() {
      setIsDragging(false);
    }

    if (isDragging) {
      window.addEventListener("mousemove", handleWindowMouseMove);
      window.addEventListener("mouseup", handleWindowMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, [isDragging, rotationAngle, onDbChange]); // rotationAngle needed to be added for fresh value

  return (
    <div className="pb-1">
      <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-gray-900">
        <div
          className="flex h-5 w-5 cursor-pointer justify-center rounded-full bg-amber-500"
          style={{ transform: `rotate(${renderKnob}deg)` }}
          onMouseDown={handleMouseDown}
        >
          {/* black line on knob */}
          <div className="h-2 w-1 bg-black"></div>
        </div>
      </div>
    </div>
  );
}
