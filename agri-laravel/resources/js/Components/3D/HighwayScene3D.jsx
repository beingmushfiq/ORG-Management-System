import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Cinematic 3D Highway Scene — Vision Zero Bangladesh
 * 
 * Hardware-accelerated 3D perspective highway engine featuring:
 * - Full-bleed midnight asphalt perspective stretching to infinite horizon
 * - Streaming long-exposure light trails (white headlights & red taillights)
 * - Animated 3D vehicles with real-time beam projections
 * - Overhead electronic safety gantry with live Vision Zero telemetry
 * - Roadside radar sensors emitting concentric pulse waves
 * - Reflective highway barrier studs (amber/emerald/ruby cat's eyes)
 * - Interactive camera parallax reacting smoothly to mouse movement
 */
export default function HighwayScene3D({ className = '', style = {} }) {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
    const animRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Mouse movement handler for 3D parallax tilt
    const handleMouseMove = useCallback((e) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 2;
        const y = (e.clientY / innerHeight - 0.5) * 2;
        mouseRef.current.targetX = x;
        mouseRef.current.targetY = y;
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
        let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

        const handleResize = () => {
            if (!canvas || !canvas.parentElement) return;
            width = canvas.width = canvas.parentElement.clientWidth;
            height = canvas.height = canvas.parentElement.clientHeight;
        };
        window.addEventListener('resize', handleResize);

        // Highway Configuration
        const horizonY = height * 0.42;
        const roadBottomWidth = width * 0.85;
        const roadTopWidth = 24;
        const centerX = width * 0.5;

        // Particle stars
        const stars = Array.from({ length: 80 }, () => ({
            x: Math.random() * width,
            y: Math.random() * horizonY,
            radius: Math.random() * 1.4 + 0.3,
            alpha: Math.random() * 0.7 + 0.3,
            speed: Math.random() * 0.02 + 0.005,
        }));

        // Light trails & vehicles
        // z: 0 (far horizon) to 1 (near camera)
        const lightTrails = [];
        const numTrails = 32;

        for (let i = 0; i < numTrails; i++) {
            const isOutgoing = i % 2 === 0; // true: red taillights (right lanes), false: white/amber headlights (left lanes)
            lightTrails.push({
                lane: isOutgoing ? (Math.random() > 0.5 ? 1 : 2) : (Math.random() > 0.5 ? -1 : -2),
                z: Math.random(),
                speed: isOutgoing ? (Math.random() * 0.006 + 0.005) : (Math.random() * 0.008 + 0.006),
                length: Math.random() * 0.12 + 0.08,
                color: isOutgoing ? '#ef4444' : (Math.random() > 0.3 ? '#fef08a' : '#38bdf8'),
                glow: isOutgoing ? 'rgba(239, 68, 68, ' : (Math.random() > 0.3 ? 'rgba(254, 240, 138, ' : 'rgba(56, 189, 248, '),
                isEmergency: i === 7, // 1 emergency vehicle with dual strobe
            });
        }

        // Radar pulses along roadside
        const radars = [
            { xSide: -1, z: 0.35, pulse: 0, label: 'RADAR-01 · 60 KM/H AUDIT' },
            { xSide: 1, z: 0.65, pulse: 0.5, label: 'RADAR-02 · VISION ZERO' },
        ];

        let tick = 0;
        setIsLoaded(true);

        const render = () => {
            tick++;

            // Smooth parallax interpolation
            mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
            mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

            const camOffsetX = mouseRef.current.x * 25;
            const camOffsetY = mouseRef.current.y * 15;
            const curHorizonY = horizonY + camOffsetY;
            const curCenterX = centerX + camOffsetX;

            // Clear frame
            ctx.clearRect(0, 0, width, height);

            // 1. SKY GRADIENT (Deep Twilight / Midnight Horizon)
            const skyGrad = ctx.createLinearGradient(0, 0, 0, curHorizonY + 80);
            skyGrad.addColorStop(0, '#020617'); // slate-950
            skyGrad.addColorStop(0.65, '#090d16');
            skyGrad.addColorStop(0.9, '#1a1829'); // atmospheric dusk tint
            skyGrad.addColorStop(1, '#f59e0b1f'); // warm amber horizon dawn
            ctx.fillStyle = skyGrad;
            ctx.fillRect(0, 0, width, curHorizonY + 80);

            // 2. STARS
            stars.forEach((s) => {
                const alpha = s.alpha * (0.7 + Math.sin(tick * s.speed + s.x) * 0.3);
                ctx.fillStyle = `rgba(226, 232, 240, ${alpha})`;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            // 3. HORIZON GLOW & CITY / BRIDGE SILHOUETTES
            const horizonGlow = ctx.createRadialGradient(
                curCenterX, curHorizonY, 10,
                curCenterX, curHorizonY, width * 0.6
            );
            horizonGlow.addColorStop(0, 'rgba(245, 158, 11, 0.28)');
            horizonGlow.addColorStop(0.3, 'rgba(245, 158, 11, 0.08)');
            horizonGlow.addColorStop(1, 'rgba(2, 6, 23, 0)');
            ctx.fillStyle = horizonGlow;
            ctx.fillRect(0, curHorizonY - 120, width, 180);

            // Distant suspension bridge / tower silhouettes
            ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            // Left bridge pylon
            ctx.moveTo(curCenterX - 140, curHorizonY);
            ctx.lineTo(curCenterX - 140, curHorizonY - 60);
            ctx.lineTo(curCenterX - 110, curHorizonY);
            // Right bridge pylon
            ctx.moveTo(curCenterX + 140, curHorizonY);
            ctx.lineTo(curCenterX + 140, curHorizonY - 60);
            ctx.lineTo(curCenterX + 110, curHorizonY);
            // Main cables
            ctx.moveTo(curCenterX - 220, curHorizonY);
            ctx.quadraticCurveTo(curCenterX - 140, curHorizonY - 55, curCenterX, curHorizonY - 15);
            ctx.quadraticCurveTo(curCenterX + 140, curHorizonY - 55, curCenterX + 220, curHorizonY);
            ctx.stroke();

            // 4. TERRAIN / GROUND (Dark Grass & Gravel Shoulders)
            const groundGrad = ctx.createLinearGradient(0, curHorizonY, 0, height);
            groundGrad.addColorStop(0, '#060a12');
            groundGrad.addColorStop(1, '#020408');
            ctx.fillStyle = groundGrad;
            ctx.fillRect(0, curHorizonY, width, height - curHorizonY);

            // Helper: Perspective Coordinate Transform (z: 0=horizon, 1=screen bottom)
            const project = (xOffsetNorm, z) => {
                const y = curHorizonY + (height - curHorizonY) * Math.pow(z, 1.8);
                const currentRoadWidth = roadTopWidth + (roadBottomWidth - roadTopWidth) * Math.pow(z, 1.8);
                const x = curCenterX + (xOffsetNorm * currentRoadWidth * 0.5);
                return { x, y, roadW: currentRoadWidth };
            };

            // 5. ROAD SURFACE (Curved Multi-Lane Expressway)
            const pTL = project(-1.05, 0);
            const pTR = project(1.05, 0);
            const pBL = project(-1.05, 1);
            const pBR = project(1.05, 1);

            // Road bed shadow & pavement
            ctx.beginPath();
            ctx.moveTo(pTL.x, pTL.y);
            ctx.lineTo(pTR.x, pTR.y);
            ctx.lineTo(pBR.x, pBR.y);
            ctx.lineTo(pBL.x, pBL.y);
            ctx.closePath();

            const roadGrad = ctx.createLinearGradient(0, curHorizonY, 0, height);
            roadGrad.addColorStop(0, '#0f172a'); // slate-900 at distance
            roadGrad.addColorStop(0.3, '#0b1120');
            roadGrad.addColorStop(0.7, '#070b14');
            roadGrad.addColorStop(1, '#030712'); // obsidian asphalt at bottom
            ctx.fillStyle = roadGrad;
            ctx.fill();

            // Road borders (Solid neon shoulder boundaries)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(pTL.x, pTL.y);
            ctx.lineTo(pBL.x, pBL.y);
            ctx.moveTo(pTR.x, pTR.y);
            ctx.lineTo(pBR.x, pBR.y);
            ctx.stroke();

            // 6. ROAD MARKINGS (Dashed Lanes Moving Towards Screen)
            const laneOffsets = [-0.5, 0, 0.5]; // 4-lane expressway
            const dashSpeed = (tick * 0.012) % 1;

            laneOffsets.forEach((laneOffset) => {
                const isCenterDivider = laneOffset === 0;
                for (let d = 0; d < 18; d++) {
                    const zStart = (d / 18 + dashSpeed / 18) % 1;
                    const zEnd = Math.min(zStart + 0.035, 0.999);
                    if (zEnd < zStart) continue;

                    const p1 = project(laneOffset, zStart);
                    const p2 = project(laneOffset, zEnd);

                    ctx.lineWidth = Math.max(1, zStart * (isCenterDivider ? 4.5 : 2.5));
                    ctx.strokeStyle = isCenterDivider
                        ? `rgba(245, 158, 11, ${0.15 + zStart * 0.75})` // Glowing Caution Amber
                        : `rgba(255, 255, 255, ${0.1 + zStart * 0.5})`; // White dashed

                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });

            // 7. SAFETY BARRIERS & REFLECTIVE CAT'S EYES
            for (let b = 0; b < 24; b++) {
                const zBarrier = (b / 24 + dashSpeed / 24) % 1;
                const pLeft = project(-1.08, zBarrier);
                const pRight = project(1.08, zBarrier);

                const size = Math.max(1.5, zBarrier * 5);
                const alpha = 0.2 + zBarrier * 0.8;

                // Left barrier post & amber reflector
                ctx.fillStyle = `rgba(245, 158, 11, ${alpha})`;
                ctx.shadowColor = '#f59e0b';
                ctx.shadowBlur = zBarrier * 8;
                ctx.beginPath();
                ctx.arc(pLeft.x, pLeft.y, size, 0, Math.PI * 2);
                ctx.fill();

                // Right barrier post & emerald/ruby reflector
                ctx.fillStyle = b % 4 === 0 ? `rgba(239, 68, 68, ${alpha})` : `rgba(34, 197, 94, ${alpha})`;
                ctx.shadowColor = b % 4 === 0 ? '#ef4444' : '#22c55e';
                ctx.beginPath();
                ctx.arc(pRight.x, pRight.y, size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.shadowBlur = 0; // reset shadow

            // 8. STREAMING TRAFFIC LIGHT TRAILS & VEHICLES
            lightTrails.forEach((trail) => {
                // Move trail
                trail.z += trail.speed;
                if (trail.z > 1) {
                    trail.z = 0.01;
                    trail.lane = trail.lane > 0
                        ? (Math.random() > 0.5 ? 1 : 2)
                        : (Math.random() > 0.5 ? -1 : -2);
                }

                const zHead = trail.z;
                const zTail = Math.max(0.001, trail.z - trail.length);

                // Lane position offset
                const normOffset = trail.lane * 0.25;
                const head = project(normOffset, zHead);
                const tail = project(normOffset, zTail);

                const trailWidth = Math.max(1.5, zHead * 6);
                const opacity = Math.min(1, zHead * 1.4);

                // Luminous Trail Streak
                const lineGrad = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
                lineGrad.addColorStop(0, trail.glow + '0)');
                lineGrad.addColorStop(0.7, trail.glow + (opacity * 0.6) + ')');
                lineGrad.addColorStop(1, trail.glow + opacity + ')');

                ctx.strokeStyle = lineGrad;
                ctx.lineWidth = trailWidth;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(tail.x, tail.y);
                ctx.lineTo(head.x, head.y);
                ctx.stroke();

                // Vehicle Head / Tail Light Glow
                ctx.fillStyle = trail.color;
                ctx.shadowColor = trail.color;
                ctx.shadowBlur = Math.min(25, zHead * 30);
                ctx.beginPath();
                ctx.arc(head.x, head.y, trailWidth * 0.9, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;

                // Emergency Vehicle Dual Strobe (Blue & Amber Flashes)
                if (trail.isEmergency) {
                    const strobe = Math.sin(tick * 0.4) > 0;
                    ctx.fillStyle = strobe ? '#3b82f6' : '#ef4444';
                    ctx.shadowColor = strobe ? '#3b82f6' : '#ef4444';
                    ctx.shadowBlur = 20;
                    ctx.beginPath();
                    ctx.arc(head.x, head.y - zHead * 8, trailWidth * 1.3, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }

                // Ground illumination reflection
                if (zHead > 0.4) {
                    const reflectGrad = ctx.createRadialGradient(
                        head.x, head.y + zHead * 4, 1,
                        head.x, head.y + zHead * 4, zHead * 40
                    );
                    reflectGrad.addColorStop(0, trail.glow + (zHead * 0.25) + ')');
                    reflectGrad.addColorStop(1, trail.glow + '0)');
                    ctx.fillStyle = reflectGrad;
                    ctx.beginPath();
                    ctx.ellipse(head.x, head.y + zHead * 4, zHead * 35, zHead * 12, 0, 0, Math.PI * 2);
                    ctx.fill();
                }
            });



            // 10. ROADSIDE SPEED RADARS & PULSING CONCENTRIC RINGS
            radars.forEach((radar) => {
                radar.pulse = (radar.pulse + 0.015) % 1;
                const pos = project(radar.xSide * 1.15, radar.z);

                // Base pole
                ctx.fillStyle = '#475569';
                ctx.fillRect(pos.x - 2, pos.y - 18, 4, 18);

                // Radar beacon light
                ctx.fillStyle = '#ef4444';
                ctx.shadowColor = '#ef4444';
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.arc(pos.x, pos.y - 20, 3.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;

                // Concentric radar scan rings
                for (let r = 1; r <= 3; r++) {
                    const currentRadius = ((radar.pulse + r * 0.3) % 1) * 35;
                    const ringAlpha = (1 - currentRadius / 35) * 0.5;

                    ctx.strokeStyle = `rgba(245, 158, 11, ${ringAlpha})`;
                    ctx.lineWidth = 1.2;
                    ctx.beginPath();
                    ctx.ellipse(pos.x, pos.y, currentRadius * 1.5, currentRadius * 0.6, 0, 0, Math.PI * 2);
                    ctx.stroke();
                }
            });

            animRef.current = requestAnimationFrame(render);
        };

        animRef.current = requestAnimationFrame(render);

        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, [handleMouseMove]);

    return (
        <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none ${className}`} style={style}>
            {/* The 3D Perspective Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full block"
            />

            {/* Seamless Vignette Overlay for Crisp Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/70 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,6,23,0.7)_100%)] pointer-events-none" />
        </div>
    );
}
