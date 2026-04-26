"use client";

import { useCallback, useEffect, useRef, type SyntheticEvent } from "react";

/**
 * `true` = repetição contínua (recomendado no hero).
 * `false` = reproduz uma vez e congela no início do penúltimo segundo (t ≈ duração − 2s), sem o último instante.
 */
const HERO_VIDEO_LOOP = true;

export function HeroBackgroundVideo() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wasOutOfView = useRef(false);
  const didFreeze = useRef(false);

  const restartVideo = useCallback(() => {
    const v = videoRef.current;
    if (!v) {
      return;
    }
    didFreeze.current = false;
    v.currentTime = 0;
    v.play().catch(() => {
      /* autoplay policies */
    });
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            wasOutOfView.current = true;
            continue;
          }
          if (wasOutOfView.current) {
            restartVideo();
            wasOutOfView.current = false;
          }
        }
      },
      { root: null, rootMargin: "0px", threshold: 0 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [restartVideo]);

  const onTimeUpdate = useCallback((e: SyntheticEvent<HTMLVideoElement>) => {
    if (HERO_VIDEO_LOOP || didFreeze.current) {
      return;
    }
    const v = e.currentTarget;
    const d = v.duration;
    if (!d || !Number.isFinite(d) || d <= 2) {
      return;
    }
    if (v.currentTime < d - 0.2) {
      return;
    }
    const target = Math.max(0, d - 2);
    v.currentTime = target;
    v.pause();
    didFreeze.current = true;
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-0">
      <video
        ref={videoRef}
        className="h-full min-h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        loop={HERO_VIDEO_LOOP}
        muted
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        preload="auto"
        aria-hidden
        onTimeUpdate={HERO_VIDEO_LOOP ? undefined : onTimeUpdate}
      >
        <source src="/hvideo.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
