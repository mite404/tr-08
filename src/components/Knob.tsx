import { useState, useEffect } from "react";

type KnobProps = {
  rotationAngle: number;
  onDrag: (newAngle: number) => void;
};

export function Knob({ rotationAngle, onDrag }: KnobProps) {
  const [isDragging, setIsDragging] = useState(false);
  const knobLineOffset = -130;
  const renderKnob = rotationAngle + knobLineOffset;
  const maxKnobVal = 256;
  const minKnobVal = 10;

  useEffect(() => {
    function handleWindowMouseMove(event: MouseEvent) {
      let newAngle = rotationAngle + event.movementY;

      // possible oneliner solution: newAngle = Math.max(10, Math.min(270, newAngle))
      if (newAngle > maxKnobVal) {
        newAngle = maxKnobVal;
      } else if (newAngle < minKnobVal) {
        newAngle = minKnobVal;
      }

      onDrag(newAngle);
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
  }, [isDragging, onDrag, rotationAngle]); // rotationAngle needed to be added for fresh value

  function handleMouseDown() {
    setIsDragging(true);
  }

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900">
      <div
        className="flex h-10 w-10 cursor-pointer justify-center rounded-full bg-amber-500"
        style={{ transform: `rotate(${renderKnob}deg)` }}
        onMouseDown={handleMouseDown}
      >
        <div className="h-4 w-2 bg-black"></div>
      </div>
    </div>
  );
}
