import { cn, colorToCss } from "@/lib/utils";
import { useMutation } from "@/liveblocks.config";
import { TextLayer } from "@/types/canvas";
import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

const caclulateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.5;
  const fontSizebaseOnHeight = height * scaleFactor;
  const fontSizebaseOnWidth = width * scaleFactor;
  return Math.min(fontSizebaseOnHeight, fontSizebaseOnWidth, maxFontSize);
};

interface TextProps {
  id: string;
  layer: TextLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string | null;
}

const Text = ({ id, layer, onPointerDown, selectionColor }: TextProps) => {
  const { x, y, width, height, fill, value } = layer;

  const updateValue = useMutation(({ storage }, newValue) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handlerContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  }

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
      }}
    >
      <ContentEditable
        html={value || "Text"}
        className={cn(
          "w-full h-full flex items-center justify-center text-center drop-shadow-md outline-none",
          font.className
        )}
        style={{
          color: fill ? colorToCss(fill) : "#000",
          fontSize: caclulateFontSize(width, height),
        }}
        onChange={handlerContentChange}
      />
    </foreignObject>
  );
};

export default Text;
