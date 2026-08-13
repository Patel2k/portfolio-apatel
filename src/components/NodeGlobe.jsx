import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Interactive node-network globe (AI / agent graph).
 * Fibonacci sphere of glowing nodes, additive edges, travelling data packets,
 * pointer-parallax rotation. Materials react to the active theme.
 */
export default function NodeGlobe() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const VIOLET = new THREE.Color('#a06bff');
    const MAGENTA = new THREE.Color('#ff5ad6');

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 7.4;

    const group = new THREE.Group();
    scene.add(group);

    // nodes on a fibonacci sphere
    const N = 150;
    const R = 2.65;
    const nodes = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      nodes.push(new THREE.Vector3(Math.cos(t) * r * R, y * R, Math.sin(t) * r * R));
    }

    // soft glow sprite
    const dotCanvas = document.createElement('canvas');
    dotCanvas.width = dotCanvas.height = 64;
    const g = dotCanvas.getContext('2d');
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, 'rgba(255,255,255,1)');
    grd.addColorStop(0.25, 'rgba(220,190,255,0.9)');
    grd.addColorStop(0.6, 'rgba(160,107,255,0.35)');
    grd.addColorStop(1, 'rgba(160,107,255,0)');
    g.fillStyle = grd;
    g.beginPath();
    g.arc(32, 32, 32, 0, Math.PI * 2);
    g.fill();
    const dotTex = new THREE.CanvasTexture(dotCanvas);

    // points
    const posArr = new Float32Array(N * 3);
    const colArr = new Float32Array(N * 3);
    const sizeArr = new Float32Array(N);
    nodes.forEach((v, i) => {
      posArr[i * 3] = v.x; posArr[i * 3 + 1] = v.y; posArr[i * 3 + 2] = v.z;
      const col = VIOLET.clone().lerp(MAGENTA, Math.random() * 0.65);
      colArr[i * 3] = col.r; colArr[i * 3 + 1] = col.g; colArr[i * 3 + 2] = col.b;
      sizeArr[i] = 2 + Math.random() * 2.8;
    });
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    ptGeo.setAttribute('color', new THREE.BufferAttribute(colArr, 3));
    ptGeo.setAttribute('aSize', new THREE.BufferAttribute(sizeArr, 1));
    const ptMat = new THREE.ShaderMaterial({
      uniforms: { uTex: { value: dotTex }, uScale: { value: 1 }, uLight: { value: 0 } },
      vertexShader: `
        attribute float aSize; attribute vec3 color; varying vec3 vColor;
        uniform float uScale;
        void main(){
          vColor = color;
          vec4 mv = modelViewMatrix * vec4(position,1.0);
          gl_PointSize = aSize * uScale * (34.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        uniform sampler2D uTex; uniform float uLight; varying vec3 vColor;
        void main(){
          vec4 t = texture2D(uTex, gl_PointCoord);
          vec3 c = mix(vColor, vColor * 0.45, uLight);
          gl_FragColor = uLight > 0.5 ? vec4(c, t.a) : vec4(c, 1.0) * t;
        }`,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    group.add(new THREE.Points(ptGeo, ptMat));

    // edges to nearest neighbours
    const edges = [];
    const seen = new Set();
    const MAX_DIST = 1.5;
    for (let i = 0; i < N; i++) {
      const dists = [];
      for (let j = 0; j < N; j++) {
        if (i === j) continue;
        const d = nodes[i].distanceTo(nodes[j]);
        if (d < MAX_DIST) dists.push([d, j]);
      }
      dists.sort((a, b) => a[0] - b[0]);
      dists.slice(0, 3).forEach(([, j]) => {
        const key = i < j ? `${i}_${j}` : `${j}_${i}`;
        if (!seen.has(key)) { seen.add(key); edges.push([i, j]); }
      });
    }
    const linePos = new Float32Array(edges.length * 6);
    const lineCol = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], k) => {
      const va = nodes[a], vb = nodes[b];
      linePos.set([va.x, va.y, va.z, vb.x, vb.y, vb.z], k * 6);
      const c = VIOLET.clone().lerp(MAGENTA, 0.3);
      lineCol.set([c.r, c.g, c.b, c.r, c.g, c.b], k * 6);
    });
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineCol, 3));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.16,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    group.add(new THREE.LineSegments(lineGeo, lineMat));

    // travelling packets
    const PK = 22;
    const pkGeo = new THREE.BufferGeometry();
    const pkPos = new Float32Array(PK * 3);
    pkGeo.setAttribute('position', new THREE.BufferAttribute(pkPos, 3));
    const pkMat = new THREE.PointsMaterial({
      size: 0.09, map: dotTex, transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, color: 0xffffff,
    });
    group.add(new THREE.Points(pkGeo, pkMat));
    const packets = Array.from({ length: PK }, () => ({
      e: (Math.random() * edges.length) | 0,
      t: Math.random(),
      spd: 0.15 + Math.random() * 0.35,
    }));

    // core
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x100820, transparent: true, opacity: 0.38 })
    );
    group.add(core);

    // Additive blending glows on dark but washes out on white, so the light
    // theme switches to normal blending with darker colors.
    const applyTheme = () => {
      const light = document.documentElement.dataset.theme === 'light';
      ptMat.uniforms.uLight.value = light ? 1 : 0;
      ptMat.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
      ptMat.needsUpdate = true;
      lineMat.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
      lineMat.opacity = light ? 0.34 : 0.16;
      lineMat.color.set(light ? '#5b3bbf' : '#ffffff');
      pkMat.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
      pkMat.color.set(light ? '#4b2ba8' : '#ffffff');
      core.visible = !light; // the dark core reads as a grey blob on light
    };
    applyTheme();
    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // interaction
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('pointermove', onMove);

    const resize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      ptMat.uniforms.uScale.value = Math.min(w / 1200, 1.1);
    };
    window.addEventListener('resize', resize);

    const va = new THREE.Vector3(), vb = new THREE.Vector3(), vp = new THREE.Vector3();
    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      cx += (tx - cx) * 0.04; cy += (ty - cy) * 0.04;
      group.rotation.y += dt * 0.12 + cx * dt * 1.6;
      group.rotation.x = cy * 0.5;
      for (let i = 0; i < PK; i++) {
        const p = packets[i];
        p.t += dt * p.spd;
        if (p.t >= 1) {
          p.t = 0;
          p.e = (Math.random() * edges.length) | 0;
          p.spd = 0.15 + Math.random() * 0.35;
        }
        const [a, b] = edges[p.e];
        va.copy(nodes[a]); vb.copy(nodes[b]);
        vp.lerpVectors(va, vb, p.t);
        pkPos[i * 3] = vp.x; pkPos[i * 3 + 1] = vp.y; pkPos[i * 3 + 2] = vp.z;
      }
      pkGeo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    resize();
    animate();

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else { clock.getDelta(); animate(); }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
      renderer.dispose();
      ptGeo.dispose(); lineGeo.dispose(); pkGeo.dispose(); dotTex.dispose();
    };
  }, []);

  return <canvas id="globe-canvas" ref={canvasRef} aria-hidden="true" />;
}
