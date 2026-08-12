

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../services/api';
import { Helmet } from 'react-helmet';
import {
  FaIndustry,
  FaClipboardList,
  FaTools,
  FaCheckCircle,
  FaStar,
  FaEnvelope,
  FaAward,
  FaGlobeAfrica,
  FaSearch,
  FaChevronUp,
  FaRedo,
  FaCalculator,
  FaFileDownload,
  FaTimes,
  FaTruck,
  FaShieldAlt,
  FaFlask,
  FaLayerGroup,
  FaTable,
  FaThLarge,
  FaCube,
  FaEye,
  FaExpand,
  FaSearchPlus,
  FaSearchMinus,
  FaSync,
  FaLightbulb,
  FaInfoCircle,
} from 'react-icons/fa';

// Safe icon renderer
const Icon = ({ icon: IconComponent, className, size }: { icon: any; className?: string; size?: number }) => (
  <IconComponent className={className} size={size} />
);

interface Product {
  id: number;
  name: string;
  slug?: string;
  description: string;
  image_url: string;
  category: string;
  grade?: string;
  standard?: string;
  technical_specs?: Record<string, any>;
  application?: string;
}

// Default high-performance Ethiopian cement formulations
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Mugher OPC 42.5N Cement',
    slug: 'opc-42-5n',
    category: 'Ordinary Portland',
    grade: 'CEM I 42.5N',
    standard: 'ES 1177-1 / EN 197-1',
    description:
      'High-performance Ordinary Portland Cement engineered for heavy-duty structural concrete, high-rise construction, pre-stressed elements, and major civil engineering projects.',
    image_url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop',
    application:
      'Multi-story commercial complexes, concrete highways, bridges, dams, pre-cast concrete structures, and structural foundations requiring rapid strength gain.',
    technical_specs: {
      compressive_strength_2d: '≥ 20.0 MPa',
      compressive_strength_28d: '≥ 42.5 MPa',
      initial_setting_time: '≥ 60 min',
      soundness: '≤ 10 mm',
      blaine_fineness: '3,450 cm²/g',
      clinker_content: '95% - 100%',
    },
  },
  {
    id: 2,
    name: 'Mugher PPC 32.5R Cement',
    slug: 'ppc-32-5r',
    category: 'Portland Pozzolana',
    grade: 'CEM II/B-P 32.5R',
    standard: 'ES 1177-1 / EN 197-1',
    description:
      'Eco-friendly blended cement enriched with calcined pozzolana, offering superior long-term strength development, enhanced resistance to sulfate attack, and reduced thermal cracking.',
    image_url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=800&auto=format&fit=crop',
    application:
      'General residential building, masonry plastering, brick laying, hydraulic structures, underground foundations, mass concrete work, and coastal developments.',
    technical_specs: {
      compressive_strength_2d: '≥ 10.0 MPa',
      compressive_strength_28d: '≥ 32.5 MPa',
      initial_setting_time: '≥ 75 min',
      soundness: '≤ 10 mm',
      pozzolana_content: '21% - 35%',
      blaine_fineness: '3,800 cm²/g',
    },
  },
  {
    id: 3,
    name: 'Mugher High Early Strength 52.5N',
    slug: 'cem-i-52-5n',
    category: 'Specialty Cement',
    grade: 'CEM I 52.5N',
    standard: 'ES 1177-1 / EN 197-1',
    description:
      'Ultra-high strength premium cement formulated for specialized industrial applications where rapid setting and exceptionally high early compressive strength are critical.',
    image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    application:
      'Pre-stressed post-tensioned concrete, rapid formwork stripping, airport runways, cold-weather concreting, and high-load industrial floors.',
    technical_specs: {
      compressive_strength_2d: '≥ 30.0 MPa',
      compressive_strength_28d: '≥ 52.5 MPa',
      initial_setting_time: '≥ 45 min',
      soundness: '≤ 10 mm',
      blaine_fineness: '4,200 cm²/g',
      clinker_content: '95% - 100%',
    },
  },
  {
    id: 4,
    name: 'Mugher Sulfate Resistant Cement',
    slug: 'cem-i-42-5n-sr3',
    category: 'Specialty Cement',
    grade: 'CEM I 42.5N-SR3',
    standard: 'EN 197-1 / ASTM C150',
    description:
      'Specialized chemical-resistant Portland cement specifically produced with low Tricalcium Aluminate (C3A ≤ 3%) to withstand aggressive soil and saline environments.',
    image_url: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=800&auto=format&fit=crop',
    application:
      'Wastewater treatment plants, marine docks, sub-soil foundations in high-sulfate soil zones, underground tunnels, and industrial effluent tanks.',
    technical_specs: {
      compressive_strength_2d: '≥ 18.0 MPa',
      compressive_strength_28d: '≥ 42.5 MPa',
      c3a_content: '≤ 3.0%',
      initial_setting_time: '≥ 90 min',
      soundness: '≤ 10 mm',
      sulfate_expansion: '< 0.04%',
    },
  },
];

