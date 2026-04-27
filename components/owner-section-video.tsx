"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

type OwnerSectionVideoProps = {
  videoSrc: string;
};

/**
 * Cliente: em iOS/Android o autoplay por vezes exige `play()` após o load e
 * atributos `playsinline` / webkit. Sem isto, o vídeo pode ficar congelado no poster.
 */
export function OwnerSectionVideo({ videoSrc }: OwnerSectionVideoProps) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useLayoutEffect(() => {
    const v = ref.current;
    if (!v) {
      return;
    }
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");

    const tryPlay = () => {
      v.play().catch(() => {
        /* Autoplay: política do browser */
      });
    };

    tryPlay();
    v.addEventListener("loadeddata", tryPlay);
    v.addEventListener("canplay", tryPlay);
    v.addEventListener("resume", tryPlay);
    const onVis = () => {
      if (document.visibilityState === "visible") {
        tryPlay();
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      v.removeEventListener("loadeddata", tryPlay);
      v.removeEventListener("canplay", tryPlay);
      v.removeEventListener("resume", tryPlay);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [videoSrc]);

  return (
    <>
      <video
        ref={ref}
        aria-label="White cargo van and forklift loading palletized freight at a distribution yard"
        autoPlay
        className="owner-operator-media-mask absolute inset-0 z-0 h-full w-full min-h-full min-w-full origin-center object-cover object-center brightness-[0.99] saturate-[0.95] max-md:transform-gpu motion-reduce:hidden md:[transform:scale(1.08)_translateZ(0)]"
        loop
        muted
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        poster="/owner-operator-section.png"
        preload="auto"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <Image
        alt="White cargo van and forklift loading palletized freight at a distribution yard"
        className="owner-operator-media-mask hidden object-cover object-center brightness-[0.99] saturate-[0.95] motion-reduce:absolute motion-reduce:inset-0 motion-reduce:z-0 motion-reduce:block motion-reduce:h-full motion-reduce:w-full"
        fill
        sizes="(max-width: 768px) 100vw, 44vw"
        src="/owner-operator-section.png"
      />
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,#F5F5F7_0%,transparent_8%,transparent_92%,#F5F5F7_100%)] md:hidden"
        aria-hidden
      />
    </>
  );
}
