"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";

type Props = {
  url?: string;
  /** Longest model side after normalization (world units) */
  targetSize?: number;
  /** Autorotate toggle */
  autoRotate?: boolean;
  /** Radians/frame at 60fps */
  spinSpeed?: number;
  /** Camera distance multiplier (keep 1.0; use fitPadding to add margin) */
  frame?: number;
  /** Vertical nudge for lookAt */
  yLift?: number;
  /** Extra padding around model (1.10–1.25 is great) */
  fitPadding?: number;
};

export default function HbcLogo({
  url = "/hbc-logo.glb",
  targetSize = 2.6,
  autoRotate = true,
  spinSpeed = 0.003,
  frame = 1.0,
  yLift = 0,
  fitPadding = 1.1,
}: Props) {
  const { scene } = useGLTF(url);
  const group = useRef<THREE.Group>(null);
  const { camera, gl } = useThree();

  // Clone & sanitize materials once
  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = mesh.receiveShadow = true;

      const mats = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];

      mats.forEach((m) => {
        const p = m as THREE.MeshPhysicalMaterial;
        if (p && "metalness" in p) p.metalness = 0.35;
        if (p && "roughness" in p) p.roughness = 0.35;
        p.transparent = false;
        p.opacity = 1;
        p.depthWrite = true;
        p.depthTest = true;
      });
    });
    return clone;
  }, [scene]);

  // Center, scale, slight tilt, frame camera with padding
  useLayoutEffect(() => {
    if (!group.current) return;
    group.current.clear();
    group.current.add(model);

    // center + normalize scale
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    model.position.sub(center);
    const longest = Math.max(size.x, size.y, size.z) || 1;
    model.scale.setScalar(targetSize / longest);
    model.rotation.set(0.04, -0.28, 0);

    // re-measure after scaling
    const sphere = new THREE.Sphere();
    new THREE.Box3().setFromObject(model).getBoundingSphere(sphere);

    // perspective vs ortho
    const isPerspective =
      (camera as THREE.PerspectiveCamera).isPerspectiveCamera === true;

    if (isPerspective) {
      const cam = camera as THREE.PerspectiveCamera;
      const fov = (cam.fov * Math.PI) / 180;
      const dist = (sphere.radius * fitPadding) / Math.tan(fov / 2);
      cam.position.set(sphere.center.x, sphere.center.y, dist * frame);
      cam.lookAt(sphere.center.x, sphere.center.y + yLift, sphere.center.z);
      cam.updateProjectionMatrix();
    } else {
      const cam = camera as THREE.OrthographicCamera;
      cam.position.set(
        sphere.center.x,
        sphere.center.y,
        sphere.center.z + targetSize * frame * fitPadding
      );
      cam.lookAt(sphere.center.x, sphere.center.y + yLift, sphere.center.z);
      cam.updateProjectionMatrix();
    }

    gl.outputColorSpace = THREE.SRGBColorSpace;
  }, [model, targetSize, camera, gl, frame, yLift, fitPadding]);

  // Gentle autorotate
  useEffect(() => {
    if (!autoRotate) return;
    let raf = 0;
    const tick = () => {
      if (group.current) group.current.rotation.y += spinSpeed;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [autoRotate, spinSpeed]);

  if (!scene) {
    return (
      <Html center>
        <div className="rounded-xl bg-white/80 px-3 py-2 text-sm text-slate-700 shadow">
          Loading logo…
        </div>
      </Html>
    );
  }

  return <group ref={group} />;
}

useGLTF.preload("/hbc-logo.glb");