const STATS = [
  { icon: FaIndustry, value: '500,000+ MT', label: 'Annual Capacity' },
  { icon: FaAward, value: '25+ Years', label: 'Industry Leadership' },
  { icon: FaGlobeAfrica, value: '500+', label: 'Distribution Hubs' },
  { icon: FaCheckCircle, value: 'ISO 9001:2015', label: 'Quality Certified' },
];

// Interactive 3D Hotspot Pins on the Cement Bag
const HOTSPOTS = [
  {
    id: 'seal',
    title: 'Ultrasonic Moisture Seal',
    desc: 'Prevents ambient humidity absorption & clumping during extended storage.',
    pos: { x: 0, y: 1.1, z: 0.46 },
  },
  {
    id: 'grade',
    title: 'Certified Grade Stamp',
    desc: 'Guaranteed 28-day minimum compressive strength (ES 1177-1 compliant).',
    pos: { x: 0, y: 0.2, z: 0.46 },
  },
  {
    id: 'ply',
    title: '5-Ply Kraft & Poly Shell',
    desc: 'High tear-resistant woven polypropylene liner for zero dust spillage.',
    pos: { x: 0.8, y: -0.6, z: 0.46 },
  },
];

// ---- DYNAMIC THREE.JS 3D CANVAS COMPONENT ----------------------------------
function Real3DProductViewer({ product, onExpand }: { product: Product; onExpand?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [threeReady, setThreeReady] = useState(false);
  const [autoSpin, setAutoSpin] = useState(true);
  const [renderMode, setRenderMode] = useState<'daylight' | 'spotlight' | 'wireframe'>('daylight');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const sceneRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const bagMeshRef = useRef<any>(null);
  const lightsGroupRef = useRef<any>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const previousMouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.15, y: 0.4 });
  const zoomLevelRef = useRef(5);

  // Load Three.js dynamically via script tag
  useEffect(() => {
    if ((window as any).THREE) {
      setThreeReady(true);
      return;
    }
    const scriptId = 'three-js-cdn-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.async = true;
      script.onload = () => setThreeReady(true);
      document.head.appendChild(script);
    } else {
      script.addEventListener('load', () => setThreeReady(true));
    }
  }, []);

  // Helper to generate a high-res custom cement bag texture on an HTML5 canvas
  const createTexture = useCallback(() => {
    const THREE = (window as any).THREE;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Background paper texture gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
    bgGrad.addColorStop(0, '#e5e7eb');
    bgGrad.addColorStop(0.5, '#d1d5db');
    bgGrad.addColorStop(1, '#9ca3af');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Green Header Band
    ctx.fillStyle = '#059669';
    ctx.fillRect(0, 0, 1024, 220);

    // Top Header text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 54px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('MUGHER CEMENT FACTORY', 512, 120);

    // Navy Accent Stripe
    ctx.fillStyle = '#0F2942';
    ctx.fillRect(0, 220, 1024, 40);

    // Main Product Title
    ctx.fillStyle = '#0F2942';
    ctx.font = 'black 76px sans-serif';
    ctx.fillText(product.name.toUpperCase(), 512, 420);

    // Grade Emblem Box
    ctx.fillStyle = '#059669';
    ctx.roundRect ? ctx.roundRect(262, 480, 500, 140, 20) : ctx.fillRect(262, 480, 500, 140);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'extrabold 64px sans-serif';
    ctx.fillText(product.grade || 'CEM I 42.5N', 512, 575);

    // Standard & Details
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText(product.standard || 'ES 1177-1 / EN 197-1', 512, 700);

    // 50 KG Weight stamp
    ctx.fillStyle = '#dc2626';
    ctx.font = 'extrabold 52px sans-serif';
    ctx.fillText('NET WEIGHT: 50 KG', 512, 820);

    // Bottom Barcode & ISO motif
    ctx.fillStyle = '#111827';
    for (let x = 312; x < 712; x += 12) {
      const w = (x % 5 === 0) ? 6 : 3;
      ctx.fillRect(x, 880, w, 80);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [product]);

  // Initialize Three.js Scene
  useEffect(() => {
    if (!threeReady || !containerRef.current) return;
    const THREE = (window as any).THREE;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.5, zoomLevelRef.current);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting Setup
    const lightsGroup = new THREE.Group();
    scene.add(lightsGroup);
    lightsGroupRef.current = lightsGroup;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    lightsGroup.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 8, 5);
    dirLight.castShadow = true;
    lightsGroup.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x4ade80, 1.5);
    rimLight.position.set(-5, 2, -5);
    lightsGroup.add(rimLight);

    // Reflective Studio Floor Grid
    const floorGeo = new THREE.PlaneGeometry(20, 20);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.4,
      metalness: 0.2,
      side: THREE.DoubleSide,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.6;
    floor.receiveShadow = true;
    scene.add(floor);

    // Build Rounded 3D Cement Bag Mesh
    const bagGeo = new THREE.BoxGeometry(2.2, 3.0, 0.9, 32, 32, 32);

    // Deform vertices slightly to create a realistic bulged bag appearance
    const pos = bagGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);

      // Radial bulging factor in middle section
      const bulge = Math.cos((y / 3.0) * Math.PI) * 0.15;
      if (Math.abs(z) > 0.1) {
        pos.setZ(i, z + Math.sign(z) * bulge);
      }
    }
    bagGeo.computeVertexNormals();

    const bagTexture = createTexture();
    const bagMat = new THREE.MeshStandardMaterial({
      map: bagTexture,
      roughness: 0.6,
      metalness: 0.1,
      wireframe: renderMode === 'wireframe',
    });

    const bagMesh = new THREE.Mesh(bagGeo, bagMat);
    bagMesh.position.y = 0.1;
    bagMesh.castShadow = true;
    scene.add(bagMesh);
    bagMeshRef.current = bagMesh;

    // Render loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (bagMeshRef.current) {
        if (autoSpin && !isDraggingRef.current) {
          targetRotationRef.current.y += 0.008;
        }

        // Smooth rotation interpolation (Damping)
        bagMeshRef.current.rotation.y += (targetRotationRef.current.y - bagMeshRef.current.rotation.y) * 0.1;
        bagMeshRef.current.rotation.x += (targetRotationRef.current.x - bagMeshRef.current.rotation.x) * 0.1;

        // Subtle idle floating bobbing motion
        bagMeshRef.current.position.y = 0.1 + Math.sin(Date.now() * 0.002) * 0.08;
      }

      if (cameraRef.current) {
        cameraRef.current.position.z += (zoomLevelRef.current - cameraRef.current.position.z) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.remove();
      }
    };
  }, [threeReady, createTexture]);

  // Update wireframe / render mode dynamically
  useEffect(() => {
    if (!bagMeshRef.current) return;
    bagMeshRef.current.material.wireframe = renderMode === 'wireframe';
  }, [renderMode]);

  // Mouse & Touch Drag Handlers
  const handlePointerDown = (e: ReactMouseEvent | ReactTouchEvent) => {
    isDraggingRef.current = true;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as ReactMouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as ReactMouseEvent).clientY;
    previousMouseRef.current = { x: clientX, y: clientY };
  };

  const handlePointerMove = (e: ReactMouseEvent | ReactTouchEvent) => {
    if (!isDraggingRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as ReactMouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as ReactMouseEvent).clientY;

    const deltaX = clientX - previousMouseRef.current.x;
    const deltaY = clientY - previousMouseRef.current.y;

    targetRotationRef.current.y += deltaX * 0.01;
    targetRotationRef.current.x += deltaY * 0.008;

    // Clamp X rotation angle so bag doesn't flip upside down
    targetRotationRef.current.x = Math.max(-0.6, Math.min(0.6, targetRotationRef.current.x));

    previousMouseRef.current = { x: clientX, y: clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleZoom = (delta: number) => {
    zoomLevelRef.current = Math.max(3.2, Math.min(7.5, zoomLevelRef.current + delta));
  };

  const resetView = () => {
    targetRotationRef.current = { x: 0.15, y: 0.4 };
    zoomLevelRef.current = 5;
  };

  return (
    <div className="relative w-full h-[360px] md:h-[440px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group select-none">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Fallback indicator while Three.js initializes */}
      {!threeReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-white space-y-3">
          <Icon icon={FaCube} className="animate-spin text-[#4ADE80]" size={36} />
          <span className="text-xs font-mono text-gray-400">Loading Interactive 3D Engine...</span>
        </div>
      )}

      {/* 3D Hotspot Overlay Badges */}
      {threeReady && (
        <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white text-xs font-mono">
              <Icon icon={FaCube} className="text-[#4ADE80]" />
              <span>360° Real-time 3D Stage</span>
            </div>

            {onExpand && (
              <button
                onClick={onExpand}
                className="p-2 rounded-xl bg-black/60 backdrop-blur-md text-white border border-white/10 hover:bg-white/20 transition-all"
                title="Fullscreen 3D Studio"
              >
                <Icon icon={FaExpand} size={14} />
              </button>
            )}
          </div>

          {/* Hotspot Floating Pin Callout */}
          {HOTSPOTS.map((spot) => (
            <div key={spot.id} className="absolute left-6 bottom-16 pointer-events-auto z-10">
              <button
                onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-lg border ${
                  activeHotspot === spot.id
                    ? 'bg-[#4ADE80] text-gray-950 border-[#4ADE80]'
                    : 'bg-black/70 text-white border-white/20 hover:bg-black'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <Icon icon={FaInfoCircle} />
                <span>{spot.title}</span>
              </button>

              {activeHotspot === spot.id && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 p-3 bg-slate-900/95 border border-emerald-500/40 rounded-xl text-xs text-gray-200 max-w-xs backdrop-blur-md shadow-2xl"
                >
                  <p className="font-semibold text-emerald-400 mb-1">{spot.title}</p>
                  <p className="text-[11px] leading-relaxed text-gray-300">{spot.desc}</p>
                </motion.div>
              )}
            </div>
          ))}

          {/* Interactive Control Toolbar */}
          <div className="pointer-events-auto flex items-center justify-between bg-black/70 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAutoSpin(!autoSpin)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  autoSpin ? 'bg-[#4ADE80] text-gray-950' : 'bg-white/10 text-gray-300'
                }`}
                title="Toggle Auto 360 Spin"
              >
                <Icon icon={FaSync} className={autoSpin ? 'animate-spin' : ''} size={11} />
                <span>Auto-Spin</span>
              </button>

              <button
                onClick={() =>
                  setRenderMode(renderMode === 'daylight' ? 'wireframe' : 'daylight')
                }
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  renderMode === 'wireframe' ? 'bg-amber-400 text-gray-950' : 'bg-white/10 text-gray-300'
                }`}
                title="Toggle Render Mode"
              >
                <Icon icon={FaLightbulb} size={11} />
                <span>{renderMode === 'wireframe' ? 'Mesh Mode' : 'Studio Mode'}</span>
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => handleZoom(-0.5)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                title="Zoom In"
              >
                <Icon icon={FaSearchPlus} size={12} />
              </button>
              <button
                onClick={() => handleZoom(0.5)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                title="Zoom Out"
              >
                <Icon icon={FaSearchMinus} size={12} />
              </button>
              <button
                onClick={resetView}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                title="Reset Camera Angle"
              >
                <Icon icon={FaRedo} size={12} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---- Product Card Component with Integrated 3D Visualizer ------------------
function ProductCard({
  product,
  index,
  onOpenSpecs,
  onOpenQuote,
  onOpenFullscreen3D,
}: {
  product: Product;
  index: number;
  onOpenSpecs: (product: Product) => void;
  onOpenQuote: (product: Product) => void;
  onOpenFullscreen3D: (product: Product) => void;
}) {
  const specEntries = product.technical_specs ? Object.entries(product.technical_specs) : [];
  const reversed = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl dark:shadow-gray-950/50 hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200/80 dark:border-gray-700"
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8 relative ${
          reversed ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
      >
        {/* 3D WebGL Showcase Canvas Stage */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-slate-900 rounded-2xl p-3 border border-slate-800">
          <Real3DProductViewer
            product={product}
            onExpand={() => onOpenFullscreen3D(product)}
          />

          <div className="pt-3 px-2 flex items-center justify-between text-xs text-gray-400 font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Icon icon={FaShieldAlt} /> {product.standard || 'ISO 9001 Certified'}
            </span>
            <span>Drag mouse to orbit 360°</span>
          </div>
        </div>

        {/* Product Details Panel */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1A3C91]/10 dark:bg-[#4A7DB4]/20 text-[#1A3C91] dark:text-[#4A7DB4] text-xs font-bold rounded-full">
                <Icon icon={FaLayerGroup} className="text-xs" />
                {product.category}
              </span>
              {product.grade && (
                <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-md border border-emerald-500/20 font-mono">
                  {product.grade}
                </span>
              )}
            </div>

            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-[#1A3C91] dark:text-white mb-2">
              {product.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 font-body text-xs md:text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Applications */}
          {product.application && (
            <div>
              <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-[#1A3C91] dark:text-gray-200 flex items-center gap-2 mb-2">
                <Icon icon={FaClipboardList} className="text-[#2EAD32] dark:text-[#4ADE80]" />
                Recommended Applications
              </h3>
              <div className="bg-slate-50 dark:bg-gray-900/40 rounded-xl border border-slate-200 dark:border-gray-700/80 p-3 text-xs text-gray-700 dark:text-gray-300">
                {product.application}
              </div>
            </div>
          )}

          {/* Spec Summary */}
          {specEntries.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {specEntries.slice(0, 3).map(([key, val]) => (
                <div key={key} className="bg-slate-100 dark:bg-gray-700/60 p-2.5 rounded-xl border border-slate-200 dark:border-gray-600">
                  <span className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 capitalize">
                    {key.replace(/_/g, ' ')}
                  </span>
                  <span className="text-xs font-bold text-gray-900 dark:text-white font-mono">
                    {String(val)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Toolbar Actions */}
          <div className="pt-3 border-t border-slate-200 dark:border-gray-700 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenQuote(product)}
              className="inline-flex items-center justify-center gap-2 bg-[#2EAD32] hover:bg-[#259329] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all"
            >
              <Icon icon={FaEnvelope} />
              Request Bulk Quote
            </button>

            <button
              onClick={() => onOpenSpecs(product)}
              className="inline-flex items-center justify-center gap-2 bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 text-gray-800 dark:text-gray-100 px-4 py-2.5 rounded-xl font-semibold text-xs border border-slate-300 dark:border-gray-600 transition-all"
            >
              <Icon icon={FaFlask} />
              Full Datasheet
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ---- Concrete Estimator Widget ---------------------------------------------
function CementCalculator() {
  const [volume, setVolume] = useState<number>(15);
  const [mixType, setMixType] = useState<'structural' | 'residential' | 'plaster'>('structural');

  const estimate = useMemo(() => {
    const factor = mixType === 'structural' ? 7.8 : mixType === 'residential' ? 6.4 : 5.0;
    const bags = Math.ceil(volume * factor);
    const tons = (bags * 50) / 1000;
    return { bags, tons };
  }, [volume, mixType]);

  return (
    <div className="bg-gradient-to-r from-[#0F2942] via-[#1A3C91] to-[#0F4229] rounded-3xl text-white p-6 md:p-8 shadow-2xl mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-[#4ADE80]">
            <Icon icon={FaCalculator} />
            Construction Batch Estimator
          </div>
          <h3 className="text-2xl font-heading font-extrabold">Concrete & Cement Calculator</h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Estimate required 50kg bag quantities and bulk metric tons based on structural cubic volume.
          </p>
        </div>

        <div className="lg:col-span-7 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-200 mb-1">
                Volume (m³)
              </label>
              <input
                type="number"
                min="1"
                value={volume}
                onChange={(e) => setVolume(Math.max(1, Number(e.target.value)))}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white font-mono font-bold focus:ring-2 focus:ring-[#4ADE80] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-200 mb-1">
                Mix Specification
              </label>
              <select
                value={mixType}
                onChange={(e) => setMixType(e.target.value as any)}
                className="w-full bg-slate-900 border border-white/20 rounded-xl px-3 py-2 text-white text-xs font-semibold outline-none"
              >
                <option value="structural">C25/C30 Structural (OPC 42.5N)</option>
                <option value="residential">C15/C20 Residential (PPC 32.5R)</option>
                <option value="plaster">Masonry & Mortar Plaster</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/10 text-center">
            <div className="bg-black/30 rounded-xl p-2.5">
              <span className="block text-[11px] text-gray-300">50kg Bags</span>
              <span className="text-2xl font-extrabold text-[#4ADE80] font-mono">{estimate.bags}</span>
            </div>
            <div className="bg-black/30 rounded-xl p-2.5">
              <span className="block text-[11px] text-gray-300">Tonnage</span>
              <span className="text-2xl font-extrabold text-white font-mono">{estimate.tons.toFixed(1)} MT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Main Page Component ---------------------------------------------------
export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'matrix'>('cards');

  // Active Modals
  const [activeSpecProduct, setActiveSpecProduct] = useState<Product | null>(null);
  const [activeQuoteProduct, setActiveQuoteProduct] = useState<Product | null>(null);
  const [fullscreen3DProduct, setFullscreen3DProduct] = useState<Product | null>(null);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    API.get('/products')
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setProducts(res.data);
        } else {
          setProducts(INITIAL_PRODUCTS);
        }
      })
      .catch(() => setProducts(INITIAL_PRODUCTS))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
    return ['All', ...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(search.trim().toLowerCase()) ||
        p.description.toLowerCase().includes(search.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, search]);

  return (
    <div className="bg-slate-50 dark:bg-gray-900 min-h-screen font-body transition-colors duration-300">
      <Helmet>
        <title>3D Interactive Products Showcase | Mugher Cement</title>
        <meta
          name="description"
          content="Interactive 3D product showcase for Mugher Cement's OPC, PPC, and specialized industrial cement formulations."
        />
      </Helmet>

      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-[#0F2942] via-[#1A3C91] to-[#0F4229] pt-20 md:pt-28 pb-28 md:pb-36 overflow-hidden">
        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <div className="inline-flex items-center gap-2 border border-white/30 bg-white/10 px-4 py-1.5 rounded-full mb-4">
            <Icon icon={FaCube} className="text-[#4ADE80] text-xs" />
            <span className="text-xs font-bold uppercase tracking-[0.25em]">Interactive 3D Catalog</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tight max-w-4xl mx-auto">
            Industrial Cement 3D Showcase
          </h1>

          <p className="text-base md:text-xl text-gray-200 max-w-2xl mx-auto mt-4 leading-relaxed">
            Inspect our cement products in interactive 360° 3D stages. Certified to ES 1177-1 and EN 197-1 standards.
          </p>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="container mx-auto px-6 relative z-20 -mt-14 mb-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-slate-200 dark:border-gray-700 grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100 dark:divide-gray-700">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center text-center gap-1 py-5 px-3">
              <Icon icon={stat.icon} className="text-[#2EAD32] dark:text-[#4ADE80]" size={22} />
              <span className="text-xl font-heading font-bold text-[#1A3C91] dark:text-white font-mono">
                {stat.value}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-24">
        {/* Estimator Tool */}
        <CementCalculator />

        {/* Filter Controls Bar */}
        <div className="sticky top-4 z-30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-gray-700 p-4 mb-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#1A3C91] text-white shadow-md'
                      : 'bg-slate-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-grow lg:w-64">
                <Icon icon={FaSearch} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search 3D catalog..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 outline-none"
                />
              </div>

              <div className="flex items-center bg-slate-100 dark:bg-gray-700 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`p-2 rounded-lg text-xs ${
                    viewMode === 'cards' ? 'bg-white dark:bg-gray-800 text-[#1A3C91] dark:text-[#4ADE80] shadow' : 'text-gray-500'
                  }`}
                >
                  <Icon icon={FaThLarge} size={14} />
                </button>
                <button
                  onClick={() => setViewMode('matrix')}
                  className={`p-2 rounded-lg text-xs ${
                    viewMode === 'matrix' ? 'bg-white dark:bg-gray-800 text-[#1A3C91] dark:text-[#4ADE80] shadow' : 'text-gray-500'
                  }`}
                >
                  <Icon icon={FaTable} size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards View */}
        {!loading && viewMode === 'cards' && (
          <div className="space-y-10">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onOpenSpecs={(p) => setActiveSpecProduct(p)}
                onOpenQuote={(p) => setActiveQuoteProduct(p)}
                onOpenFullscreen3D={(p) => setFullscreen3DProduct(p)}
              />
            ))}
          </div>
        )}

        {/* Matrix View */}
        {!loading && viewMode === 'matrix' && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-slate-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 bg-slate-50 dark:bg-gray-900/50 border-b border-slate-200 dark:border-gray-700">
              <h3 className="text-xl font-heading font-extrabold text-[#1A3C91] dark:text-white">
                Technical Matrix View
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold uppercase">
                  <tr>
                    <th className="p-4">Product Name</th>
                    <th className="p-4">Grade</th>
                    <th className="p-4">28-Day Strength</th>
                    <th className="p-4">Initial Setting</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-gray-700">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-gray-700/40">
                      <td className="p-4 font-bold text-[#1A3C91] dark:text-white">{p.name}</td>
                      <td className="p-4 font-mono font-semibold text-emerald-600 dark:text-emerald-400">{p.grade}</td>
                      <td className="p-4 font-mono">{p.technical_specs?.compressive_strength_28d || '≥ 32.5 MPa'}</td>
                      <td className="p-4 font-mono">{p.technical_specs?.initial_setting_time || '≥ 60 min'}</td>
                      <td className="p-4">
                        <button
                          onClick={() => setActiveQuoteProduct(p)}
                          className="px-3 py-1.5 bg-[#2EAD32] text-white rounded-lg font-bold"
                        >
                          Quote
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen 3D Stage Modal */}
      <AnimatePresence>
        {fullscreen3DProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-950 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 relative text-white"
            >
              <button
                onClick={() => setFullscreen3DProduct(null)}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 z-10"
              >
                <Icon icon={FaTimes} size={18} />
              </button>

              <div className="mb-4">
                <span className="text-xs font-mono text-[#4ADE80] uppercase tracking-widest">
                  360° Studio Inspection
                </span>
                <h3 className="text-2xl font-bold font-heading">{fullscreen3DProduct.name}</h3>
              </div>

              <Real3DProductViewer product={fullscreen3DProduct} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Datasheet Modal */}
      <AnimatePresence>
        {activeSpecProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl max-w-xl w-full p-6 md:p-8 relative border border-slate-200 dark:border-gray-700"
            >
              <button
                onClick={() => setActiveSpecProduct(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-gray-700 text-gray-500"
              >
                <Icon icon={FaTimes} />
              </button>

              <h2 className="text-2xl font-heading font-extrabold text-[#1A3C91] dark:text-white mb-4">
                {activeSpecProduct.name} Datasheet
              </h2>

              <div className="bg-slate-50 dark:bg-gray-900 rounded-xl p-4 text-xs font-mono space-y-2 mb-6">
                {activeSpecProduct.technical_specs &&
                  Object.entries(activeSpecProduct.technical_specs).map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-slate-200 dark:border-gray-700 pb-1">
                      <span className="text-gray-500 capitalize">{k.replace(/_/g, ' ')}</span>
                      <span className="font-bold text-gray-900 dark:text-gray-100">{String(v)}</span>
                    </div>
                  ))}
              </div>

              <button
                onClick={() => alert('Downloading PDF Spec Sheet for ' + activeSpecProduct.name)}
                className="w-full py-3 bg-[#1A3C91] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2"
              >
                <Icon icon={FaFileDownload} /> Download Official PDF Datasheet
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quote Modal */}
      <AnimatePresence>
        {activeQuoteProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl max-w-lg w-full p-6 md:p-8 relative border border-slate-200 dark:border-gray-700"
            >
              <button
                onClick={() => setActiveQuoteProduct(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-gray-700 text-gray-500"
              >
                <Icon icon={FaTimes} />
              </button>

              <h2 className="text-xl font-heading font-extrabold text-[#1A3C91] dark:text-white mb-2">
                Request Bulk Quote: {activeQuoteProduct.name}
              </h2>
              <p className="text-xs text-gray-500 mb-4">Direct factory price quote generation.</p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Quote Request submitted successfully!');
                  setActiveQuoteProduct(null);
                }}
                className="space-y-3 text-xs"
              >
                <input
                  required
                  type="text"
                  placeholder="Your Name / Organization"
                  className="w-full bg-slate-100 dark:bg-gray-700 p-2.5 rounded-xl border border-slate-200 dark:border-gray-600"
                />
                <input
                  required
                  type="tel"
                  placeholder="Phone Number (+251...)"
                  className="w-full bg-slate-100 dark:bg-gray-700 p-2.5 rounded-xl border border-slate-200 dark:border-gray-600"
                />
                <input
                  type="number"
                  placeholder="Estimated Quantity (50kg Bags or MT)"
                  className="w-full bg-slate-100 dark:bg-gray-700 p-2.5 rounded-xl border border-slate-200 dark:border-gray-600 font-mono"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-[#2EAD32] text-white font-bold rounded-xl hover:bg-[#259329] transition-all text-xs"
                >
                  Submit Quote Request
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Top Scroll Button */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 bg-[#2EAD32] text-white p-3.5 rounded-full shadow-2xl"
          >
            <Icon icon={FaChevronUp} size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
