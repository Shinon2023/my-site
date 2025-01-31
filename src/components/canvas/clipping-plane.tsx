import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export function CanvasEffects() {
  const renderer = useThree((state) => state.gl);

  useEffect(() => {
    renderer.localClippingEnabled = true;
    return () => {
      renderer.localClippingEnabled = false;
    };
  }, [renderer]);

  return null;
}
