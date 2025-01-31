import { useThree, RootState } from "@react-three/fiber";
import { useEffect } from "react";

export function CanvasEffects() {
  const renderer = useThree((state: RootState) => state.gl);

  useEffect(() => {
    renderer.localClippingEnabled = true;
    return () => {
      renderer.localClippingEnabled = false;
    };
  }, [renderer]);

  return null;
}
