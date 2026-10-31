import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { RotateCcw, Zap, Sparkles } from 'lucide-react';

export const CinematicClockSection: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [sceneStage, setSceneStage] = useState<1 | 2 | 3 | 4>(1);
  const [digitalTimeDisplay, setDigitalTimeDisplay] = useState<string>('05:58:30');
  const [isPulseTriggered, setIsPulseTriggered] = useState<boolean>(false);

  // Animation timeline state tracked for GSAP
  const timelineStateRef = useRef({
    // Camera
    cameraZ: 10.0,
    cameraY: 0.0,
    cameraFov: 50,
    // Warp rings (Scene 1)
    warpRingsOpacity: 1.0,
    warpRingsZ: 0.0,
    // Clock presence (Scene 2)
    clockScale: 0.1,
    clockOpacity: 0.0,
    clockRotY: 0.0,
    clockRotX: 0.0,
    // Hands & Time
    timeVal: 5.96, // 5:57:36 AM
    // Shockwave pulse & Sunrise flare (Scene 3)
    shockwaveScale: 0.1,
    shockwaveOpacity: 0.0,
    faceGlowIntensity: 0.2,
    sunriseFlareIntensity: 0.0,
    particleExplosionProgress: 0.0,
    // Brand Overlay (Scene 4)
    brandOpacity: 0.0,
    brandY: 30,
    subtitlesOpacity: 0.0,
    // Interactive mouse parallax
    pointerX: 0,
    pointerY: 0,
  });

  const replayTimelineRef = useRef<() => void>(() => {});

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Software WebGL Detection
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02040b, 0.05);

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 10.0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 2. High-Tech Dual-Tone Cinematic Lighting (Electric Cyan & Molten Gold)
    const ambientLight = new THREE.AmbientLight(0x040c1a, 0.7);
    scene.add(ambientLight);

    // Electric Cyan Rim Light
    const cyanRim = new THREE.DirectionalLight(0x00f0ff, 3.2);
    cyanRim.position.set(-6, 3, 4);
    scene.add(cyanRim);

    // Molten Gold Key Spotlight
    const goldKey = new THREE.SpotLight(0xffb703, 4.5, 25, Math.PI / 3, 0.4, 1.2);
    goldKey.position.set(5, 6, 6);
    goldKey.castShadow = !isSoftwareGl;
    scene.add(goldKey);

    // Core Pulse Light (Ignites at 6:00 AM)
    const pulseLight = new THREE.PointLight(0xffaa00, 0.0, 30, 1.5);
    pulseLight.position.set(0, -0.9, 0.8);
    scene.add(pulseLight);

    // Blue Hologram Front Fill
    const holoFill = new THREE.PointLight(0x38bdf8, 1.5, 12);
    holoFill.position.set(0, 2, 3);
    scene.add(holoFill);

    // 3. SCENE 1: Flying Futuristic Warp Energy Rings (Electric Cyan & Gold)
    const warpTunnelGroup = new THREE.Group();
    scene.add(warpTunnelGroup);

    const warpRings: { mesh: THREE.Mesh; baseZ: number; speed: number }[] = [];
    const warpRingCount = 8;
    for (let i = 0; i < warpRingCount; i++) {
      const zPos = 8.0 - i * 2.2;
      const isGold = i % 2 === 0;
      const ringGeom = new THREE.TorusGeometry(2.2 + i * 0.15, 0.04, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: isGold ? 0xffd700 : 0x00f0ff,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.position.set(0, 0, zPos);
      warpTunnelGroup.add(ringMesh);
      warpRings.push({ mesh: ringMesh, baseZ: zPos, speed: 0.2 + i * 0.05 });
    }

    // 4. SCENE 2: The Futuristic Luxury 3D Time Machine Clock
    const timeMachineMaster = new THREE.Group();
    timeMachineMaster.scale.setScalar(0.001); // starts scaled down during Scene 1 intro
    scene.add(timeMachineMaster);

    // A. Outer Matte Black & Anodized Titanium Armor Casing
    const armorCasingGeom = new THREE.CylinderGeometry(2.05, 2.12, 0.42, 64);
    armorCasingGeom.rotateX(Math.PI / 2);
    const armorMat = new THREE.MeshStandardMaterial({
      color: 0x0a0f1d,
      metalness: 0.92,
      roughness: 0.2,
    });
    const armorCasing = new THREE.Mesh(armorCasingGeom, armorMat);
    armorCasing.position.z = -0.22;
    timeMachineMaster.add(armorCasing);

    // Chamfered Titanium-Gold Bezel
    const titanGoldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.96,
      roughness: 0.12,
    });
    const goldBezelGeom = new THREE.TorusGeometry(1.96, 0.09, 24, 72);
    const goldBezel = new THREE.Mesh(goldBezelGeom, titanGoldMat);
    timeMachineMaster.add(goldBezel);

    // Hexagonal Bezel Bolts (6 Gold Bolt Studs)
    const boltGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.06, 6);
    boltGeom.rotateX(Math.PI / 2);
    for (let b = 0; b < 6; b++) {
      const bAngle = (b * Math.PI) / 3;
      const bolt = new THREE.Mesh(boltGeom, titanGoldMat);
      bolt.position.set(Math.sin(bAngle) * 2.05, Math.cos(bAngle) * 2.05, 0.04);
      timeMachineMaster.add(bolt);
    }

    // B. Holographic Orbital Gyro Rings (Rotating 3D Astral Rings around Clock)
    const gyroRing1Geom = new THREE.TorusGeometry(2.28, 0.025, 16, 80);
    const gyroRing1Mat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const gyroRing1 = new THREE.Mesh(gyroRing1Geom, gyroRing1Mat);
    timeMachineMaster.add(gyroRing1);

    const gyroRing2Geom = new THREE.TorusGeometry(2.42, 0.03, 16, 80);
    const gyroRing2Mat = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const gyroRing2 = new THREE.Mesh(gyroRing2Geom, gyroRing2Mat);
    timeMachineMaster.add(gyroRing2);

    // C. High-Res Cybernetic Dial Face (Holographic Blue & Electric Gold)
    const dialCanvas = document.createElement('canvas');
    dialCanvas.width = 1400;
    dialCanvas.height = 1400;
    const ctx = dialCanvas.getContext('2d')!;

    const renderCyberDial = (pulseVal: number = 0) => {
      ctx.clearRect(0, 0, 1400, 1400);

      // Deep cyber space background
      const radBg = ctx.createRadialGradient(700, 700, 50, 700, 700, 680);
      radBg.addColorStop(0, '#06132b');
      radBg.addColorStop(0.65, '#030818');
      radBg.addColorStop(1, '#01030a');
      ctx.fillStyle = radBg;
      ctx.beginPath();
      ctx.arc(700, 700, 680, 0, Math.PI * 2);
      ctx.fill();

      // Cyber Holographic Coordinate Grid
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      ctx.lineWidth = 1.5;
      for (let r = 100; r < 650; r += 32) {
        ctx.beginPath();
        ctx.arc(700, 700, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 60 Radial Telemetry Rays
      for (let a = 0; a < 60; a++) {
        const rad = (a * Math.PI) / 30;
        ctx.strokeStyle = a % 5 === 0 ? 'rgba(212, 175, 55, 0.25)' : 'rgba(0, 240, 255, 0.06)';
        ctx.lineWidth = a % 5 === 0 ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(700 + Math.sin(rad) * 160, 700 - Math.cos(rad) * 160);
        ctx.lineTo(700 + Math.sin(rad) * 640, 700 - Math.cos(rad) * 640);
        ctx.stroke();
      }

      // Outer Dual Neon Telemetry Rings
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(700, 700, 640, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(700, 700, 595, 0, Math.PI * 2);
      ctx.stroke();

      // Precision Minute Hashes
      for (let m = 0; m < 60; m++) {
        const rad = (m * Math.PI) / 30;
        const isFive = m % 5 === 0;
        const r1 = isFive ? 570 : 610;
        const r2 = 640;
        const x1 = 700 + Math.sin(rad) * r1;
        const y1 = 700 - Math.cos(rad) * r1;
        const x2 = 700 + Math.sin(rad) * r2;
        const y2 = 700 - Math.cos(rad) * r2;

        ctx.strokeStyle = isFive ? '#00f0ff' : 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = isFive ? 6 : 2.5;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Futuristic Hour Markings
      for (let i = 1; i <= 12; i++) {
        const rad = (i * Math.PI) / 6;
        const isSix = i === 6;
        const tx = 700 + Math.sin(rad) * 485;
        const ty = 700 - Math.cos(rad) * 485;

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (isSix) {
          // Radiant 6:00 AM Reticle target with dynamic neon pulse
          const auraRadius = 60 + pulseVal * 55;
          const aura = ctx.createRadialGradient(tx, ty, 10, tx, ty, auraRadius);
          aura.addColorStop(0, `rgba(255, 170, 0, ${Math.min(1.0, 0.6 + pulseVal * 0.4)})`);
          aura.addColorStop(0.6, `rgba(0, 240, 255, ${Math.min(0.8, 0.3 + pulseVal * 0.5)})`);
          aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = aura;
          ctx.beginPath();
          ctx.arc(tx, ty, auraRadius, 0, Math.PI * 2);
          ctx.fill();

          // Hexagonal Cyber Badge around 6
          ctx.fillStyle = '#0a1a38';
          ctx.beginPath();
          ctx.arc(tx, ty, 52, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#ffd700';
          ctx.lineWidth = 5;
          ctx.stroke();

          ctx.font = '900 76px "JetBrains Mono", monospace';
          ctx.fillStyle = '#ffffff';
          ctx.fillText('06', tx, ty);
        } else {
          ctx.font = 'bold 54px "Cinzel", Georgia, serif';
          ctx.fillStyle = '#fef08a';
          ctx.fillText(String(i).padStart(2, '0'), tx, ty);
        }
      }

      // Central Inscriptions
      ctx.font = '900 42px "Cinzel", Georgia, serif';
      ctx.fillStyle = '#ffd700';
      ctx.textAlign = 'center';
      ctx.fillText('LAXMI CHRONOS', 700, 360);

      ctx.font = '800 22px "JetBrains Mono", monospace';
      ctx.fillStyle = '#00f0ff';
      ctx.fillText('• 06:00 AM QUANTUM DISPATCH •', 700, 405);
    };

    renderCyberDial(0);

    const dialTex = new THREE.CanvasTexture(dialCanvas);
    dialTex.colorSpace = THREE.SRGBColorSpace;
    dialTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const dialMesh = new THREE.Mesh(
      new THREE.CircleGeometry(1.88, 64),
      new THREE.MeshStandardMaterial({
        map: dialTex,
        roughness: 0.3,
        metalness: 0.3,
      })
    );
    dialMesh.position.z = -0.01;
    timeMachineMaster.add(dialMesh);

    // D. Mechanical Planetary Gear Train (Visible interlocking gears)
    const gearTrainGroup = new THREE.Group();
    gearTrainGroup.position.set(0.62, 0.15, 0.04);

    const createGearMesh = (radius: number, teeth: number, color: number) => {
      const gearGroup = new THREE.Group();
      // Main disc
      const disc = new THREE.Mesh(
        new THREE.CylinderGeometry(radius, radius, 0.03, 32),
        new THREE.MeshStandardMaterial({ color, metalness: 0.9, roughness: 0.2 })
      );
      disc.rotateX(Math.PI / 2);
      gearGroup.add(disc);

      // Cogs / Teeth
      const toothGeom = new THREE.BoxGeometry(radius * 0.18, radius * 0.28, 0.03);
      for (let t = 0; t < teeth; t++) {
        const tAngle = (t * Math.PI * 2) / teeth;
        const tooth = new THREE.Mesh(
          toothGeom,
          new THREE.MeshStandardMaterial({ color, metalness: 0.95, roughness: 0.15 })
        );
        tooth.position.set(Math.sin(tAngle) * radius, Math.cos(tAngle) * radius, 0);
        tooth.rotation.z = -tAngle;
        gearGroup.add(tooth);
      }
      return gearGroup;
    };

    const mainGear = createGearMesh(0.38, 16, 0xd4af37);
    gearTrainGroup.add(mainGear);

    const satelliteGear = createGearMesh(0.24, 10, 0x00f0ff);
    satelliteGear.position.set(-0.55, 0.18, 0);
    gearTrainGroup.add(satelliteGear);

    timeMachineMaster.add(gearTrainGroup);

    // E. Futuristic Skeletonized Hands (Tritium Neon Glow Core)
    const handNeonCyanMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const handNeonGoldMat = new THREE.MeshBasicMaterial({ color: 0xffd700 });

    // 1. Hour Hand (Chiseled Cyber Blade with neon core)
    const hourHandGroup = new THREE.Group();
    const hourArm = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 1.15, 0.04),
      titanGoldMat
    );
    hourArm.position.y = 0.55;
    hourHandGroup.add(hourArm);

    const hourNeonStrip = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.95, 0.05),
      handNeonGoldMat
    );
    hourNeonStrip.position.y = 0.55;
    hourHandGroup.add(hourNeonStrip);
    timeMachineMaster.add(hourHandGroup);

    // 2. Minute Hand (Long Slender Stealth Blade with Cyan Neon Tube)
    const minuteHandGroup = new THREE.Group();
    const minuteArm = new THREE.Mesh(
      new THREE.BoxGeometry(0.07, 1.65, 0.04),
      titanGoldMat
    );
    minuteArm.position.y = 0.82;
    minuteHandGroup.add(minuteArm);

    const minuteNeonStrip = new THREE.Mesh(
      new THREE.BoxGeometry(0.025, 1.45, 0.05),
      handNeonCyanMat
    );
    minuteNeonStrip.position.y = 0.82;
    minuteHandGroup.add(minuteNeonStrip);
    timeMachineMaster.add(minuteHandGroup);

    // 3. Second Needle (Razor-thin Crimson Laser with Glowing Tip)
    const secondHandGroup = new THREE.Group();
    const secondBlade = new THREE.Mesh(
      new THREE.BoxGeometry(0.018, 1.85, 0.02),
      new THREE.MeshBasicMaterial({ color: 0xef4444 })
    );
    secondBlade.position.y = 0.65;
    secondHandGroup.add(secondBlade);

    const secondTip = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xff0055 })
    );
    secondTip.position.y = 1.55;
    secondHandGroup.add(secondTip);

    secondHandGroup.position.z = 0.06;
    timeMachineMaster.add(secondHandGroup);

    // Center Quantum Cap (Glowing Core)
    const centerCap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.14, 0.08, 32),
      titanGoldMat
    );
    centerCap.rotateX(Math.PI / 2);
    centerCap.position.z = 0.08;
    timeMachineMaster.add(centerCap);

    const centerJewel = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff })
    );
    centerJewel.position.z = 0.12;
    timeMachineMaster.add(centerJewel);

    // F. Floating 3D Sapphire Crystal Glass Plates (Multi-Tier)
    const glassPlate1 = new THREE.Mesh(
      new THREE.CircleGeometry(1.92, 64),
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: isSoftwareGl ? 0.15 : 0.22,
        roughness: 0.05,
        metalness: 0.15,
        clearcoat: 1.0,
      })
    );
    glassPlate1.position.z = 0.1;
    timeMachineMaster.add(glassPlate1);

    // 5. SCENE 3: Shockwave Energy Ring & Explosive Particle Burst
    // Shockwave Ring that expands in 360° from 6:00 AM position
    const shockwaveGeom = new THREE.RingGeometry(0.1, 0.45, 64);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const shockwaveMesh = new THREE.Mesh(shockwaveGeom, shockwaveMat);
    shockwaveMesh.position.set(0, -0.9, 0.12); // positioned right at 6:00 AM marker
    scene.add(shockwaveMesh);

    // Explosive Sunrise Morning Particles (300 Cyber Particles)
    const blastParticleCount = 280;
    const blastGeom = new THREE.BufferGeometry();
    const blastPositions = new Float32Array(blastParticleCount * 3);
    const blastVelocities: { x: number; y: number; z: number }[] = [];

    for (let p = 0; p < blastParticleCount; p++) {
      const idx = p * 3;
      blastPositions[idx] = 0;
      blastPositions[idx + 1] = -0.9;
      blastPositions[idx + 2] = 0.1;

      // Spherical explosion velocities
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      const speed = 2.0 + Math.random() * 4.5;
      blastVelocities.push({
        x: Math.cos(phi) * Math.cos(theta) * speed,
        y: Math.sin(phi) * speed,
        z: Math.cos(phi) * Math.sin(theta) * speed,
      });
    }
    blastGeom.setAttribute('position', new THREE.BufferAttribute(blastPositions, 3));

    const blastMat = new THREE.PointsMaterial({
      color: 0xffea00,
      size: 0.08,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
    });
    const blastParticles = new THREE.Points(blastGeom, blastMat);
    scene.add(blastParticles);

    // 6. GSAP Hollywood VFX Master Cinematic Timeline
    const triggerCinematicExperience = () => {
      setSceneStage(1);
      setIsPulseTriggered(false);

      // Reset values
      timelineStateRef.current.cameraZ = 10.0;
      timelineStateRef.current.cameraY = 0.0;
      timelineStateRef.current.cameraFov = 50;
      timelineStateRef.current.warpRingsOpacity = 1.0;
      timelineStateRef.current.warpRingsZ = 0.0;
      timelineStateRef.current.clockScale = 0.001;
      timelineStateRef.current.clockOpacity = 0.0;
      timelineStateRef.current.timeVal = 5.96; // 5:57:36 AM
      timelineStateRef.current.shockwaveScale = 0.1;
      timelineStateRef.current.shockwaveOpacity = 0.0;
      timelineStateRef.current.faceGlowIntensity = 0.0;
      timelineStateRef.current.sunriseFlareIntensity = 0.0;
      timelineStateRef.current.particleExplosionProgress = 0.0;
      timelineStateRef.current.brandOpacity = 0.0;
      timelineStateRef.current.brandY = 30;
      timelineStateRef.current.subtitlesOpacity = 0.0;

      shockwaveMat.opacity = 0.0;
      blastMat.opacity = 0.0;
      renderCyberDial(0);
      dialTex.needsUpdate = true;

      const master = gsap.timeline();

      // SCENE 1: Flying through Neon Energy Rings (0.0s - 2.4s)
      master.add(() => setSceneStage(1), 0);

      master.to(
        timelineStateRef.current,
        {
          cameraZ: 4.8,
          duration: 2.4,
          ease: 'power3.in',
        },
        0
      );

      master.to(
        timelineStateRef.current,
        {
          warpRingsOpacity: 0.0,
          duration: 1.0,
          ease: 'power2.in',
        },
        1.5
      );

      // SCENE 2: The Epic 3D Time Machine Clock Emerges (2.2s - 5.5s)
      master.add(() => setSceneStage(2), 2.2);

      master.to(
        timelineStateRef.current,
        {
          clockScale: 1.0,
          clockOpacity: 1.0,
          cameraZ: 4.25,
          cameraFov: 45,
          duration: 2.2,
          ease: 'power3.out',
        },
        2.2
      );

      // Hands sweep dramatically into 6:00:00 AM
      master.to(
        timelineStateRef.current,
        {
          timeVal: 6.0,
          duration: 3.0,
          ease: 'power3.inOut',
          onUpdate: () => {
            const t = timelineStateRef.current.timeVal;
            const hours = Math.floor(t);
            const rawM = (t - hours) * 60;
            const mins = Math.floor(rawM);
            const secs = Math.floor((rawM - mins) * 60);
            setDigitalTimeDisplay(
              `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
            );
          },
        },
        2.5
      );

      // SCENE 3: THE 6:00 AM MOMENT & GOLDEN SHOCKWAVE DETONATION (5.4s - 8.2s)
      master.add(() => {
        setSceneStage(3);
        setIsPulseTriggered(true);
        setDigitalTimeDisplay('06:00:00');
      }, 5.4);

      // Camera rapid speed-ramp zoom punch
      master.to(
        timelineStateRef.current,
        {
          cameraZ: 3.75,
          cameraY: -0.2,
          duration: 0.8,
          ease: 'expo.out',
        },
        5.4
      );

      // Golden Shockwave Expansion
      master.to(
        timelineStateRef.current,
        {
          shockwaveScale: 9.5,
          shockwaveOpacity: 0.95,
          faceGlowIntensity: 1.0,
          sunriseFlareIntensity: 1.0,
          particleExplosionProgress: 1.0,
          duration: 1.6,
          ease: 'expo.out',
          onUpdate: () => {
            renderCyberDial(timelineStateRef.current.faceGlowIntensity);
            dialTex.needsUpdate = true;
          },
        },
        5.4
      );

      master.to(
        blastMat,
        {
          opacity: 0.95,
          duration: 0.4,
          ease: 'power2.out',
        },
        5.4
      );

      // Shockwave fade off
      master.to(
        timelineStateRef.current,
        {
          shockwaveOpacity: 0.0,
          duration: 1.2,
          ease: 'power2.in',
        },
        6.2
      );

      // Camera pulls back into heroic widescreen
      master.to(
        timelineStateRef.current,
        {
          cameraZ: 4.4,
          cameraY: 0.0,
          duration: 2.2,
          ease: 'power2.out',
        },
        6.4
      );

      // SCENE 4: BRAND REVEAL (7.8s+)
      master.add(() => setSceneStage(4), 7.8);

      master.to(
        timelineStateRef.current,
        {
          brandOpacity: 1.0,
          brandY: 0,
          duration: 1.5,
          ease: 'power3.out',
        },
        7.8
      );

      master.to(
        timelineStateRef.current,
        {
          subtitlesOpacity: 1.0,
          duration: 1.2,
          ease: 'power2.out',
        },
        8.6
      );
    };

    replayTimelineRef.current = triggerCinematicExperience;

    const timer = setTimeout(() => {
      triggerCinematicExperience();
    }, 150);

    // Mouse Pointer Parallax
    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      timelineStateRef.current.pointerX = normX * 0.35;
      timelineStateRef.current.pointerY = normY * 0.25;
    };
    container.addEventListener('mousemove', onPointerMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // 7. Render Animation Loop
    let animId = 0;
    const renderClock = new THREE.Clock();

    const renderLoop = () => {
      const delta = renderClock.getDelta();
      const elapsed = renderClock.getElapsedTime();
      const st = timelineStateRef.current;

      // Camera Physics
      camera.position.z = THREE.MathUtils.damp(camera.position.z, st.cameraZ, 5, delta);
      camera.position.y = THREE.MathUtils.damp(
        camera.position.y,
        st.cameraY + st.pointerY * 0.3,
        4,
        delta
      );
      camera.position.x = THREE.MathUtils.damp(camera.position.x, st.pointerX * 0.45, 4, delta);

      if (camera.fov !== st.cameraFov) {
        camera.fov = st.cameraFov;
        camera.updateProjectionMatrix();
      }

      // Warp Tunnel Rings Animation (Scene 1)
      warpRings.forEach((wr) => {
        (wr.mesh.material as THREE.MeshBasicMaterial).opacity = st.warpRingsOpacity;
        wr.mesh.rotation.z += delta * wr.speed;
      });

      // Clock Master Appearance & Gyro Rings
      timeMachineMaster.scale.setScalar(st.clockScale);
      const clockRotY = st.pointerX * 0.5 + Math.sin(elapsed * 0.8) * 0.05;
      const clockRotX = -st.pointerY * 0.4 + Math.cos(elapsed * 0.6) * 0.03;
      timeMachineMaster.rotation.y = THREE.MathUtils.damp(timeMachineMaster.rotation.y, clockRotY, 4, delta);
      timeMachineMaster.rotation.x = THREE.MathUtils.damp(timeMachineMaster.rotation.x, clockRotX, 4, delta);

      // Rotating Holographic Astral Rings
      gyroRing1.rotation.x = elapsed * 0.8;
      gyroRing1.rotation.y = elapsed * 0.5;
      gyroRing2.rotation.y = -elapsed * 0.6;
      gyroRing2.rotation.z = elapsed * 0.4;

      // Rotating Planetary Gear Train
      mainGear.rotation.z = -elapsed * 1.8;
      satelliteGear.rotation.z = elapsed * (1.8 * (0.38 / 0.24));

      // Hands Movement
      const currentT = st.timeVal;
      hourHandGroup.rotation.z = -(currentT % 12) * (Math.PI / 6) + Math.PI; // at 6: points down
      const minuteFraction = currentT - Math.floor(currentT);
      minuteHandGroup.rotation.z = -minuteFraction * Math.PI * 2; // at 6.0: points straight up at 12

      if (currentT >= 6.0) {
        const sweepSec = (elapsed * 1.5) % 60;
        secondHandGroup.rotation.z = -(sweepSec / 60) * Math.PI * 2;
      } else {
        secondHandGroup.rotation.z = -(minuteFraction * 60) * Math.PI * 2;
      }

      // Shockwave Pulse Expansion (Scene 3)
      shockwaveMesh.scale.set(st.shockwaveScale, st.shockwaveScale, 1);
      (shockwaveMesh.material as THREE.MeshBasicMaterial).opacity = st.shockwaveOpacity;
      pulseLight.intensity = st.shockwaveOpacity * 5.0;

      // Exploding Sunrise Particles Movement
      if (st.particleExplosionProgress > 0) {
        const posArr = blastGeom.attributes.position.array as Float32Array;
        for (let p = 0; p < blastParticleCount; p++) {
          const idx = p * 3;
          const v = blastVelocities[p];
          posArr[idx] += v.x * delta;
          posArr[idx + 1] += v.y * delta;
          posArr[idx + 2] += v.z * delta;
        }
        blastGeom.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onPointerMove);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      armorCasingGeom.dispose();
      goldBezelGeom.dispose();
      gyroRing1Geom.dispose();
      gyroRing2Geom.dispose();
      dialTex.dispose();
      shockwaveGeom.dispose();
      blastGeom.dispose();
    };
  }, []);

  return (
    <section
      id="cinematic-clock"
      className="relative min-h-[95vh] lg:min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#01040a] via-[#020713] to-[#01040a] text-white border-b border-navy-border py-16"
    >
      {/* 3D WebGL Canvas for the Futuristic Time Machine */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
        title="Interactive 3D Futuristic Quantum Time Machine"
      />

      {/* Cyber Neon Flare Overlay on Pulse */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          isPulseTriggered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(circle at 50% 65%, rgba(255, 170, 0, 0.28) 0%, rgba(0, 240, 255, 0.15) 35%, transparent 70%)',
        }}
      />

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(1,4,10,0.92)_90%)]" />

      {/* Floating Hollywood / Gen-Z Stage Indicator */}
      <div className="absolute top-6 left-6 z-30 flex items-center gap-2 text-[11px] font-mono tracking-widest text-cyan-400 bg-black/60 px-3.5 py-1.5 rounded-full border border-cyan-500/30 backdrop-blur-md">
        <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span className="uppercase">
          {sceneStage === 1 && 'SCENE 1 // WARP INTRO'}
          {sceneStage === 2 && 'SCENE 2 // TITANIUM TIME MACHINE'}
          {sceneStage === 3 && 'SCENE 3 // 06:00 AM ENERGY PULSE'}
          {sceneStage === 4 && 'SCENE 4 // QUANTUM BRAND REVEAL'}
        </span>
      </div>

      {/* Replay Button Top Right */}
      <div className="absolute top-6 right-6 z-30">
        <button
          onClick={() => replayTimelineRef.current()}
          className="px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 text-amber-300 border border-amber-400/40 text-xs font-mono font-bold flex items-center gap-2 shadow-2xl backdrop-blur-md transition-all cursor-pointer hover:scale-105"
          title="Replay Hollywood 3D Time Machine Sequence"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span>REPLAY 3D TIME MACHINE</span>
        </button>
      </div>

      {/* Massive 3D Digital Time Callout & Hollywood Brand Reveal Overlay */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none flex flex-col justify-between h-full min-h-[85vh]">
        {/* Top Spacer */}
        <div />

        {/* Center / Lower Hollywood Brand Reveal & Massive 06:00 AM Display */}
        <div className="max-w-4xl mx-auto w-full text-center pb-4 pointer-events-auto">
          {/* SCENE 3: Massive Futuristic 06:00 AM Callout */}
          <div className="inline-block p-6 sm:p-10 rounded-3xl glass-card border border-amber-400/40 shadow-2xl backdrop-blur-xl mb-4 bg-[#030919]/90 relative overflow-hidden">
            {/* Glowing Top Cyan Border Strip */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400" />

            <div className="flex flex-col items-center justify-center">
              <span className="text-xs uppercase tracking-widest font-mono text-cyan-400 font-bold mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>THE 06:00 AM STANDARD</span>
              </span>

              {/* Massive 06:00 AM in futuristic 3D cyberpunk typography */}
              <div className="text-6xl sm:text-8xl lg:text-9xl font-black font-cinzel text-white leading-none tracking-tight my-2">
                <span
                  className={
                    isPulseTriggered
                      ? 'text-gold-gradient drop-shadow-[0_0_50px_rgba(255,170,0,0.85)]'
                      : 'text-white'
                  }
                >
                  {digitalTimeDisplay}
                </span>
                <span className="text-3xl sm:text-5xl font-mono text-cyan-400 ml-2 font-bold">
                  AM
                </span>
              </div>
            </div>

            {/* SCENE 4: BRAND REVEAL TEXT */}
            <div
              className="mt-6 pt-6 border-t border-white/10 transition-all duration-700 space-y-3"
              style={{
                opacity: sceneStage >= 3 ? 1 : 0.2,
                transform: `translateY(${sceneStage >= 3 ? 0 : 20}px)`,
              }}
            >
              {/* Exact Brand Name Requirement: LAXMI NEWSPAPER SERVICES */}
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-cinzel tracking-wider text-white drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                <span className="text-gold-gradient">LAXMI NEWSPAPER</span> SERVICES
              </h2>

              {/* Exact Tagline 1: "WE WAKE UP BEFORE THE WORLD." */}
              <div className="text-lg sm:text-2xl font-cinzel font-bold text-amber-200 tracking-widest drop-shadow-lg">
                &ldquo;WE WAKE UP BEFORE THE WORLD.&rdquo;
              </div>

              {/* Exact Subtitle: "YOUR NEWSPAPER. DELIVERED AT 6:00 AM." */}
              <div className="text-sm sm:text-base font-mono font-semibold text-cyan-300 tracking-wider">
                YOUR NEWSPAPER. DELIVERED AT 6:00 AM.
              </div>

              <p className="text-xs text-slate-400 max-w-md mx-auto pt-1 font-sans">
                Naroda & Nikol, Ahmedabad • Guaranteed Doorstep Precision by Prakash Bhai Kalal
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
