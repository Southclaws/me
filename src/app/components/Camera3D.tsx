"use client";

import { Environment, Lightformer } from "@react-three/drei";
import {
  Canvas,
  extend,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import {
  BallCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

extend({ MeshLineGeometry, MeshLineMaterial });

type Props = {
  onProgress: (event: ProgressEvent<EventTarget>) => void;
};

export function Camera3D(props: Props) {
  return (
    <Canvas>
      <Physics gravity={[0, -9.81, 0]}>
        <Band {...props} />
      </Physics>

      <Environment background blur={0.75}>
        <color attach="background" args={["black"]} />
        <Lightformer
          intensity={180}
          color="red"
          position={[0, 1, 3]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={60}
          color="blue"
          position={[-1, 0, 1]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={3}
          color="white"
          position={[-10, 0, 14]}
          rotation={[0, Math.PI / 2, Math.PI / 3]}
          scale={[100, 10, 1]}
        />
      </Environment>
    </Canvas>
  );
}

function Band(props: Props) {
  const cameraMesh = useLoader(
    GLTFLoader,
    "/sonya7sii.glb",
    undefined,
    props.onProgress
  );

  // References for the band and the joints
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);

  const camera = useRef<any>(null);
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const [dragged, drag] = useState<THREE.Vector3 | undefined>(undefined);

  // Canvas size
  const { width, height } = useThree((state) => state.size);

  // A Catmull-Rom curve
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.5]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.5]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.5]);

  useSphericalJoint(j3, camera, [
    [0, 0, 0],
    [0, 0, 0],
  ]);

  useFrame((state) => {
    if (!camera.current) return;

    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));

      camera.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    // Calculate Catmull curve
    curve.points[0].copy(j3.current.translation());
    curve.points[1].copy(j2.current.translation());
    curve.points[2].copy(j1.current.translation());
    curve.points[3].copy(fixed.current.translation());
    band.current.geometry.setPoints(curve.getPoints(32));

    // Tilt the camera back towards the screen
    ang.copy(camera.current.angvel());
    rot.copy(camera.current.rotation());
    camera.current.setAngvel({
      x: ang.x,
      y: ang.y,
      z: ang.z,
    });
  });

  const damping = {
    angularDamping: 0.5,
    linearDamping: 0.5,
    canSleep: false,
  };

  return (
    <>
      <RigidBody position={[0, 4, 0]} ref={fixed} type="fixed" />
      <RigidBody {...damping} position={[0, 0, 0]} ref={j1}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody {...damping} position={[1, 0, 0]} ref={j2}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody {...damping} position={[1.5, 0, 0]} ref={j3}>
        <BallCollider args={[0.1]} />
      </RigidBody>

      <mesh ref={band}>
        {/* @ts-ignore */}
        <meshLineGeometry />
        {/* @ts-ignore */}
        <meshLineMaterial
          color="#1e1e1e"
          resolution={[width, height]}
          lineWidth={0.05}
        />
      </mesh>

      <RigidBody
        {...damping}
        ref={camera}
        type={dragged ? "kinematicPosition" : "dynamic"}
        colliders={undefined}
      >
        <mesh
          scale={[0.02, 0.02, 0.02]}
          onPointerUp={(e) => drag(undefined)}
          onPointerDown={(e) =>
            drag(
              new THREE.Vector3()
                .copy(e.point)
                .sub(vec.copy(camera.current.translation()))
            )
          }
        >
          <primitive object={cameraMesh.scene} />
        </mesh>
      </RigidBody>
    </>
  );
}
