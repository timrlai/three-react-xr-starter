import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { useState } from "react";
import Draggable from "./Draggable";

const store = createXRStore();

export default function App() {
  const [red, setRed] = useState(false);
  return (
    <main>
      <nav id="xr-button-container">
        <button onClick={() => store.enterAR()}>Enter AR</button>
        {/* <button onClick={() => store.enterVR()}>Enter VR</button> */}
      </nav>
      <Canvas>
        <XR store={store}>
          <Draggable position={[0, 1, -2]}>
            <mesh
              pointerEventsType={{ deny: "grab" }}
              onClick={() => setRed(!red)}
            >
              <boxGeometry />
              <meshBasicMaterial color={red ? "red" : "blue"} />
            </mesh>
          </Draggable>
        </XR>
      </Canvas>
    </main>
  );
}
