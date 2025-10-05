"use client";

import { Environment } from "@react-three/drei";
import HbcLogo from "./HbcLogo";
import React from "react";

interface LogoStageProps {
  targetSize?: number;
  spinSpeed?: number;
  frame?: number;
  yLift?: number;
  fitPadding?: number;
}

export default function LogoStage({
  targetSize = 4.0,
  spinSpeed = 0.006,
  frame = 1.0,
  yLift = 0.1,
  fitPadding = 1.1,
}: LogoStageProps) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3.5, 5, 6]} intensity={1.2} castShadow />
      <directionalLight
        position={[-6, 2, -2]}
        intensity={0.55}
        color="#bfd9ff"
      />
      <Environment preset="studio" />

      <HbcLogo
        url="/hbc-logo.glb"
        targetSize={targetSize}
        spinSpeed={spinSpeed}
        frame={frame}
        yLift={yLift}
        fitPadding={fitPadding}
      />
    </>
  );
}
