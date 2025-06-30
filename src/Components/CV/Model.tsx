import { useStore } from "@/Hooks/useStore";
import { Quaternion, Vector3 } from "three";
import { useMemo } from "react";

interface ConnectorProps {
  start: Vector3;
  end: Vector3;
  color?: string;
  radius?: number;
  opacity?: number;
}

export const Connector = ({
  start,
  end,
  color = "skyblue",
  radius = 0.07,
  opacity = 0.7,
}: ConnectorProps) => {
  const position = useMemo(() => {
    return new Vector3().addVectors(start, end).multiplyScalar(0.5);
  }, [start, end]);

  const rotation = useMemo(() => {
    const dir = new Vector3().subVectors(end, start).normalize();
    const axis = new Vector3(0, 1, 0);
    return new Quaternion().setFromUnitVectors(axis, dir);
  }, [start, end]);

  return (
    <mesh position={position} quaternion={rotation}>
      <cylinderGeometry args={[radius, radius, start.distanceTo(end)]} />
      <meshStandardMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
};

const Model = () => {
  const { frame } = useStore();
  if (Object.keys(frame).length === 0) return null;

  type LandmarkKey = keyof typeof frame;
  const getPoint = (idx: LandmarkKey) => new Vector3(...frame[idx]);

  return (
    <>
      {Object.values(frame).map((point, i) => (
        <mesh key={i} position={new Vector3(...point)}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="orange" transparent opacity={0.7} />
        </mesh>
      ))}
      <Connector start={getPoint("LEFT_SHOULDER")} end={getPoint("RIGHT_SHOULDER")} />
      <Connector start={getPoint("LEFT_SHOULDER")} end={getPoint("LEFT_ELBOW")} />
      <Connector start={getPoint("LEFT_ELBOW")} end={getPoint("LEFT_WRIST")} />
      <Connector start={getPoint("RIGHT_SHOULDER")} end={getPoint("RIGHT_ELBOW")} />
      <Connector start={getPoint("RIGHT_ELBOW")} end={getPoint("RIGHT_WRIST")} />
      <Connector start={getPoint("LEFT_HIP")} end={getPoint("RIGHT_HIP")} />
      <Connector start={getPoint("LEFT_HIP")} end={getPoint("LEFT_KNEE")} />
      <Connector start={getPoint("LEFT_KNEE")} end={getPoint("LEFT_ANKLE")} />
      <Connector start={getPoint("RIGHT_HIP")} end={getPoint("RIGHT_KNEE")} />
      <Connector start={getPoint("RIGHT_KNEE")} end={getPoint("RIGHT_ANKLE")} />
    </>
  );
};

export default Model;
