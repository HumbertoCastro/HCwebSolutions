'use client';

import * as React from 'react';
import { useEffect, useRef } from 'react';
import type * as Three from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'> & {
  dotColor?: string;
  backgroundColor?: string;
  dotOpacity?: number;
  dotSize?: number;
  separation?: number;
  amountX?: number;
  amountY?: number;
  waveHeight?: number;
  speed?: number;
};

export function DottedSurface({
  className,
  children,
  dotColor = '#00E528',
  backgroundColor = 'transparent',
  dotOpacity = 0.58,
  dotSize = 5.8,
  separation = 140,
  amountX = 38,
  amountY = 42,
  waveHeight = 48,
  speed = 0.055,
  style,
  ...props
}: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const sceneRef = useRef<{
    scene: Three.Scene;
    camera: Three.PerspectiveCamera;
    renderer: Three.WebGLRenderer;
    geometry: Three.BufferGeometry;
    material: Three.PointsMaterial;
    animationId: number | null;
    resizeObserver: ResizeObserver | null;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '320px' },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    let cleanup: (() => void) | null = null;
    let cancelled = false;

    if (!container || !isVisible) {
      return undefined;
    }

    void import('three').then((THREE) => {
      if (cancelled) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(58, 1, 1, 10000);
      const testCanvas = document.createElement('canvas');
      const webgl =
        testCanvas.getContext('webgl2') ||
        testCanvas.getContext('webgl') ||
        testCanvas.getContext('experimental-webgl');

      if (!webgl) return;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
      const geometry = new THREE.BufferGeometry();
      const positions: number[] = [];

      scene.fog = new THREE.Fog(0x050505, 1600, 7200);
      camera.position.set(0, 360, 1240);

      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      container.appendChild(renderer.domElement);

      for (let ix = 0; ix < amountX; ix += 1) {
        for (let iy = 0; iy < amountY; iy += 1) {
          const x = ix * separation - (amountX * separation) / 2;
          const y = 0;
          const z = iy * separation - (amountY * separation) / 2;

          positions.push(x, y, z);
        }
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: new THREE.Color(dotColor),
        opacity: dotOpacity,
        size: dotSize,
        sizeAttenuation: true,
        transparent: true,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);
      points.rotation.x = -0.08;
      points.rotation.z = 0.015;
      scene.add(points);

      let count = 0;
      let animationId: number | null = null;

      const resize = () => {
        const { width, height } = container.getBoundingClientRect();
        const nextWidth = Math.max(1, Math.floor(width));
        const nextHeight = Math.max(1, Math.floor(height));

        camera.aspect = nextWidth / nextHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(nextWidth, nextHeight, false);
      };

      const render = () => {
        const positionAttribute = geometry.getAttribute('position') as Three.BufferAttribute;
        const positionArray = positionAttribute.array as Float32Array;
        let pointIndex = 0;

        for (let ix = 0; ix < amountX; ix += 1) {
          for (let iy = 0; iy < amountY; iy += 1) {
            const index = pointIndex * 3;
            positionArray[index + 1] =
              Math.sin((ix + count) * 0.32) * waveHeight +
              Math.sin((iy + count) * 0.44) * waveHeight;
            pointIndex += 1;
          }
        }

        positionAttribute.needsUpdate = true;
        renderer.render(scene, camera);
        count += speed;
      };

      const animate = () => {
        render();
        animationId = requestAnimationFrame(animate);
      };

      const resizeObserver = new ResizeObserver(() => {
        resize();
        render();
      });

      resizeObserver.observe(container);
      resize();

      if (prefersReducedMotion) {
        render();
      } else {
        animate();
      }

      sceneRef.current = {
        scene,
        camera,
        renderer,
        geometry,
        material,
        animationId,
        resizeObserver,
      };

      cleanup = () => {
        if (animationId) cancelAnimationFrame(animationId);
        resizeObserver.disconnect();
        scene.remove(points);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
        sceneRef.current = null;
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [amountX, amountY, dotColor, dotOpacity, dotSize, isVisible, separation, speed, waveHeight]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        backgroundColor,
        backgroundImage: `radial-gradient(circle at center, ${dotColor} 1px, transparent 1.8px)`,
        backgroundSize: `${Math.max(18, Math.round(separation / 6))}px ${Math.max(
          18,
          Math.round(separation / 6),
        )}px`,
        backgroundPosition: 'center',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
