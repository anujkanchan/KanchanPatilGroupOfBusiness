import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  MapPin,
  ExternalLink,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Leaf,
  Navigation,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
  Crosshair,
  Maximize2,
  ChevronDown,
  ChevronUp,
  GripHorizontal
} from 'lucide-react';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import kanchanLogo from '../assets/images/kanchan_group_logo.jpg';
import {
  CONTINENT_PATHS,
  INDIA_PATH,
  GEO_COORDINATES,
  FARM_LOCATION_DETAILS
} from '../data/worldMapData';
import { KANCHAN_PATIL_FARMS_MAP_URL } from './StyledLocationsMap';
import { useLanguage } from '../context/LanguageContext';

export type MapZoomStage = 'global' | 'india' | 'maharashtra' | 'farm';

interface StageMeta {
  id: MapZoomStage;
  title: string;
  badge: string;
  camera: { x: number; y: number; z: number; targetX: number; targetY: number; targetZ: number };
  description: string;
}

// Exact Three.js geographic coordinates for Pune & Uruli Kanchan, Maharashtra, India
// Latitude: ~18.52°N, Longitude: ~73.86°E -> projected threeX: 180.47, threeY: +46.06, continent depth z: 5
const PUNE_GEO = {
  threeX: 180.47,
  threeY: 46.06,
  threeZ: 5
};

const URULI_KANCHAN_GEO = {
  threeX: 181.14,
  threeY: 45.98,
  threeZ: 5
};

const STAGES: StageMeta[] = [
  {
    id: 'global',
    title: 'Global World Presence',
    badge: 'STAGE 1 • GLOBAL HORIZON',
    camera: { x: 0, y: 0, z: 460, targetX: 0, targetY: 0, targetZ: 0 },
    description: 'Rooted in Indian sustainable agricultural wisdom, bridging global quality standards.'
  },
  {
    id: 'india',
    title: 'National Footprint — India',
    badge: 'STAGE 2 • NATIONAL GRID',
    camera: { x: 180.5, y: 46.06, z: 165, targetX: 180.5, targetY: 46.06, targetZ: 0 },
    description: 'Expanding pure native Gavran supply chain across key Western & Pan-Indian metro routes.'
  },
  {
    id: 'maharashtra',
    title: 'Regional Core — Western Maharashtra & Pune',
    badge: 'STAGE 3 • REGIONAL HEARTLAND',
    camera: { x: 180.8, y: 46.06, z: 80, targetX: 180.8, targetY: 46.06, targetZ: 0 },
    description: 'Strategic headquarters anchored along the high-efficiency Pune-Solapur transit corridor.'
  },
  {
    id: 'farm',
    title: "Kanchan Patil Farm's — Uruli Kanchan",
    badge: 'STAGE 4 • AGRO-SANCTUARY',
    camera: { x: 181.14, y: 45.98, z: 34, targetX: 181.14, targetY: 45.98, targetZ: 0 },
    description: 'Corporate headquarters, pure Gavran poultry breeding sanctuary, and high-tech plant nursery.'
  }
];

