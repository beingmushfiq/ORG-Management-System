"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface NodeData {
  position: [number, number, number];
  name: string;
  level: string;
  size: number;
  color: string;
}

function BranchNodes({ onHoverNode }: { onHoverNode: (node: NodeData | null) => void }) {
  const groupRef = useRef<THREE.Group>(null);

  // Generate hierarchical 3D spatial points
  const nodes = useMemo<NodeData[]>(() => {
    return [
      // Central HQ
      { position: [0, 0, 0], name: "Central Secretariat", level: "HQ", size: 0.28, color: "#f59e0b" },
      // Division Nodes
      { position: [2.2, 0.8, 0.5], name: "Chattogram Division", level: "Division", size: 0.18, color: "#3b82f6" },
      { position: [-2.0, 1.2, -0.6], name: "Dhaka Division", level: "Division", size: 0.18, color: "#3b82f6" },
      { position: [0.5, -1.8, 1.2], name: "Sylhet Division", level: "Division", size: 0.18, color: "#3b82f6" },
      { position: [-1.4, -1.5, -1.0], name: "Rajshahi Division", level: "Division", size: 0.18, color: "#3b82f6" },
      // Unit Branches under Chattogram
      { position: [3.4, 1.6, 0.8], name: "Panchlaish Unit", level: "Unit", size: 0.12, color: "#10b981" },
      { position: [2.8, -0.2, 1.4], name: "Kotwali Unit", level: "Unit", size: 0.12, color: "#10b981" },
      { position: [3.1, 0.4, -0.7], name: "Agrabad Unit", level: "Unit", size: 0.12, color: "#10b981" },
      // Unit Branches under Dhaka
      { position: [-3.2, 2.0, -0.3], name: "Dhanmondi Unit", level: "Unit", size: 0.12, color: "#10b981" },
      { position: [-2.6, 0.4, -1.8], name: "Gulshan Unit", level: "Unit", size: 0.12, color: "#10b981" },
    ];
  }, []);

  // Compute connecting line segments
  const lines = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const hqPos = new THREE.Vector3(0, 0, 0);

    // Connect HQ to Divisions
    points.push(hqPos, new THREE.Vector3(2.2, 0.8, 0.5));
    points.push(hqPos, new THREE.Vector3(-2.0, 1.2, -0.6));
    points.push(hqPos, new THREE.Vector3(0.5, -1.8, 1.2));
    points.push(hqPos, new THREE.Vector3(-1.4, -1.5, -1.0));

    // Connect CTG Division to Units
    const ctgPos = new THREE.Vector3(2.2, 0.8, 0.5);
    points.push(ctgPos, new THREE.Vector3(3.4, 1.6, 0.8));
    points.push(ctgPos, new THREE.Vector3(2.8, -0.2, 1.4));
    points.push(ctgPos, new THREE.Vector3(3.1, 0.4, -0.7));

    // Connect Dhaka Division to Units
    const dhkPos = new THREE.Vector3(-2.0, 1.2, -0.6);
    points.push(dhkPos, new THREE.Vector3(-3.2, 2.0, -0.3));
    points.push(dhkPos, new THREE.Vector3(-2.6, 0.4, -1.8));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, []);

  // Gentle ambient rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.0005) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Network Connection Lines */}
      <lineSegments geometry={lines}>
        <lineBasicMaterial color="#60a5fa" transparent opacity={0.35} />
      </lineSegments>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <mesh
          key={i}
          position={node.position}
          onPointerOver={(e) => {
            e.stopPropagation();
            onHoverNode(node);
          }}
          onPointerOut={() => onHoverNode(null)}
        >
          <sphereGeometry args={[node.size, 24, 24]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.65}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

export function BranchGalaxy() {
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[460px] flex items-center justify-center bg-card/20 rounded-2xl border border-white/10">
        <div className="text-muted-foreground text-sm">Initializing 3D Spatial Network...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[520px] rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl">
      {/* Header HUD */}
      <div className="absolute top-5 left-6 z-10 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold text-amber-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          Live 3D Spatial Hierarchy
        </div>
        <h3 className="text-xl font-bold text-white mt-2 tracking-tight">
          Nationwide Branch Constellation
        </h3>
        <p className="text-xs text-muted-foreground">
          Drag to orbit · Scroll to zoom · Hover over nodes to inspect units
        </p>
      </div>

      {/* Active Node Inspector HUD */}
      {hoveredNode && (
        <div className="absolute bottom-6 right-6 z-10 bg-slate-900/90 border border-primary/40 backdrop-blur-xl p-4 rounded-2xl shadow-xl pointer-events-none transition-all animate-in fade-in zoom-in-95 duration-200">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
            {hoveredNode.level} Node
          </div>
          <div className="text-base font-bold text-white mt-0.5">{hoveredNode.name}</div>
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span>Status: <strong className="text-emerald-400">Active</strong></span>
            <span>•</span>
            <span>Delegates: <strong className="text-white">100% Verified</strong></span>
          </div>
        </div>
      )}

      {/* 3D WebGL Canvas */}
      <Canvas camera={{ position: [0, 1.5, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -5]} color="#3b82f6" intensity={0.8} />
        <BranchNodes onHoverNode={setHoveredNode} />
        <OrbitControls
          enableZoom={true}
          maxDistance={10}
          minDistance={3}
          enablePan={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
