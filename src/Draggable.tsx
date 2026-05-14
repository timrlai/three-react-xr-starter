import { useRef, type JSX } from "react";
import { type Group, Plane, Vector3 } from "three";

type DraggableProps = {
  position?: [number, number, number];
  children: JSX.Element;
};

export default function Draggable({
  position = [0, 0, 0],
  children,
}: DraggableProps) {
  const isDraggingRef = useRef(false);
  const groupRef = useRef<Group>(null);

  const intersectedPlane = new Plane(new Vector3(0, 0, 1), 1);
  const targetPosition = new Vector3();

  return (
    <group
      ref={groupRef}
      onPointerDown={(e) => {
        isDraggingRef.current = true;
        e.ray.intersectPlane(intersectedPlane, targetPosition);
        groupRef.current?.position.copy(targetPosition);
      }}
      onPointerMove={(e) => {
        if (!isDraggingRef.current) return;
        e.ray.intersectPlane(intersectedPlane, targetPosition);
        groupRef.current?.position.copy(targetPosition);
      }}
      onPointerUp={() => (isDraggingRef.current = false)}
      position={position}
    >
      {children}
    </group>
  );
}
