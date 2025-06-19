import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls } from "@react-three/drei";
import { useSpiralClimate } from "../SpiralWeave";
import { useMicrophoneLevel } from "../hooks/useMicrophoneLevel";

export default function Spiral3D() {
  const { currentPulse } = useSpiralClimate();
  const mic = useMicrophoneLevel();
  const groupRef = useRef();
  const [glyphs, setGlyphs] = useState([]);

  useEffect(() => {
    if (mic > 0.5) {
      const newGlyph = {
        id: Date.now(),
        color: `hsl(${currentPulse % 360}, 80%, 60%)`,
        size: 0.3 + mic,
        position: { x: Math.random() * 4 - 2, y: Math.random() * 4 - 2, z: Math.random() * 4 - 2 },
      };
      setGlyphs((prev) => [...prev, newGlyph]);

      fetch("http://localhost:3000/relics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seed: "Voice Glyph",
          color: newGlyph.color,
          size: newGlyph.size,
          x: newGlyph.position.x,
          y: newGlyph.position.y,
          z: newGlyph.position.z,
        }),
      });
    }
  }, [mic]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("🌀 WebSocket connected");
    };

    ws.onmessage = (event) => {
      const chunk = event.data;
      console.log("🎤 Mic data received:", chunk);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => ws.close();
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 65 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 10, 10]} />
      <group ref={groupRef}>
        {/* Render glyphs */}
        {glyphs.map((glyph) => (
          <Sphere key={glyph.id} args={[glyph.size, 32, 32]} position={[glyph.position.x, glyph.position.y, glyph.position.z]}>
            <meshStandardMaterial
              color={glyph.color}
              emissive={glyph.color}
              emissiveIntensity={0.6}
              opacity={0.85}
              transparent
            />
          </Sphere>
        ))}
      </group>
      <OrbitControls />
    </Canvas>
  );
}