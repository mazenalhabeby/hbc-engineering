"use client";

import { useEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";

type Props = {
  url?: string;
  /** Normalize the model so its longest side equals this value (world units) */
  targetSize?: number;
  /** Autorotate on/off */
  autoRotate?: boolean;
  /** Radians per frame at 60fps (smaller = slower). Default 0.003 */
  spinSpeed?: number;
  /** Camera distance multiplier (1.0 = tight fit; smaller = closer/bigger; larger = more margin). Default 1.35 */
  frame?: number;
  /** Optional vertical nudge for the final camera lookAt (useful for shadows) */
  yLift?: number;
};

export default function HbcLogo({
  url = "/hbc-logo.glb",
  targetSize = 2.6,
  autoRotate = true,
  spinSpeed = 0.003,
  frame = 1.35,
  yLift = 0,
}: Props) {
  const { scene } = useGLTF(url);
  const group = useRef<THREE.Group>(null);
  const { camera, gl } = useThree();

  // Clone and sanitize materials once
  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((o) => {
      if ((o as THREE.Object3D).type === "Mesh") {
        const mesh = o as THREE.Mesh;
        mesh.castShadow = mesh.receiveShadow = true;
        const mat = mesh.material;
        const mats = Array.isArray(mat) ? mat : [mat];
        mats.forEach((m) => {
          const p = m as THREE.MeshPhysicalMaterial;
          p.transparent = false;
          p.opacity = 1;
          p.depthWrite = true;
          p.depthTest = true;
          if ((p as THREE.MeshPhysicalMaterial).metalness !== undefined)
            p.metalness = 0.35;
          if ((p as THREE.MeshPhysicalMaterial).roughness !== undefined)
            p.roughness = 0.35;
        });
      }
    });
    return clone;
  }, [scene]);

  // Center, scale, tilt a hair, and frame the camera
  useEffect(() => {
    if (!group.current) return;
    group.current.clear();
    group.current.add(model);

    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    model.position.sub(center);
    const longest = Math.max(size.x, size.y, size.z) || 1;
    model.scale.setScalar(targetSize / longest);
    model.rotation.set(0.04, -0.28, 0);

    const sphere = new THREE.Sphere();
    new THREE.Box3().setFromObject(model).getBoundingSphere(sphere);

    if ("fov" in camera) {
      const fov = (camera.fov * Math.PI) / 180;
      const dist = sphere.radius / Math.tan(fov / 2);
      // 🔑 control on-screen size here:
      camera.position.set(sphere.center.x, sphere.center.y, dist * frame);
      camera.lookAt(sphere.center.x, sphere.center.y + yLift, sphere.center.z);
      camera.updateProjectionMatrix();
    } else {
      camera.position.set(
        sphere.center.x,
        sphere.center.y,
        sphere.center.z + targetSize * frame
      );
      camera.lookAt(sphere.center.x, sphere.center.y + yLift, sphere.center.z);
      camera.updateProjectionMatrix();
    }

    gl.outputColorSpace = THREE.SRGBColorSpace;
  }, [model, targetSize, camera, gl, frame, yLift]);

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
