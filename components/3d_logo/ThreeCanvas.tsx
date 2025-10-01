"use client";

import { Canvas } from "@react-three/fiber";

export type ThreeCanvasProps = React.ComponentProps<typeof Canvas>;

export default function ThreeCanvas({ children, ...props }: ThreeCanvasProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true }}
      shadows
      camera={{ fov: 35, position: [0, 0.8, 5] }}
      {...props}
    >
      {children}
    </Canvas>
  );
}
