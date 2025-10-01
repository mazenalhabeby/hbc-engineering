"use client";

import { Environment } from "@react-three/drei";
import HbcLogo from "./HbcLogo";
import React from "react";

interface LogoStageProps {
  targetSize?: number;
  spinSpeed?: number;
  frame?: number;
  yLift?: number;
}

export default function LogoStage({
  targetSize = 4.0,
  spinSpeed = 0.008,
  frame = 0.8,
  yLift = 0.1,
}: LogoStageProps) {
  return (
    <React.Fragment>
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
        targetSize={targetSize} // try 4.0
        spinSpeed={spinSpeed} // try 0.005
        frame={frame} // closer (1.35 is your default). Try 0.9 → 0.85
        yLift={yLift} // (optional) nudge up a bit if it looks low
      />
    </React.Fragment>
  );
}
