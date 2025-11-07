'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [arrowPaths, setArrowPaths] = useState({ toCul1: '', toCul2: '', toNat1: '', toNat2: '' });
  
  const personRef = useRef(null);
  const culRef = useRef(null);
  const natRef = useRef(null);

  // Mount flag to prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  // Rotating icons animation
  useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [mounted]);

  // Calculate arrow paths based on element positions
  useEffect(() => {
    if (!mounted) return;
    
    const calculateArrowPaths = () => {
      if (!personRef.current || !culRef.current || !natRef.current) return;

      const personRect = personRef.current.getBoundingClientRect();
      const culRect = culRef.current.getBoundingClientRect();
      const natRect = natRef.current.getBoundingClientRect();

      // SVG座標系はビューポート基準なので、getBoundingClientRect()の座標をそのまま使用
      const personCenter = {
        x: personRect.left + personRect.width / 2,
        y: personRect.top + personRect.height / 2,
      };
      const culCenter = {
        x: culRect.left + culRect.width / 2,
        y: culRect.top + culRect.height / 2,
      };
      const natCenter = {
        x: natRect.left + natRect.width / 2,
        y: natRect.top + natRect.height / 2,
      };

      // 大きな円（オービット円）とテキストの間に、平行な2本の矢印を作成
      // 画面サイズに応じて矢印の長さを調整
      let arrowLength;
      if (window.innerWidth >= 1360) {
        arrowLength = 200; // 大画面
      } else if (window.innerWidth >= 1200) {
        arrowLength = 150; // 中画面
      } else {
        arrowLength = 100; // 小画面
      }
      
      const arrowSpacing = 10; // 2本の矢印の間隔（ピクセル）
      const orbitRadius = 150; // オービット円の半径（w-[300px] h-[300px] = 300 / 2 = 150）
      
      // cul への方向ベクトルを計算
      const toCulDx = culCenter.x - personCenter.x;
      const toCulDy = culCenter.y - personCenter.y;
      const toCulDistance = Math.sqrt(toCulDx * toCulDx + toCulDy * toCulDy);
      const toCulUnitX = toCulDx / toCulDistance;
      const toCulUnitY = toCulDy / toCulDistance;
      
      // cul への方向に垂直なベクトル（2本の矢印を並行に配置するため）
      const toCulPerpX = -toCulUnitY;
      const toCulPerpY = toCulUnitX;
      
      // オービット円の外枠の点を計算
      const toCulOrbitEdge = {
        x: personCenter.x + toCulUnitX * orbitRadius,
        y: personCenter.y + toCulUnitY * orbitRadius
      };
      
      // 外枠の点と cul の中心の中間点を計算（矢印の中心になる）
      const toCulMidPoint = {
        x: (toCulOrbitEdge.x + culCenter.x) / 2,
        y: (toCulOrbitEdge.y + culCenter.y) / 2
      };
      
      // 矢印の開始点と終点を計算（中間点を基準に）
      const halfArrowLength = arrowLength / 2;
      
      const toCulStartBase = {
        x: toCulMidPoint.x - toCulUnitX * halfArrowLength,
        y: toCulMidPoint.y - toCulUnitY * halfArrowLength
      };
      
      const toCulEndBase = {
        x: toCulMidPoint.x + toCulUnitX * halfArrowLength,
        y: toCulMidPoint.y + toCulUnitY * halfArrowLength
      };
      
      // 2本の矢印の開始点と終点を計算
      const toCulStart1X = toCulStartBase.x + toCulPerpX * arrowSpacing;
      const toCulStart1Y = toCulStartBase.y + toCulPerpY * arrowSpacing;
      const toCulEnd1X = toCulEndBase.x + toCulPerpX * arrowSpacing;
      const toCulEnd1Y = toCulEndBase.y + toCulPerpY * arrowSpacing;
      
      const toCulStart2X = toCulStartBase.x - toCulPerpX * arrowSpacing;
      const toCulStart2Y = toCulStartBase.y - toCulPerpY * arrowSpacing;
      const toCulEnd2X = toCulEndBase.x - toCulPerpX * arrowSpacing;
      const toCulEnd2Y = toCulEndBase.y - toCulPerpY * arrowSpacing;
      
      // nat への方向ベクトルを計算
      const toNatDx = natCenter.x - personCenter.x;
      const toNatDy = natCenter.y - personCenter.y;
      const toNatDistance = Math.sqrt(toNatDx * toNatDx + toNatDy * toNatDy);
      const toNatUnitX = toNatDx / toNatDistance;
      const toNatUnitY = toNatDy / toNatDistance;
      
      // nat への方向に垂直なベクトル
      const toNatPerpX = -toNatUnitY;
      const toNatPerpY = toNatUnitX;
      
      // オービット円の外枠の点を計算
      const toNatOrbitEdge = {
        x: personCenter.x + toNatUnitX * orbitRadius,
        y: personCenter.y + toNatUnitY * orbitRadius
      };
      
      // 外枠の点と nat の中心の中間点を計算（矢印の中心になる）
      const toNatMidPoint = {
        x: (toNatOrbitEdge.x + natCenter.x) / 2,
        y: (toNatOrbitEdge.y + natCenter.y) / 2
      };
      
      // 矢印の開始点と終点を計算（中間点を基準に）
      const toNatStartBase = {
        x: toNatMidPoint.x - toNatUnitX * halfArrowLength,
        y: toNatMidPoint.y - toNatUnitY * halfArrowLength
      };
      
      const toNatEndBase = {
        x: toNatMidPoint.x + toNatUnitX * halfArrowLength,
        y: toNatMidPoint.y + toNatUnitY * halfArrowLength
      };
      
      // 2本の矢印の開始点と終点を計算
      const toNatStart1X = toNatStartBase.x + toNatPerpX * arrowSpacing;
      const toNatStart1Y = toNatStartBase.y + toNatPerpY * arrowSpacing;
      const toNatEnd1X = toNatEndBase.x + toNatPerpX * arrowSpacing;
      const toNatEnd1Y = toNatEndBase.y + toNatPerpY * arrowSpacing;
      
      const toNatStart2X = toNatStartBase.x - toNatPerpX * arrowSpacing;
      const toNatStart2Y = toNatStartBase.y - toNatPerpY * arrowSpacing;
      const toNatEnd2X = toNatEndBase.x - toNatPerpX * arrowSpacing;
      const toNatEnd2Y = toNatEndBase.y - toNatPerpY * arrowSpacing;
      
      const toCulPath1 = `M ${toCulStart1X} ${toCulStart1Y} L ${toCulEnd1X} ${toCulEnd1Y}`;
      const toCulPath2 = `M ${toCulStart2X} ${toCulStart2Y} L ${toCulEnd2X} ${toCulEnd2Y}`;
      const toNatPath1 = `M ${toNatStart1X} ${toNatStart1Y} L ${toNatEnd1X} ${toNatEnd1Y}`;
      const toNatPath2 = `M ${toNatStart2X} ${toNatStart2Y} L ${toNatEnd2X} ${toNatEnd2Y}`;

      setArrowPaths({ 
        toCul1: toCulPath1, 
        toCul2: toCulPath2, 
        toNat1: toNatPath1, 
        toNat2: toNatPath2 
      });
    };

    calculateArrowPaths();
    window.addEventListener('resize', calculateArrowPaths);
    
    // Recalculate after a short delay to ensure everything is rendered
    setTimeout(calculateArrowPaths, 100);

    return () => {
      window.removeEventListener('resize', calculateArrowPaths);
    };
  }, [mounted]);

  const orbitingIcons = [
    { name: 'music', angle: 0, href: 'https://soundcloud.com/tshro' },
    { name: 'tech', angle: 120, href: 'https://github.com/mtaishiro' },
    { name: 'tea', angle: 240, href: '/blog' },
  ];

  const getIconPosition = (angle) => {
    // Hydration エラーを防ぐため、mountedになるまでrotationを0にする
    const totalAngle = angle + (mounted ? rotation : 0);
    const radian = (totalAngle * Math.PI) / 180;
    const radius = 150;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    return { x, y };
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <h1 className="absolute sidebar:top-12 top-[88px] sidebar:left-8 left-1/2 sidebar:-translate-x-0 -translate-x-1/2 text-5xl font-mono font-bold text-gray-900">
        taishiro
      </h1>

      {/* Labels - Always visible */}
      <span ref={culRef} className="absolute sidebar:top-32 top-[140px] sidebar:right-32 right-8 text-base text-gray-900 inline-block">cul.</span>
      <span ref={natRef} className="absolute sidebar:bottom-32 bottom-[88px] sidebar:left-32 left-8 text-base text-gray-900 inline-block">nat.</span>

      {/* Center orbit circle */}
      <div className="relative" style={{ zIndex: 10 }}>
        <div className="w-[300px] h-[300px] rounded-full border-2 border-gray-400" />
        
        {/* Center person icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div ref={personRef} className="w-20 h-20 rounded-full border-2 border-gray-400 flex items-center justify-center bg-[#fcf6e3]">
            <Image
              src="/icons/person.png"
              alt="Person"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        </div>

        {/* Orbiting icons */}
        {mounted && orbitingIcons.map((icon) => {
          const pos = getIconPosition(icon.angle);
          return (
            <a
              key={icon.name}
              href={icon.href}
              target={icon.href.startsWith('http') ? '_blank' : undefined}
              rel={icon.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="absolute top-1/2 left-1/2 cursor-pointer hover:scale-110 transition-transform"
              style={{
                transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
              }}
            >
              <div className="w-16 h-16 rounded-full border-2 border-gray-400 flex items-center justify-center bg-[#fcf6e3]">
                <Image
                  src={`/icons/${icon.name}.png`}
                  alt={icon.name}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
            </a>
          );
        })}
      </div>

      {/* Arrows - Always visible - placed after circle */}
      <svg 
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 5 }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#2c2c2c" />
          </marker>
        </defs>
        {arrowPaths.toCul1 && (
          <>
            <path
              d={arrowPaths.toCul1}
              stroke="#2c2c2c"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              markerEnd="url(#arrowhead)"
            />
            <path
              d={arrowPaths.toCul2}
              stroke="#2c2c2c"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              markerEnd="url(#arrowhead)"
            />
          </>
        )}
        {arrowPaths.toNat1 && (
          <>
            <path
              d={arrowPaths.toNat1}
              stroke="#2c2c2c"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              markerEnd="url(#arrowhead)"
            />
            <path
              d={arrowPaths.toNat2}
              stroke="#2c2c2c"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              markerEnd="url(#arrowhead)"
            />
          </>
        )}
      </svg>
    </div>
  );
}

