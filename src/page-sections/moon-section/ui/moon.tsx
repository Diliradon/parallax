'use client';

import { useEffect, useRef } from 'react';

import * as THREE from 'three';

export const Moon = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) {
      return;
    }

    const FOV = 75;

    const NEAR = 0.1;

    const FAR = 1000;

    const CAMERA_Z = 5;

    const INITIAL_SIZE = 400;

    const MOON_RADIUS = 2;

    const SEGMENTS = 64;

    const BUMP_SCALE = 0.05;

    const AMBIENT_COLOR = 0x404040;

    const AMBIENT_INTENSITY = 0.5;

    const LIGHT_COLOR = 0xffffff;

    const LIGHT_INTENSITY = 2;

    const LIGHT_POS_X = 5;

    const LIGHT_POS_Y = 3;

    const LIGHT_POS_Z = 5;

    const ROTATION_SPEED = 0.001;

    const scene = new THREE.Scene();

    scene.background = null;

    const camera = new THREE.PerspectiveCamera(FOV, 1, NEAR, FAR);

    camera.position.z = CAMERA_Z;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(INITIAL_SIZE, INITIAL_SIZE);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(MOON_RADIUS, SEGMENTS, SEGMENTS);
    const texture = new THREE.TextureLoader().load(
      '/textures/moon/moon-diffuse.jpg',
    );
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      bumpMap: texture,
      bumpScale: BUMP_SCALE,
    });
    const moon = new THREE.Mesh(geometry, material);

    scene.add(moon);

    const ambientLight = new THREE.AmbientLight(
      AMBIENT_COLOR,
      AMBIENT_INTENSITY,
    );

    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(
      LIGHT_COLOR,
      LIGHT_INTENSITY,
    );

    directionalLight.position.set(LIGHT_POS_X, LIGHT_POS_Y, LIGHT_POS_Z);
    scene.add(directionalLight);

    const animate = () => {
      requestAnimationFrame(animate);
      moon.rotation.y += ROTATION_SPEED;
      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!mountRef.current) {
        return;
      }
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    onResize();
    window.addEventListener('resize', onResize);

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div ref={mountRef} className="h-96 w-full md:h-[500px] md:w-[500px]" />
  );
};