export const GlobalPresenceMapSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [isPlayingAutoTour, setIsPlayingAutoTour] = useState<boolean>(false);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [showInfoCard, setShowInfoCard] = useState<boolean>(false);
  const [isCardCollapsed, setIsCardCollapsed] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Exact 2D screen projected coordinates of Pune (calculated every frame from 3D camera)
  const [markerScreenPos, setMarkerScreenPos] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: true
  });

  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchDistRef = useRef<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const threeStateRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    targetCamPos: THREE.Vector3;
    targetLookAt: THREE.Vector3;
    currentLookAt: THREE.Vector3;
    animFrameId: number;
    particles: THREE.Points;
    puneMarkerMesh: THREE.Group;
  } | null>(null);

  const currentStage = STAGES[currentStageIndex];

  // Verified Google Maps Place URL for Kanchan Patil Farm's (matching all other locations)
  const handleOpenGoogleMaps = useCallback(() => {
    window.open(KANCHAN_PATIL_FARMS_MAP_URL, '_blank', 'noopener,noreferrer');
  }, []);

  // Compute camera parameters adapted for desktop vs mobile aspect ratio
  const getStageCameraConfig = useCallback((stageIndex: number, width: number, height: number) => {
    const stage = STAGES[stageIndex];
    const isMobile = width < 768;
    const aspect = width / Math.max(height, 1);

    if (stage.id === 'global') {
      if (isMobile || aspect < 1.1) {
        // On mobile / narrow screens, frame India & Eurasia centered
        const z = Math.max(540, 430 / Math.max(aspect, 0.65));
        return {
          x: 55,
          y: 15,
          z: Math.min(z, 660),
          targetX: 55,
          targetY: 15,
          targetZ: 0
        };
      }
      return stage.camera;
    }
    if (stage.id === 'india') {
      if (isMobile) {
        return { x: 180.5, y: 46.06, z: 200, targetX: 180.5, targetY: 46.06, targetZ: 0 };
      }
      return stage.camera;
    }
    if (stage.id === 'maharashtra') {
      if (isMobile) {
        return { x: 180.8, y: 46.06, z: 100, targetX: 180.8, targetY: 46.06, targetZ: 0 };
      }
      return stage.camera;
    }
    if (stage.id === 'farm') {
      if (isMobile) {
        return { x: 181.14, y: 45.98, z: 40, targetX: 181.14, targetY: 45.98, targetZ: 0 };
      }
      return stage.camera;
    }
    return stage.camera;
  }, []);

  // Direct zoom into Kanchan Patil Farm location in Uruli Kanchan, Pune
  const handleDirectZoomToFarm = useCallback(() => {
    setIsPlayingAutoTour(false);
    setCurrentStageIndex(3);
    setShowInfoCard(true);
    setIsCardCollapsed(false);

    if (threeStateRef.current && canvasRef.current) {
      const { targetCamPos, targetLookAt } = threeStateRef.current;
      const w = canvasRef.current.clientWidth || 1000;
      const h = canvasRef.current.clientHeight || 550;
      const cam = getStageCameraConfig(3, w, h);
      targetCamPos.set(cam.x, cam.y, cam.z);
      targetLookAt.set(cam.targetX, cam.targetY, cam.targetZ);
    }
  }, [getStageCameraConfig]);

  // Click handler on K Group logo emblem: zooms in first into Kanchan Patil Farm, then opens Google Maps directly!
  const mapOpenTimerRef = useRef<number | null>(null);

  // Clean up any pending timer on unmount
  useEffect(() => {
    return () => {
      if (mapOpenTimerRef.current !== null) {
        window.clearTimeout(mapOpenTimerRef.current);
      }
    };
  }, []);

  const handleLogoMarkerClick = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.stopPropagation();
      }

      // Step 1: Immediately initiate smooth 3D zoom into Kanchan Patil Farm in Uruli Kanchan, Pune
      handleDirectZoomToFarm();

      // Clear any prior pending timer
      if (mapOpenTimerRef.current !== null) {
        window.clearTimeout(mapOpenTimerRef.current);
      }

      // Step 2: Allow the cinematic zoom animation to showcase Pune & Uruli Kanchan farm first, then directly open Google Maps
      const zoomDelay = reducedMotion ? 400 : 1200;
      mapOpenTimerRef.current = window.setTimeout(() => {
        window.open(KANCHAN_PATIL_FARMS_MAP_URL, '_blank', 'noopener,noreferrer');
        mapOpenTimerRef.current = null;
      }, zoomDelay);
    },
    [handleDirectZoomToFarm, reducedMotion]
  );

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
      }
    } catch {
      setWebglSupported(false);
    }
  }, []);

  // Auto-tour timer
  useEffect(() => {
    if (!isPlayingAutoTour) return;

    const timer = setInterval(() => {
      setCurrentStageIndex((prev) => {
        if (prev >= STAGES.length - 1) {
          setIsPlayingAutoTour(false);
          return prev;
        }
        return prev + 1;
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [isPlayingAutoTour]);

  // Sync info card visibility with stage
  useEffect(() => {
    if (currentStage.id === 'farm') {
      setShowInfoCard(true);
    }
  }, [currentStage.id]);

  // Three.js Scene Setup and Lifecycle
  useEffect(() => {
    if (!webglSupported || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = canvas.clientWidth || 1000;
    const height = canvas.clientHeight || 550;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6f0e4); // Refined warm champagne / beige wall

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1500);
    const initialCam = getStageCameraConfig(0, width, height);
    camera.position.set(initialCam.x, initialCam.y, initialCam.z);

    // Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
    } catch (e) {
      console.warn('WebGL init failed, using vector fallback', e);
      setWebglSupported(false);
      return;
    }

    // Lights matching the photo's warm wall-sconce illumination
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.3);
    scene.add(ambientLight);

    // Warm overhead ceiling downlight
    const topLight = new THREE.DirectionalLight(0xffecd2, 1.85);
    topLight.position.set(0, 200, 300);
    topLight.castShadow = true;
    topLight.shadow.mapSize.width = 1024;
    topLight.shadow.mapSize.height = 1024;
    topLight.shadow.camera.near = 10;
    topLight.shadow.camera.far = 1000;
    topLight.shadow.bias = -0.001;
    scene.add(topLight);

    // Soft warm fill light from bottom
    const fillLight = new THREE.DirectionalLight(0xd4af37, 0.45);
    fillLight.position.set(0, -200, 150);
    scene.add(fillLight);

    // Wall Plane (Backing champagne wall with subtle bevel and shadow receiver)
    const wallGeo = new THREE.PlaneGeometry(1400, 800);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0xf4eee2,
      roughness: 0.85,
      metalness: 0.05
    });
    const wallMesh = new THREE.Mesh(wallGeo, wallMat);
    wallMesh.position.set(0, 0, -8);
    wallMesh.receiveShadow = true;
    scene.add(wallMesh);

    // Map Group
    const mapGroup = new THREE.Group();
    scene.add(mapGroup);

    // Material for Extruded 3D Continents (Dark walnut / ebony brown wood)
    const continentWoodMat = new THREE.MeshStandardMaterial({
      color: 0x1d1510,
      roughness: 0.65,
      metalness: 0.2
    });

    // Material for the Warm Golden Backlight Glow around continent edges
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xffbe3b,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });

    // SVGLoader to create 3D extruded shapes from paths
    const loader = new SVGLoader();

    Object.entries(CONTINENT_PATHS).forEach(([key, pathStr]) => {
      if (!pathStr) return;
      try {
        const svgParsed = loader.parse(`<svg><path d="${pathStr}" /></svg>`);
        svgParsed.paths.forEach((path) => {
          const shapes = path.toShapes();
          if (!shapes || shapes.length === 0) return;

          // Extrude geometry for the 3D wooden pieces
          const extrudeGeo = new THREE.ExtrudeGeometry(shapes, {
            depth: 5,
            bevelEnabled: true,
            bevelSegments: 2,
            steps: 1,
            bevelSize: 1.2,
            bevelThickness: 1.2
          });

          // In Three.js, SVG paths y-coordinates are inverted from normal 3D
          const mesh = new THREE.Mesh(extrudeGeo, continentWoodMat);
          mesh.scale.set(1, -1, 1);
          mesh.position.set(0, 0, 0);
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mapGroup.add(mesh);

          // Backlight Halo Layer behind each piece
          const haloGeo = new THREE.ShapeGeometry(shapes);
          const haloMesh = new THREE.Mesh(haloGeo, glowMat);
          haloMesh.scale.set(1.025, -1.025, 1);
          haloMesh.position.set(0, 0, -1.5);
          mapGroup.add(haloMesh);
        });
      } catch (err) {
        console.warn(`Error generating continent 3D shape for ${key}:`, err);
      }
    });

    // India Highlight: ONLY India with a thin, elegant light-orange border (#FFB366) and subtle illuminated glow
    // - NO fill: India's interior remains the dark ebony/walnut wood matching the global map
    // - Accurate geographic boundary data: uses exact INDIA_PATH coordinates
    // - Positioned at z = 6.32 - 6.38 to rest cleanly on top of the 3D continent surface (top face is at z = 6.20)
    let indiaBorderGroup: THREE.Group | null = null;
    let indiaBorderMat: THREE.MeshBasicMaterial | null = null;
    let indiaGlowMat: THREE.MeshBasicMaterial | null = null;
    let indiaLineMat: THREE.LineBasicMaterial | null = null;

    if (INDIA_PATH) {
      try {
        indiaBorderGroup = new THREE.Group();

        // Extract coordinate points from INDIA_PATH accurately
        const rawMatches = INDIA_PATH.match(/[ML](-?[\d.]+),(-?[\d.]+)/g) || [];
        const rawPoints = rawMatches.map((token) => {
          const [px, py] = token.slice(1).split(',').map(Number);
          return new THREE.Vector2(px, py);
        });

        if (rawPoints.length > 2) {
          // Closed loop of India's exact geographic border
          const closedPoints = [...rawPoints, rawPoints[0].clone()];

          // 1. Primary Crisp Light-Orange Border Ribbon Mesh (#FFB366 / 0xffb366)
          // Width: 1.4 world units -> thin, elegant, and clearly visible across all zooms
          const primaryStrokeGeo = SVGLoader.pointsToStroke(closedPoints, {
            strokeWidth: 1.4,
            strokeColor: '#FFB366',
            strokeLineJoin: 'round',
            strokeLineCap: 'round',
            strokeMiterLimit: 4
          });

          if (primaryStrokeGeo) {
            indiaBorderMat = new THREE.MeshBasicMaterial({
              color: 0xffb366, // Light orange
              side: THREE.DoubleSide,
              transparent: true,
              opacity: 0.95,
              depthTest: true
            });
            const primaryBorderMesh = new THREE.Mesh(primaryStrokeGeo, indiaBorderMat);
            primaryBorderMesh.scale.set(1, -1, 1);
            primaryBorderMesh.position.set(0, 0, 6.36); // Directly on 3D continent plate
            indiaBorderGroup.add(primaryBorderMesh);
          }

          // 2. Subtle Outer Light-Orange Illuminated Glow Aura Ribbon (#FF9933 / 0xff9933)
          // Width: 3.8 world units -> creates a soft, ambient glow directly around India's border
          const glowStrokeGeo = SVGLoader.pointsToStroke(closedPoints, {
            strokeWidth: 3.8,
            strokeColor: '#FF9933',
            strokeLineJoin: 'round',
            strokeLineCap: 'round',
            strokeMiterLimit: 4
          });

          if (glowStrokeGeo) {
            indiaGlowMat = new THREE.MeshBasicMaterial({
              color: 0xff9933, // Warm luminous orange
              side: THREE.DoubleSide,
              transparent: true,
              opacity: 0.42,
              blending: THREE.AdditiveBlending,
              depthWrite: false,
              depthTest: true
            });
            const glowMesh = new THREE.Mesh(glowStrokeGeo, indiaGlowMat);
            glowMesh.scale.set(1, -1, 1);
            glowMesh.position.set(0, 0, 6.32);
            indiaBorderGroup.add(glowMesh);
          }

          // 3. Ultra-fine crisp illuminated wire core atop the ribbon
          const linePoints3D = closedPoints.map((pt) => new THREE.Vector3(pt.x, -pt.y, 6.38));
          const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints3D);
          indiaLineMat = new THREE.LineBasicMaterial({
            color: 0xffd29d, // Warm highlight
            transparent: true,
            opacity: 0.85,
            depthTest: true
          });
          const coreLineMesh = new THREE.LineLoop(lineGeo, indiaLineMat);
          indiaBorderGroup.add(coreLineMesh);
        }

        mapGroup.add(indiaBorderGroup);
      } catch (err) {
        console.warn('Error constructing 3D India border highlight:', err);
      }
    }

    // Physical 3D Ground Disc at Pune, Maharashtra on top of continent surface
    const puneMarkerMesh = new THREE.Group();
    puneMarkerMesh.position.set(PUNE_GEO.threeX, PUNE_GEO.threeY, PUNE_GEO.threeZ);

    // Glowing Gold Base Disc directly on map surface
    const baseGeo = new THREE.RingGeometry(0.5, 4.5, 32);
    const baseMat = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.z = 0.2;
    puneMarkerMesh.add(baseMesh);

    // Concentric pulse wave disc
    const pulseRingGeo = new THREE.RingGeometry(3.5, 7.5, 32);
    const pulseRingMat = new THREE.MeshBasicMaterial({
      color: 0xdfba48,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide
    });
    const pulseRingMesh = new THREE.Mesh(pulseRingGeo, pulseRingMat);
    pulseRingMesh.position.z = 0.25;
    puneMarkerMesh.add(pulseRingMesh);

    mapGroup.add(puneMarkerMesh);

    // Connector filaments
    GEO_COORDINATES.connectors.forEach((conn) => {
      const p1 = new THREE.Vector3(conn.from[0], -conn.from[1], 1.5);
      const p2 = new THREE.Vector3(conn.to[0], -conn.to[1], 1.5);

      const lineGeo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xd4af37,
        linewidth: 2,
        transparent: true,
        opacity: 0.75
      });
      const line = new THREE.Line(lineGeo, lineMat);
      mapGroup.add(line);

      // Brass pin studs at wire ends
      [p1, p2].forEach((pt) => {
        const pinGeo = new THREE.CylinderGeometry(1.2, 1.2, 2.5, 12);
        const pinMat = new THREE.MeshStandardMaterial({
          color: 0xdfba48,
          metalness: 0.85,
          roughness: 0.25
        });
        const pin = new THREE.Mesh(pinGeo, pinMat);
        pin.rotation.x = Math.PI / 2;
        pin.position.copy(pt);
        mapGroup.add(pin);
      });
    });

    // Golden Point Lights positioned underneath continents for the real glowing warmth
    const backlight1 = new THREE.PointLight(0xffa826, 2.4, 280, 1.5);
    backlight1.position.set(0, 50, -2);
    scene.add(backlight1);

    const backlight2 = new THREE.PointLight(0xffbe3b, 2.4, 240, 1.5);
    backlight2.position.set(PUNE_GEO.threeX, PUNE_GEO.threeY, -2);
    scene.add(backlight2);

    const backlight3 = new THREE.PointLight(0xff9900, 1.8, 260, 1.5);
    backlight3.position.set(-180, -40, -2);
    scene.add(backlight3);

    // Ambient floating golden particle dust motes
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 800;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 450;
      particlePositions[i * 3 + 2] = Math.random() * 80 + 10;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffe17d,
      size: 2.2,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Initial targets
    const targetCamPos = new THREE.Vector3(initialCam.x, initialCam.y, initialCam.z);
    const targetLookAt = new THREE.Vector3(initialCam.targetX, initialCam.targetY, initialCam.targetZ);
    const currentLookAt = new THREE.Vector3(initialCam.targetX, initialCam.targetY, initialCam.targetZ);

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth || 1000;
      const h = canvas.clientHeight || 550;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);

      // Re-evaluate stage camera framing on dimension change
      const cam = getStageCameraConfig(currentStageIndex, w, h);
      targetCamPos.set(cam.x, cam.y, cam.z);
      targetLookAt.set(cam.targetX, cam.targetY, cam.targetZ);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    const timer = new THREE.Timer();

    const animate = (timestamp?: number) => {
      animId = requestAnimationFrame(animate);
      timer.update(timestamp);
      const elapsedTime = timer.getElapsed();

      // Smooth camera position and lookAt interpolation (Cubic lerp)
      const lerpFactor = reducedMotion ? 0.25 : 0.07;
      camera.position.lerp(targetCamPos, lerpFactor);
      currentLookAt.lerp(targetLookAt, lerpFactor);
      camera.lookAt(currentLookAt);

      // Subtle breathing motion for golden backlights
      const pulse = Math.sin(elapsedTime * 2.5) * 0.25 + 1;
      backlight2.intensity = 2.4 * pulse;
      baseMesh.scale.set(1 + pulse * 0.15, 1 + pulse * 0.15, 1);
      pulseRingMesh.scale.set(1 + pulse * 0.25, 1 + pulse * 0.25, 1);

      // Soft, pulsating illuminated animation for India's light-orange border (#FFB366) & glowing aura
      const indiaPulse = Math.sin(elapsedTime * 2.2) * 0.5 + 0.5; // Smooth 0..1 sine wave
      if (indiaGlowMat) {
        indiaGlowMat.opacity = 0.32 + indiaPulse * 0.28; // Luminous outer aura breathes 0.32 -> 0.60
      }
      if (indiaBorderMat) {
        indiaBorderMat.opacity = 0.82 + indiaPulse * 0.18; // Primary light-orange ribbon (#FFB366) 0.82 -> 1.00
      }
      if (indiaLineMat) {
        indiaLineMat.opacity = 0.72 + indiaPulse * 0.28; // Ultra-fine core highlight 0.72 -> 1.00
      }

      // Project 3D Pune coordinates to 2D Screen Space dynamically
      // Point directly on the continent surface at z = 5 (zero parallax offset!)
      const pune3D = new THREE.Vector3(PUNE_GEO.threeX, PUNE_GEO.threeY, 5);
      const projected = pune3D.clone().project(camera);

      // Point is in front of camera
      if (projected.z < 1) {
        const canvasW = canvas.clientWidth || 1000;
        const canvasH = canvas.clientHeight || 550;
        const sx = ((projected.x + 1) / 2) * canvasW;
        const sy = ((-projected.y + 1) / 2) * canvasH;

        setMarkerScreenPos({
          x: sx,
          y: sy,
          visible: true
        });
      } else {
        setMarkerScreenPos((prev) => ({ ...prev, visible: false }));
      }

      // Gentle drift for golden particles
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(elapsedTime + i) * 0.08;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    threeStateRef.current = {
      scene,
      camera,
      renderer,
      targetCamPos,
      targetLookAt,
      currentLookAt,
      animFrameId: animId,
      particles,
      puneMarkerMesh
    };

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      timer.dispose();
      renderer.dispose();
      wallGeo.dispose();
      wallMat.dispose();
      continentWoodMat.dispose();
      glowMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      baseGeo.dispose();
      baseMat.dispose();
      pulseRingGeo.dispose();
      pulseRingMat.dispose();
    };
  }, [webglSupported, reducedMotion, getStageCameraConfig]);

  // Update Three.js camera targets on stage change
  useEffect(() => {
    if (!threeStateRef.current || !canvasRef.current) return;
    const { targetCamPos, targetLookAt } = threeStateRef.current;
    const w = canvasRef.current.clientWidth || 1000;
    const h = canvasRef.current.clientHeight || 550;
    const stageCam = getStageCameraConfig(currentStageIndex, w, h);

    targetCamPos.set(stageCam.x, stageCam.y, stageCam.z);
    targetLookAt.set(stageCam.targetX, stageCam.targetY, stageCam.targetZ);
  }, [currentStageIndex, getStageCameraConfig]);

  // Handle stage change
  const handleStageSelect = useCallback((index: number) => {
    setIsPlayingAutoTour(false);
    setCurrentStageIndex(index);
    if (index === 3) {
      setShowInfoCard(true);
      setIsCardCollapsed(false);
    }
  }, []);

  const handleResetToWorld = useCallback(() => {
    setIsPlayingAutoTour(false);
    setCurrentStageIndex(0);
    setShowInfoCard(false);
    if (threeStateRef.current && canvasRef.current) {
      const { targetCamPos, targetLookAt } = threeStateRef.current;
      const w = canvasRef.current.clientWidth || 1000;
      const h = canvasRef.current.clientHeight || 550;
      const stageCam = getStageCameraConfig(0, w, h);
      targetCamPos.set(stageCam.x, stageCam.y, stageCam.z);
      targetLookAt.set(stageCam.targetX, stageCam.targetY, stageCam.targetZ);
    }
  }, [getStageCameraConfig]);

  // Zoom In: Steps forward to next closer zoom level (0 -> 1 -> 2 -> 3)
  const handleZoomIn = useCallback(() => {
    setIsPlayingAutoTour(false);
    if (currentStageIndex < STAGES.length - 1) {
      handleStageSelect(currentStageIndex + 1);
    } else if (threeStateRef.current) {
      // Extra micro-zoom when already at Farm sanctuary
      const { targetCamPos } = threeStateRef.current;
      targetCamPos.z = Math.max(18, targetCamPos.z * 0.72);
    }
  }, [currentStageIndex, handleStageSelect]);

  // Zoom Out: Steps backward to previous wider zoom level (3 -> 2 -> 1 -> 0)
  const handleZoomOut = useCallback(() => {
    setIsPlayingAutoTour(false);
    if (threeStateRef.current && canvasRef.current) {
      const { targetCamPos } = threeStateRef.current;
      const w = canvasRef.current.clientWidth || 1000;
      const h = canvasRef.current.clientHeight || 550;
      const currentConfig = getStageCameraConfig(currentStageIndex, w, h);
      if (targetCamPos.z < currentConfig.z - 4) {
        targetCamPos.z = currentConfig.z;
        return;
      }
    }

    if (currentStageIndex > 0) {
      handleStageSelect(currentStageIndex - 1);
    } else if (threeStateRef.current) {
      const { targetCamPos } = threeStateRef.current;
      targetCamPos.z = Math.min(650, targetCamPos.z * 1.35);
    }
  }, [currentStageIndex, handleStageSelect, getStageCameraConfig]);

  // Interactive Pan / Move the location around in the box (Mouse & Touch)
  const handlePan = useCallback((deltaX: number, deltaY: number) => {
    if (!threeStateRef.current) return;
    const { camera, targetCamPos, targetLookAt } = threeStateRef.current;

    // Scale pan speed proportionally to current zoom depth for natural feel
    const factor = (camera.position.z / 500) * 0.9;
    const dx = deltaX * factor;
    const dy = deltaY * factor;

    // Direct 1:1 translation with smooth bounded limits
    targetCamPos.x = Math.max(-500, Math.min(500, targetCamPos.x - dx));
    targetCamPos.y = Math.max(-350, Math.min(350, targetCamPos.y + dy));
    targetLookAt.x = Math.max(-500, Math.min(500, targetLookAt.x - dx));
    targetLookAt.y = Math.max(-350, Math.min(350, targetLookAt.y + dy));
  }, []);

  // Zoom In / Out Controls
  const handleZoom = useCallback((zoomIn: boolean) => {
    if (zoomIn) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  }, [handleZoomIn, handleZoomOut]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    handlePan(dx, dy);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Touch drag handlers (for mobile single finger drag & two finger pinch-to-zoom)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      touchDistRef.current = null;
    } else if (e.touches.length === 2) {
      isDraggingRef.current = false;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchDistRef.current = Math.hypot(dx, dy);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDraggingRef.current) {
      const dx = e.touches[0].clientX - dragStartRef.current.x;
      const dy = e.touches[0].clientY - dragStartRef.current.y;
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      handlePan(dx, dy);
    } else if (e.touches.length === 2 && touchDistRef.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const delta = dist - touchDistRef.current;
      touchDistRef.current = dist;
      if (Math.abs(delta) > 3) {
        handleZoom(delta > 0);
      }
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    touchDistRef.current = null;
  };

  // Dynamic SVG viewBox for vector fallback when WebGL is inactive
  const svgViewBox = useMemo(() => {
    switch (currentStageIndex) {
      case 1:
        return '40 -70 280 200';
      case 2:
        return '100 -20 150 110';
      case 3:
        return '140 10 80 60';
      case 0:
      default:
        return '-350 -180 700 360';
    }
  }, [currentStageIndex]);

  // Non-passive wheel event listener on viewport so scrolling over canvas zooms smoothly
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    let lastWheelTime = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = performance.now();
      if (now - lastWheelTime < 240) return;

      if (e.deltaY < -8) {
        lastWheelTime = now;
        handleZoomIn();
      } else if (e.deltaY > 8) {
        lastWheelTime = now;
        handleZoomOut();
      }
    };

    vp.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      vp.removeEventListener('wheel', onWheel);
    };
  }, [handleZoomIn, handleZoomOut]);

  return (
    <section
      id="global-presence"
      ref={containerRef}
      className="relative py-16 sm:py-24 bg-[#090807] overflow-hidden text-white border-t border-[#D4AF37]/15"
      aria-label="Kanchan Patil Group Global Presence"
    >
      {/* Ambient background gold/carbon glow gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#D4AF37]/10 via-[#795B16]/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-24 right-10 w-80 h-80 bg-[#1F6B3A]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Soft, pulsating CSS keyframe animation for India light-orange border (#FFB366) and glowing aura */}
      <style>{`
        @keyframes indiaBorderPulse {
          0%, 100% {
            stroke-opacity: 0.85;
            filter: drop-shadow(0 0 3px rgba(255, 179, 102, 0.45)) drop-shadow(0 0 8px rgba(255, 153, 51, 0.35));
            opacity: 0.85;
          }
          50% {
            stroke-opacity: 1;
            filter: drop-shadow(0 0 7px rgba(255, 179, 102, 0.95)) drop-shadow(0 0 16px rgba(255, 153, 51, 0.7));
            opacity: 1;
          }
        }
        @keyframes indiaGlowPulse {
          0%, 100% {
            stroke-opacity: 0.35;
            filter: drop-shadow(0 0 6px rgba(255, 153, 51, 0.4));
            opacity: 0.38;
          }
          50% {
            stroke-opacity: 0.75;
            filter: drop-shadow(0 0 12px rgba(255, 179, 102, 0.85)) drop-shadow(0 0 24px rgba(255, 153, 51, 0.65));
            opacity: 0.72;
          }
        }
        .india-border-pulse, [stroke="#FFB366"] {
          animation: indiaBorderPulse 2.8s ease-in-out infinite;
        }
        .india-glow-pulse {
          animation: indiaGlowPulse 2.8s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
          {/* Executive Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37]/15 via-black/40 to-[#D4AF37]/15 border border-[#D4AF37]/35 shadow-[0_0_20px_rgba(212,175,55,0.2)] mb-3 sm:mb-4"
          >
            <Globe className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#E6C665]">
              {t('map.eyebrow')}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight text-white mb-2.5 sm:mb-3"
          >
            {language === 'mr' ? (
              <>
                आमची{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5DE93] via-[#D4AF37] to-[#AA7C11]">
                  जागतिक उपस्थिती
                </span>
              </>
            ) : (
              <>
                OUR{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5DE93] via-[#D4AF37] to-[#AA7C11]">
                  GLOBAL PRESENCE
                </span>
              </>
            )}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl font-heading italic text-[#E5D7B7] mb-2 sm:mb-3 font-normal"
          >
            {language === 'mr' ? '“भारतात मुळे. सीमांच्या पलीकडे विस्तार.”' : '“Rooted in India. Growing Beyond Borders.”'}
          </motion.p>

          {/* Context paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed max-w-2xl mx-auto px-2"
          >
            {t('map.subtitle')}
          </motion.p>
        </div>

        {/* The Wall Exhibit Frame (Inspired directly by the uploaded wooden backlit reference image) */}
        <div className="relative rounded-2xl sm:rounded-3xl p-[2px] bg-gradient-to-b from-[#D4AF37]/50 via-[#7E5E1C]/35 to-[#1A140B] shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_35px_rgba(212,175,55,0.18)] overflow-hidden">
          {/* Top Architectural Museum Wall Rail */}
          <div className="bg-[#120F0C] border-b border-[#D4AF37]/25 px-3 sm:px-6 py-2.5 sm:py-3.5 flex flex-wrap items-center justify-between gap-2 backdrop-blur-md">
            {/* Left: Stage Title & Indicator */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37] animate-pulse flex-shrink-0" />
              <div className="min-w-0">
                <h3 className="text-xs sm:text-base font-semibold text-white tracking-wide truncate">
                  {currentStage.title}
                </h3>
              </div>
            </div>

            {/* Right: Quick Action Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={handleDirectZoomToFarm}
                className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F5DE93] text-black font-bold text-[11px] sm:text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                title="Directly zoom to Kanchan Patil Farm in Uruli Kanchan, Pune"
              >
                <Crosshair className="w-3.5 h-3.5 text-black" />
                <span>{language === 'mr' ? 'फार्म झूम' : 'Zoom to Farm'}</span>
              </button>

              <button
                type="button"
                onClick={handleResetToWorld}
                className="px-2 sm:px-3 py-1.5 rounded-lg bg-black/60 border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[11px] sm:text-xs text-[#E5D7B7] hover:text-white active:scale-95 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Reset to full world view"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline">{language === 'mr' ? 'जागतिक दृश्य' : 'World View'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Stage Step Tabs (Mobile friendly horizontal scroll) */}
          <div className="bg-[#18130E] border-b border-[#D4AF37]/20 px-2 sm:px-3 py-2 flex items-center justify-start sm:justify-center overflow-x-auto gap-1.5 sm:gap-2 scrollbar-none">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {STAGES.map((stage, idx) => {
                const isActive = idx === currentStageIndex;
                const isPassed = idx < currentStageIndex;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => handleStageSelect(idx)}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium tracking-wide flex items-center gap-1.5 transition-all duration-300 cursor-pointer whitespace-nowrap active:scale-95 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3D781] text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.6)]'
                        : isPassed
                        ? 'bg-[#D4AF37]/15 text-[#E6C665] border border-[#D4AF37]/35 hover:bg-[#D4AF37]/25'
                        : 'bg-black/40 text-gray-400 border border-white/10 hover:border-[#D4AF37]/40 hover:text-gray-200'
                    }`}
                  >
                    <span className="text-[9px] sm:text-[10px] opacity-80">{idx + 1}.</span>
                    <span>{stage.title.split('—')[0].trim()}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Map Canvas Display Viewport (The Champagne / Beige Wall Experience) */}
          <div
            ref={viewportRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative w-full h-[480px] sm:h-[560px] md:h-[620px] bg-[#F6F0E4] overflow-hidden select-none touch-none cursor-grab active:cursor-grabbing"
          >
            {/* Warm overhead wall-wash lighting effect overlay */}
            <div className="absolute inset-0 bg-radial from-transparent via-[#EDE3D0]/30 to-[#D9CDB8]/60 pointer-events-none z-10" />

            {/* Drag hint overlay */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-[#D4AF37]/30 text-[10px] sm:text-xs text-[#E5D7B7] flex items-center gap-1.5 shadow-md">
              <Maximize2 className="w-3 h-3 text-[#D4AF37]" />
              <span>{t('map.dragHint')}</span>
            </div>

            {/* WebGL 3D Canvas */}
            {webglSupported ? (
              <canvas
                ref={canvasRef}
                className="w-full h-full block"
                aria-label="3D Illuminated World Map Board"
              />
            ) : (
              /* High-Fidelity SVG / Vector Fallback if WebGL is unavailable */
              <div className="w-full h-full flex items-center justify-center p-4 relative">
                <svg
                  viewBox={svgViewBox}
                  className="w-full h-full filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] transition-all duration-700 ease-out"
                >
                  <defs>
                    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComponentTransfer>
                        <feFuncA type="linear" slope="1.5" />
                      </feComponentTransfer>
                      <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="indiaGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="3.5" result="blur" />
                      <feComponentTransfer in="blur" result="boost">
                        <feFuncA type="linear" slope="1.8" />
                      </feComponentTransfer>
                      <feMerge>
                        <feMergeNode in="boost" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Golden backlight glow silhouettes */}
                  {Object.entries(CONTINENT_PATHS).map(([k, p]) => (
                    <path
                      key={`glow-${k}`}
                      d={p}
                      fill="none"
                      stroke="#FFBE3B"
                      strokeWidth="6"
                      strokeLinejoin="round"
                      filter="url(#goldGlow)"
                      opacity="0.85"
                    />
                  ))}

                  {/* Dark wooden continent plates */}
                  {Object.entries(CONTINENT_PATHS).map(([k, p]) => (
                    <path
                      key={`land-${k}`}
                      d={p}
                      fill="#1E1610"
                      stroke="#35261C"
                      strokeWidth="1.2"
                      strokeLinejoin="round"
                    />
                  ))}

                  {/* Highlight ONLY India with a thin, elegant light-orange border (#FFB366) and soft pulsating CSS keyframe glow - NO fill */}
                  {INDIA_PATH && (
                    <>
                      {/* Subtle illuminated orange glow aura around India's border */}
                      <path
                        d={INDIA_PATH}
                        fill="none"
                        stroke="#FF9933"
                        strokeWidth="3.4"
                        strokeLinejoin="round"
                        opacity="0.45"
                        filter="url(#indiaGlowFilter)"
                        className="india-glow-pulse"
                      />
                      {/* Crisp, thin light-orange border line (#FFB366) with soft pulsating CSS keyframe animation */}
                      <path
                        d={INDIA_PATH}
                        fill="none"
                        stroke="#FFB366"
                        strokeWidth="1.4"
                        strokeLinejoin="round"
                        className="india-border-pulse"
                      />
                    </>
                  )}
                </svg>
              </div>
            )}

            {/* Exact India, Maharashtra, Pune K Group Logo Marker */}
            {/* Positioned dynamically from 3D projected coordinates -> 100% Locked to Pune under all zooms & pans! */}
            {markerScreenPos.visible && (
              <div
                style={{
                  left: `${markerScreenPos.x}px`,
                  top: `${markerScreenPos.y}px`,
                  transform: 'translate(-50%, -100%)'
                }}
                className="absolute pointer-events-auto z-30 transition-[transform] duration-75"
              >
                <div
                  className="relative group cursor-pointer flex flex-col items-center select-none"
                  onClick={handleLogoMarkerClick}
                  title="Kanchan Patil Group Headquarters • Click to zoom in and open Kanchan Patil location"
                >
                  {/* Circular K Group Logo Emblem */}
                  <div className="relative">
                    {/* Golden pulsing radar wave rings */}
                    <span className="absolute -inset-3 sm:-inset-4 rounded-full bg-[#D4AF37]/45 animate-ping opacity-75 pointer-events-none" />
                    <span className="absolute -inset-1.5 sm:-inset-2.5 rounded-full bg-[#FFD700]/50 animate-pulse blur-sm pointer-events-none" />

                    {/* Rotating golden outer bezel ring with genuine K Group logo asset */}
                    <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full p-[2.5px] bg-gradient-to-tr from-[#FFD700] via-[#AA7C11] to-[#FFE894] shadow-[0_8px_25px_rgba(212,175,55,0.85),0_0_15px_rgba(0,0,0,0.8)] flex items-center justify-center transform group-hover:scale-115 active:scale-95 transition-transform duration-300">
                      <div className="w-full h-full rounded-full overflow-hidden bg-black ring-1 ring-black">
                        <img
                          src={kanchanLogo}
                          alt="Kanchan Patil Group Emblem"
                          className="w-full h-full object-cover filter contrast-125"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location indicator pin stem pointing directly to Pune coordinates */}
                  <div className="w-0.5 h-3.5 sm:h-4.5 bg-gradient-to-b from-[#D4AF37] via-[#FFD700] to-transparent mx-auto" />
                  <div className="w-2 h-2 rounded-full bg-[#FFD700] shadow-[0_0_10px_#FFD700] ring-1 ring-black/60 mx-auto -mt-0.5" />

                  {/* Persistent & hover callout badge */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 whitespace-nowrap bg-black/90 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-[#D4AF37]/70 shadow-[0_10px_25px_rgba(0,0,0,0.85)] text-center group-hover:border-[#FFD700] transition-all">
                    <div className="flex items-center gap-1 justify-center">
                      <Sparkles className="w-3 h-3 text-[#FFD700] animate-spin" />
                      <span className="text-[11px] sm:text-xs font-bold text-[#F5DE93]">
                        Pune, Maharashtra
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stage 4 Highlighted Uruli Kanchan Farm Marker & Estate Map Elements */}
            {currentStage.id === 'farm' && (
              <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
                {/* Concentric agricultural boundary perimeter rings */}
                <div className="w-64 h-64 sm:w-96 sm:h-96 rounded-full border border-[#D4AF37]/50 animate-pulse opacity-75" />
                <div className="absolute w-44 h-44 sm:w-72 sm:h-72 rounded-full border border-[#1F6B3A]/60 opacity-60" />

                {/* Biosecure grid markers */}
                <div className="absolute top-[22%] left-[16%] sm:left-[28%] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-black/80 border border-[#1F6B3A]/60 text-[9px] sm:text-[10px] text-[#A7F3D0] backdrop-blur-sm shadow-md">
                  🌱 K Group Nursery Greenhouses
                </div>
                <div className="absolute top-[28%] right-[12%] sm:right-[24%] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-black/80 border border-[#D4AF37]/60 text-[9px] sm:text-[10px] text-[#FDE68A] backdrop-blur-sm shadow-md">
                  🐔 Pure Gavran Free-Range Sanctuary
                </div>
                <div className="absolute bottom-[24%] left-[18%] sm:left-[32%] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-black/80 border border-white/20 text-[9px] sm:text-[10px] text-gray-300 backdrop-blur-sm shadow-md">
                  📍 NH 65 Pune-Solapur Corridor
                </div>
              </div>
            )}

            {/* Farm Location Floating Premium Information Card (Requirement 3 & 4) */}
            <AnimatePresence>
              {(currentStage.id === 'farm' || showInfoCard) && (
                <motion.div
                  initial={{ opacity: 0, y: 35, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 25, scale: 0.94 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-5 sm:right-5 sm:left-auto sm:max-w-md z-40"
                >
                  <div className="rounded-2xl p-[1.5px] bg-gradient-to-br from-[#FFE894] via-[#AA7C11] to-[#3A2A0F] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_25px_rgba(212,175,55,0.35)]">
                    <div className="bg-gradient-to-b from-[#14120F]/95 via-[#0D0B09]/95 to-black/95 backdrop-blur-xl rounded-2xl p-3 sm:p-4.5 text-white ring-1 ring-white/10">
                      {/* Top Header */}
                      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[#D4AF37]/25">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-8 h-8 rounded-full p-[1px] bg-gradient-to-tr from-[#D4AF37] to-[#FFF3B0] flex-shrink-0">
                            <img
                              src={kanchanLogo}
                              alt="Kanchan Patil Farm"
                              className="w-full h-full rounded-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-[#D4AF37] block truncate">
                              Corporate Headquarters & Farm
                            </span>
                            <h4 className="text-sm sm:text-base font-heading font-bold text-white tracking-wide truncate">
                              {FARM_LOCATION_DETAILS.name}
                            </h4>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <div className="px-2 py-0.5 rounded-full bg-[#1F6B3A]/30 border border-[#1F6B3A] text-[9px] text-[#A7F3D0] flex items-center gap-1 font-mono">
                            <ShieldCheck className="w-3 h-3 text-[#1F6B3A]" />
                            <span>Active</span>
                          </div>

                          {/* Mobile Collapse / Expand Button */}
                          <button
                            type="button"
                            onClick={() => setIsCardCollapsed(!isCardCollapsed)}
                            className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer sm:hidden"
                            title={isCardCollapsed ? 'Expand details' : 'Collapse details'}
                          >
                            {isCardCollapsed ? (
                              <ChevronUp className="w-4 h-4 text-[#D4AF37]" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Expandable Content Body */}
                      {!isCardCollapsed && (
                        <>
                          {/* Address */}
                          <div className="flex items-start gap-2 mb-2 text-xs text-gray-200">
                            <MapPin className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-white">{FARM_LOCATION_DETAILS.address}</p>
                              <p className="text-[10px] text-gray-400 mt-0.5">
                                {FARM_LOCATION_DETAILS.district} • Coordinates 18°29'13"N, 74°08'06"E
                              </p>
                            </div>
                          </div>

                          {/* Farm Features List */}
                          <div className="grid grid-cols-2 gap-1.5 mb-2.5">
                            <div className="p-1.5 rounded-lg bg-black/50 border border-[#D4AF37]/20 flex items-center gap-1.5">
                              <ShieldCheck className="w-3 h-3 text-[#D4AF37] flex-shrink-0" />
                              <span className="text-[10px] text-gray-300 truncate">Pure Gavran Poultry</span>
                            </div>
                            <div className="p-1.5 rounded-lg bg-black/50 border border-[#1F6B3A]/30 flex items-center gap-1.5">
                              <Leaf className="w-3 h-3 text-[#34D399] flex-shrink-0" />
                              <span className="text-[10px] text-gray-300 truncate">High-Tech Nursery</span>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Primary Button: VIEW FARM LOCATION (Opens Google Maps place directly) */}
                      <button
                        type="button"
                        onClick={handleOpenGoogleMaps}
                        className="w-full font-btn py-2 sm:py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wider text-black bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
                      >
                        <Navigation className="w-4 h-4 text-black group-hover:rotate-45 transition-transform duration-300" />
                        <span>{language === 'mr' ? 'फार्मचे स्थान पहा' : 'VIEW FARM LOCATION'}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-black/80 ml-0.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Luxury Status Bar */}
          <div className="bg-[#0D0B08] border-t border-[#D4AF37]/20 px-3 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between text-[11px] sm:text-xs text-gray-400 gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[#D4AF37] font-semibold">{language === 'mr' ? 'सक्रिय गंतव्य:' : 'Active Destination:'}</span>
              <span className="text-gray-300 font-mono text-[10px] sm:text-[11px] truncate">
                Uruli Kanchan, Pune, Maharashtra
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleOpenGoogleMaps}
                className="text-[#E6C665] hover:text-white flex items-center gap-1 transition-colors cursor-pointer underline decoration-[#D4AF37]/40 hover:decoration-[#D4AF37]"
              >
                <span>{language === 'mr' ? 'गुगल मॅप्सवर उघडा' : 'Open in Google Maps'}</span>
                <ExternalLink className="w-3 h-3 text-[#D4AF37]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
