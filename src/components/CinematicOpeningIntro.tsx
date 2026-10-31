import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { Sparkles, ArrowDown, RotateCcw, MessageCircle, Send } from 'lucide-react';
import { BUSINESS_INFO } from '../data/newspaperData';

interface CinematicOpeningIntroProps {
  onSubscribeClick?: () => void;
  onWhatsAppClick?: () => void;
}

export const CinematicOpeningIntro: React.FC<CinematicOpeningIntroProps> = ({
  onSubscribeClick,
  onWhatsAppClick,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [sceneStage, setSceneStage] = useState<1 | 2 | 3 | 4>(1);

  // Mutable animation state driven by GSAP
  const timelineStateRef = useRef({
    sunScale: 0.1,
    sunIntensity: 0.0,
    rayOpacity: 0.0,
    rayScale: 0.5,
    cameraZ: 6.8,
    cameraY: 0.0,
    cameraFov: 46,
    newspaperFlightProgress: 0.0,
    papersParting: 0.0, // 0: centered flight, 1: parted to sides
    brandRevealOpacity: 0.0,
    brandRevealY: 25,
    subtitleOpacity: 0.0,
    timeTextOpacity: 0.0,
    mouseTargetX: 0,
    mouseTargetY: 0,
  });

  const replayIntroRef = useRef<() => void>(() => {});

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
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
    scene.fog = new THREE.FogExp2(0x020614, 0.05);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6.8);

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

    // 2. Cinematic Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x050c22, 0.6);
    scene.add(ambientLight);

    // Warm Golden Sunrise Center Point Light
    const sunCoreLight = new THREE.PointLight(0xffb703, 0.0, 35, 1.2);
    sunCoreLight.position.set(0, 0, -4);
    scene.add(sunCoreLight);

    // Key Directional Light for Newspaper highlights
    const keyLight = new THREE.DirectionalLight(0xfffaed, 1.5);
    keyLight.position.set(4, 5, 5);
    keyLight.castShadow = !isSoftwareGl;
    scene.add(keyLight);

    // Blue Rim Light (Morning cool ambient)
    const rimLight = new THREE.DirectionalLight(0x1d4ed8, 2.0);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    // 3. Volumetric Sunrise Glow & Sunburst Rays
    const sunriseGroup = new THREE.Group();
    sunriseGroup.position.set(0, 0, -5);
    scene.add(sunriseGroup);

    // Sunrise Sun Core Sphere
    const sunGeom = new THREE.SphereGeometry(1.3, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      transparent: true,
      opacity: 0.0,
    });
    const sunMesh = new THREE.Mesh(sunGeom, sunMat);
    sunriseGroup.add(sunMesh);

    // Volumetric 360 Light Rays
    const rayCount = 20;
    const rayMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < rayCount; i++) {
      const angle = (i * Math.PI * 2) / rayCount;
      const rayGeom = new THREE.PlaneGeometry(0.45, 20);
      rayGeom.translate(0, 10, 0);
      const rayMat = new THREE.MeshBasicMaterial({
        color: 0xfbbf24,
        transparent: true,
        opacity: 0.0,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const rayMesh = new THREE.Mesh(rayGeom, rayMat);
      rayMesh.rotation.z = angle;
      sunriseGroup.add(rayMesh);
      rayMeshes.push(rayMesh);
    }

    // Floating Golden Morning Dust Particles
    const particleCount = 180;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount * 3; p += 3) {
      particlePositions[p] = (Math.random() - 0.5) * 16;
      particlePositions[p + 1] = (Math.random() - 0.5) * 10;
      particlePositions[p + 2] = -8 + Math.random() * 12;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xfef08a,
      size: 0.065,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // 4. Procedural High-Res Newspaper Textures
    const createNewspaperTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1360;
      const ctx = canvas.getContext('2d')!;

      // Realistic off-white newsprint ivory
      ctx.fillStyle = '#f8f4eb';
      ctx.fillRect(0, 0, 1024, 1360);

      // Fine newsprint fiber texture
      ctx.fillStyle = 'rgba(0,0,0,0.015)';
      for (let i = 0; i < 20000; i++) {
        ctx.fillRect(Math.random() * 1024, Math.random() * 1360, 2, 2);
      }

      // Top Editorial Masthead Rule
      ctx.fillStyle = '#060b19';
      ctx.fillRect(40, 40, 944, 4);

      ctx.font = '700 15px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#333333';
      ctx.fillText('NARODA & NIKOL SPECIAL • DAILY 6:00 AM PROMISE', 45, 70);
      ctx.fillText('ALL PAPERS ₹180 / MO', 780, 70);

      ctx.fillRect(40, 85, 944, 2);

      // Masthead
      ctx.font = '900 68px "Cinzel", "Playfair Display", Georgia, serif';
      ctx.fillStyle = '#060b19';
      ctx.textAlign = 'center';
      ctx.fillText('LAXMI NEWS EXPRESS', 512, 175);

      ctx.font = 'italic 20px "Playfair Display", Georgia, serif';
      ctx.fillStyle = '#c5221f';
      ctx.fillText('Founder: Prakash Bhai Kalal • Naroda & Nikol Doorstep Delivery', 512, 215);

      ctx.fillStyle = '#d4af37';
      ctx.fillRect(40, 235, 944, 3);
      ctx.fillStyle = '#060b19';
      ctx.fillRect(40, 242, 944, 1);

      // Lead Headline
      ctx.textAlign = 'left';
      ctx.font = '900 48px "Cinzel", Georgia, serif';
      ctx.fillStyle = '#0a1128';
      ctx.fillText('YOUR NEWS. AT YOUR DOOR.', 50, 310);
      ctx.fillText('EVERY MORNING AT 6:00 AM.', 50, 365);

      // Red highlight banner
      ctx.fillStyle = '#c5221f';
      ctx.fillRect(50, 385, 460, 32);
      ctx.font = '700 15px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('GUARANTEED 6:00 AM IN NARODA & NIKOL', 60, 407);

      // Editorial multi-column print
      ctx.fillStyle = '#222222';
      ctx.font = '500 17px "Plus Jakarta Sans", sans-serif';
      const lines = [
        'Laxmi Newspaper Services delivers prime dailies across Naroda & Nikol,',
        'ensuring your household wakes up informed before the morning tea boils.',
        'Choose Divya Bhaskar, Sandesh, Times of India, Gujarat Patrika,',
        'Navgujrat Samay, Ahmedabad Mirror, or Economic Times at ₹180/mo.',
        '',
        'Pamphlet Distribution: 1000 Templates = ₹300 only!',
        'Reaching doorstep mailboxes across all residential societies.',
      ];
      let y = 460;
      lines.forEach((l) => {
        ctx.fillText(l, 50, y);
        y += 28;
      });

      // Gold Seal Stamp
      ctx.fillStyle = '#0a142e';
      ctx.fillRect(560, 290, 420, 260);
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 3;
      ctx.strokeRect(566, 296, 408, 248);

      ctx.textAlign = 'center';
      ctx.font = '800 28px "Cinzel", serif';
      ctx.fillStyle = '#fef08a';
      ctx.fillText('LAXMI SERVICES', 770, 365);
      ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('DAILY 6:00 AM DISPATCH', 770, 405);
      ctx.fillText('CALL: +91 9574371328', 770, 445);

      ctx.fillStyle = '#c5221f';
      ctx.fillRect(670, 475, 200, 34);
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 14px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('NARODA & NIKOL', 770, 498);

      // Columns
      ctx.fillStyle = '#444444';
      for (let c = 0; c < 3; c++) {
        const cx = 50 + c * 320;
        ctx.fillRect(cx, 720, 280, 16);
        for (let r = 0; r < 14; r++) {
          ctx.fillRect(cx, 750 + r * 22, 250 + Math.random() * 30, 8);
        }
      }

      ctx.fillStyle = '#d4af37';
      ctx.fillRect(40, 1260, 944, 30);
      ctx.fillStyle = '#060b19';
      ctx.font = '800 15px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('LAXMI NEWSPAPER SERVICES • DAILY 6:00 AM • CALL +91 9574371328', 512, 1280);

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return tex;
    };

    const frontTex = createNewspaperTexture();

    // 5. Multiple 3D Flying Newspapers with Paper Movement Animation
    interface FlyingPaper {
      group: THREE.Group;
      frontMesh: THREE.Mesh;
      innerMesh: THREE.Mesh;
      startX: number;
      startY: number;
      startZ: number;
      targetX: number;
      targetY: number;
      targetZ: number;
      partingOffsetX: number;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      baseRotX: number;
      baseRotY: number;
      baseRotZ: number;
    }

    const papersMaster = new THREE.Group();
    scene.add(papersMaster);

    const flyingPapers: FlyingPaper[] = [];
    const paperCount = 10;

    const paperConfigs = [
      { start: [-1.2, 0.5, -24], end: [-1.9, 0.4, 1.2], partX: -3.0, r: [0.2, -0.4, 0.15] },
      { start: [1.5, -0.2, -26], end: [1.9, -0.3, 1.4], partX: 3.1, r: [-0.2, 0.5, -0.2] },
      { start: [-0.6, -1.1, -22], end: [-2.3, -1.0, 0.8], partX: -3.3, r: [0.3, -0.2, 0.1] },
      { start: [0.9, 1.3, -25], end: [2.2, 1.1, 1.0], partX: 3.2, r: [-0.15, 0.35, -0.25] },
      { start: [-2.1, 1.6, -19], end: [-2.7, 1.4, -0.5], partX: -3.6, r: [0.1, -0.3, 0.2] },
      { start: [2.3, -1.5, -20], end: [2.8, -1.3, -0.2], partX: 3.5, r: [-0.2, 0.25, -0.15] },
      { start: [-0.3, 0.2, -28], end: [-1.2, -0.2, 2.1], partX: -2.8, r: [0.25, -0.45, 0.3] },
      { start: [0.5, -0.6, -27], end: [1.4, 0.3, 1.9], partX: 2.9, r: [-0.3, 0.4, -0.2] },
      { start: [-1.6, -1.9, -17], end: [-3.0, -1.6, -1.5], partX: -3.9, r: [0.1, -0.2, 0.1] },
      { start: [1.9, 1.7, -18], end: [3.1, 1.5, -1.2], partX: 3.7, r: [-0.1, 0.2, -0.1] },
    ];

    for (let i = 0; i < paperCount; i++) {
      const cfg = paperConfigs[i];
      const pGroup = new THREE.Group();

      // Front curved paper geometry
      const pGeom = new THREE.PlaneGeometry(1.4, 1.85, 20, 20);
      const pos = pGeom.attributes.position;
      for (let j = 0; j < pos.count; j++) {
        const u = pos.getX(j);
        const v = pos.getY(j);
        const curl = Math.sin(u * 2.2) * 0.05 + Math.cos(v * 1.5) * 0.02;
        pos.setZ(j, curl);
      }
      pGeom.computeVertexNormals();

      const pMat = new THREE.MeshStandardMaterial({
        map: frontTex,
        roughness: 0.88,
        metalness: 0.04,
        side: THREE.DoubleSide,
      });
      const frontMesh = new THREE.Mesh(pGeom, pMat);
      frontMesh.castShadow = !isSoftwareGl;
      frontMesh.receiveShadow = !isSoftwareGl;
      pGroup.add(frontMesh);

      // Inner unfolding page
      const innerGeom = new THREE.PlaneGeometry(1.38, 1.83, 12, 12);
      const innerMat = new THREE.MeshStandardMaterial({
        color: 0xede6d4,
        roughness: 0.9,
        side: THREE.DoubleSide,
      });
      const innerMesh = new THREE.Mesh(innerGeom, innerMat);
      innerMesh.position.set(-0.02, -0.01, -0.03);
      innerMesh.rotation.y = -0.12;
      pGroup.add(innerMesh);

      pGroup.position.set(cfg.start[0], cfg.start[1], cfg.start[2]);
      pGroup.rotation.set(cfg.r[0], cfg.r[1], cfg.r[2]);

      papersMaster.add(pGroup);

      flyingPapers.push({
        group: pGroup,
        frontMesh,
        innerMesh,
        startX: cfg.start[0],
        startY: cfg.start[1],
        startZ: cfg.start[2],
        targetX: cfg.end[0],
        targetY: cfg.end[1],
        targetZ: cfg.end[2],
        partingOffsetX: cfg.partX,
        rotSpeedX: (Math.random() - 0.5) * 0.4,
        rotSpeedY: (Math.random() - 0.5) * 0.5,
        rotSpeedZ: (Math.random() - 0.5) * 0.3,
        baseRotX: cfg.r[0],
        baseRotY: cfg.r[1],
        baseRotZ: cfg.r[2],
      });
    }

    // 6. GSAP Cinematic Choreography Timeline (Full Flying Paper Movement + Sunrise + Brand Reveal)
    const playOpeningTimeline = () => {
      setSceneStage(1);
      timelineStateRef.current.sunScale = 0.1;
      timelineStateRef.current.sunIntensity = 0.0;
      timelineStateRef.current.rayOpacity = 0.0;
      timelineStateRef.current.rayScale = 0.5;
      timelineStateRef.current.cameraZ = 6.8;
      timelineStateRef.current.cameraY = 0.0;
      timelineStateRef.current.cameraFov = 46;
      timelineStateRef.current.newspaperFlightProgress = 0.0;
      timelineStateRef.current.papersParting = 0.0;
      timelineStateRef.current.brandRevealOpacity = 0.0;
      timelineStateRef.current.brandRevealY = 25;
      timelineStateRef.current.subtitleOpacity = 0.0;
      timelineStateRef.current.timeTextOpacity = 0.0;

      const master = gsap.timeline();

      // SCENE 1: Cinematic Intro & Early Dawn Sunrise (0.0s - 2.5s)
      master.add(() => setSceneStage(1), 0);

      master.to(
        timelineStateRef.current,
        {
          sunIntensity: 3.5,
          sunScale: 1.0,
          rayOpacity: 0.75,
          rayScale: 1.0,
          cameraZ: 5.6,
          duration: 2.6,
          ease: 'power2.out',
        },
        0
      );

      master.to(
        sunMat,
        {
          opacity: 0.9,
          duration: 2.4,
          ease: 'power2.out',
        },
        0
      );

      master.to(
        particleMat,
        {
          opacity: 0.85,
          duration: 2.0,
          ease: 'power1.out',
        },
        0.5
      );

      // SCENE 2: FLYING NEWSPAPERS SWOOP IN (2.4s - 5.4s)
      master.add(() => setSceneStage(2), 2.4);

      master.to(
        timelineStateRef.current,
        {
          newspaperFlightProgress: 1.0,
          cameraZ: 4.8,
          cameraY: 0.1,
          duration: 3.0,
          ease: 'power3.out',
        },
        2.4
      );

      // SCENE 3: BRAND REVEAL & NEWSPAPERS PART TO SIDES (5.2s - 8.2s)
      master.add(() => setSceneStage(3), 5.2);

      // Newspapers part to the sides to clear the center stage
      master.to(
        timelineStateRef.current,
        {
          papersParting: 1.0,
          duration: 2.2,
          ease: 'power3.inOut',
        },
        5.2
      );

      // Brand Title reveals in center with golden metallic illumination
      master.to(
        timelineStateRef.current,
        {
          brandRevealOpacity: 1.0,
          brandRevealY: 0,
          duration: 1.6,
          ease: 'power2.out',
        },
        5.5
      );

      // Subtitle 1: "YOUR NEWS. AT YOUR DOOR. EVERY MORNING."
      master.to(
        timelineStateRef.current,
        {
          subtitleOpacity: 1.0,
          duration: 1.2,
          ease: 'power2.out',
        },
        6.4
      );

      // Subtitle 2: "Fresh Newspapers Delivered at 6:00 AM."
      master.to(
        timelineStateRef.current,
        {
          timeTextOpacity: 1.0,
          duration: 1.2,
          ease: 'power2.out',
        },
        7.2
      );

      // SCENE 4: FINAL VISUAL & BRIGHT SUNRISE (8.0s+)
      master.add(() => setSceneStage(4), 8.0);

      master.to(
        timelineStateRef.current,
        {
          sunIntensity: 4.5,
          rayOpacity: 0.95,
          cameraZ: 5.0,
          duration: 1.8,
          ease: 'power2.out',
        },
        8.0
      );
    };

    replayIntroRef.current = playOpeningTimeline;

    // Start timeline on mount
    const timer = setTimeout(() => {
      playOpeningTimeline();
    }, 150);

    // Mouse / Touch Parallax
    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      timelineStateRef.current.mouseTargetX = normX * 0.35;
      timelineStateRef.current.mouseTargetY = normY * 0.25;
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

    // Render Animation Loop (With Paper Movement Animation Active)
    let animId = 0;
    const loopClock = new THREE.Clock();

    const renderLoop = () => {
      const delta = loopClock.getDelta();
      const elapsed = loopClock.getElapsedTime();
      const st = timelineStateRef.current;

      // Camera Damping
      camera.position.z = THREE.MathUtils.damp(camera.position.z, st.cameraZ, 5, delta);
      camera.position.y = THREE.MathUtils.damp(
        camera.position.y,
        st.cameraY + st.mouseTargetY * 0.4,
        4,
        delta
      );
      camera.position.x = THREE.MathUtils.damp(
        camera.position.x,
        st.mouseTargetX * 0.5,
        4,
        delta
      );

      // Sunrise Lighting & Rays
      sunCoreLight.intensity = st.sunIntensity;
      sunMesh.scale.setScalar(st.sunScale);
      sunriseGroup.rotation.z = elapsed * 0.12;
      rayMeshes.forEach((rm) => {
        (rm.material as THREE.MeshBasicMaterial).opacity = st.rayOpacity;
        rm.scale.set(st.rayScale, st.rayScale, 1);
      });

      // Flying Newspapers Movement & Physics
      const flightProgress = st.newspaperFlightProgress;
      const partingProgress = st.papersParting;

      flyingPapers.forEach((paper, idx) => {
        // Fly forward along 3D trajectory
        const currentX = THREE.MathUtils.lerp(paper.startX, paper.targetX, flightProgress);
        const currentY = THREE.MathUtils.lerp(paper.startY, paper.targetY, flightProgress);
        const currentZ = THREE.MathUtils.lerp(paper.startZ, paper.targetZ, flightProgress);

        // Part to sides in Scene 3/4
        const partedX = currentX + paper.partingOffsetX * partingProgress;

        // Gentle floating orbit once arrived
        const gentleBobY = Math.sin(elapsed * 1.5 + idx) * 0.08 * flightProgress;
        const gentleSwayX = Math.cos(elapsed * 1.2 + idx) * 0.05 * flightProgress;

        paper.group.position.set(partedX + gentleSwayX, currentY + gentleBobY, currentZ);

        // Realistic tumbling rotation
        paper.group.rotation.x = paper.baseRotX + Math.sin(elapsed * 1.4 + idx) * 0.15;
        paper.group.rotation.y = paper.baseRotY + Math.cos(elapsed * 1.2 + idx) * 0.2;
        paper.group.rotation.z = paper.baseRotZ + Math.sin(elapsed * 0.9 + idx) * 0.1;

        // Dynamic page flutter
        paper.innerMesh.rotation.y = -0.12 + Math.sin(elapsed * 3.0 + idx) * 0.08;
      });

      // Floating dust particles upwards
      if (particleMat.opacity > 0.05) {
        const pArr = particleGeom.attributes.position.array as Float32Array;
        for (let p = 1; p < particlePositions.length; p += 3) {
          pArr[p] += delta * 0.35;
          if (pArr[p] > 6) {
            pArr[p] = -6;
          }
        }
        particleGeom.attributes.position.needsUpdate = true;
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
      sunGeom.dispose();
      sunMat.dispose();
      frontTex.dispose();
      particleGeom.dispose();
      particleMat.dispose();
    };
  }, []);

  const scrollToServices = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full min-h-[95vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#020614] text-white">
      {/* 3D WebGL Canvas with Flying Papers & Sunrise */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
        title="3D Cinematic Opening: Golden Sunrise & Flying 3D Newspapers"
      />

      {/* Atmospheric Dawn Overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background:
            sceneStage >= 2
              ? 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.18) 0%, rgba(220, 38, 38, 0.08) 35%, transparent 70%)'
              : 'transparent',
        }}
      />

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(2,6,20,0.88)_90%)]" />

      {/* Top Floating Controls */}
      <div className="absolute top-24 lg:top-28 right-4 lg:right-10 z-30 flex items-center gap-2.5">
        <button
          onClick={() => replayIntroRef.current()}
          className="px-3.5 py-2 rounded-full bg-black/60 hover:bg-black/90 text-slate-300 hover:text-amber-300 border border-white/15 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-md shadow-xl"
          title="Replay 3D Cinematic Sequence"
        >
          <RotateCcw className="w-3 h-3 text-amber-400" />
          <span>Replay 3D Intro</span>
        </button>
      </div>

      {/* Floating 6:00 AM Badge Top Left */}
      <div className="absolute top-24 lg:top-28 left-4 lg:left-10 z-30 pointer-events-auto">
        <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-2.5 shadow-2xl border border-amber-400/30">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-amber-200 font-semibold">
              DAILY DELIVERY AT 6:00 AM
            </span>
            <span className="text-[10px] text-slate-300">Naroda & Nikol, Ahmedabad</span>
          </div>
        </div>
      </div>

      {/* Center Brand Reveal & Headlines */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-none flex flex-col items-center justify-center min-h-[90vh] py-20">
        <div
          className="max-w-4xl mx-auto transition-all duration-700"
          style={{
            opacity: sceneStage >= 3 ? 1 : 0,
            transform: `translateY(${sceneStage >= 3 ? 0 : 25}px)`,
          }}
        >
          {/* Pre-title Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs uppercase tracking-widest font-semibold mb-6 shadow-2xl backdrop-blur-md pointer-events-auto">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>ESTABLISHED EXCELLENCE • FOUNDED BY PRAKASH BHAI KALAL</span>
          </div>

          {/* Exact Brand Name: LAXMI NEWSPAPER SERVICES */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black font-cinzel tracking-wider text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] leading-tight mb-4">
            <span className="text-gold-gradient drop-shadow-[0_0_40px_rgba(245,158,11,0.5)]">
              LAXMI NEWSPAPER
            </span>
            <br />
            <span className="text-white tracking-widest">SERVICES</span>
          </h1>

          {/* Golden Divider Rule */}
          <div className="w-32 h-1 bg-gradient-to-r from-red-600 via-amber-400 to-red-600 mx-auto rounded-full my-6 shadow-lg shadow-amber-500/50" />

          {/* Subtitle 1: "YOUR NEWS. AT YOUR DOOR. EVERY MORNING." */}
          <div
            className="text-lg sm:text-2xl lg:text-3xl font-cinzel font-bold text-amber-200 tracking-wide mb-3 transition-opacity duration-700 drop-shadow-md"
            style={{ opacity: sceneStage >= 3 ? 1 : 0 }}
          >
            &ldquo;YOUR NEWS. AT YOUR DOOR. EVERY MORNING.&rdquo;
          </div>

          {/* Subtitle 2: "Fresh Newspapers Delivered at 6:00 AM." */}
          <p
            className="text-sm sm:text-lg text-slate-200 font-editorial italic tracking-wider max-w-xl mx-auto mb-8 transition-opacity duration-700"
            style={{ opacity: sceneStage >= 3 ? 1 : 0 }}
          >
            Fresh Newspapers Delivered at 6:00 AM. Flat ₹180 / Month.
          </p>

          {/* Prominent Action Buttons */}
          <div className="pt-2 pointer-events-auto flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onSubscribeClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold text-sm tracking-wider shadow-2xl shadow-red-900/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer border border-amber-400/40"
            >
              <Send className="w-4 h-4 text-amber-300" />
              <span>SUBSCRIBE NOW (₹180/MO)</span>
            </button>

            <button
              onClick={onWhatsAppClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel hover:bg-emerald-950/40 hover:border-emerald-500/50 text-emerald-300 hover:text-emerald-200 font-bold text-sm tracking-wider transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer shadow-xl"
            >
              <MessageCircle className="w-4 h-4" />
              <span>CONTACT ON WHATSAPP</span>
            </button>

            <button
              onClick={scrollToServices}
              className="w-full sm:w-auto p-4 rounded-xl glass-panel text-slate-300 hover:text-amber-300 hover:bg-white/10 transition-all cursor-pointer flex items-center justify-center"
              title="Explore Services"
            >
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
