import { colorToCss } from "@/lib/utils";
import { RectangleLayer } from "@/types/canvas";
import React from "react";

interface RectangleProps {
  id: string;
  onPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string | null;
  layer: RectangleLayer;
}

const Rectangle = ({ id, onPointerDown, selectionColor, layer }: RectangleProps) => {
  const { x, y, height, width, fill } = layer;

  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      height={height}
      width={width}
      x={0}
      y={0}
      strokeWidth={1}
      fill={fill ? colorToCss(fill) : "#CCC" }
      stroke={selectionColor || "transparent"}
    />
  );
};

export default Rectangle;
