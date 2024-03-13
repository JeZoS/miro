import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";
import React from "react";

interface ColorPickerProps {
  onChange: (color: Color) => void;
}

const ColorPicker = ({ onChange }: ColorPickerProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200">
      <ColorButton
        onClick={onChange}
        color={{ r: 145, g: 155, b: 205 }}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 200, g: 0, b: 0 }}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 145, g: 35, b: 35 }}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 45, g: 200, b: 20 }}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 100, g: 20, b: 150 }}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 255, g: 255, b: 55 }}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 45, g: 195, b: 205 }}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 255, g: 255, b: 255 }}
      />
    </div>
  );
};

export default ColorPicker;

interface ColorButtonProps {
  onClick: (color: Color) => void;
  color: Color;
}

export const ColorButton = ({ onClick, color }: ColorButtonProps) => {
  return (
    <button
      className="w-8 h-8 items-center justify-center hover:opacity-75 transition"
      onClick={() => onClick(color)}
    >
      <div
        className="h-8 w-8 rounded-md border border-neutral-300"
        style={{
          backgroundColor: colorToCss(color),
        }}
      />
    </button>
  );
};
