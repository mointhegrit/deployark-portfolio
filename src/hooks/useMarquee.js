import { useEffect, useRef } from "react";
import gsap from "gsap";

// Infinite horizontal scroll for a track containing content duplicated 2x.
// Pauses on hover.
export default function useMarquee(duration = 40) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    let tween;
    const ctx = gsap.context(() => {
      const width = track.scrollWidth / 2;
      tween = gsap.to(track, {
        x: -width,
        duration,
        ease: "none",
        repeat: -1,
      });
    });
    const pause = () => tween?.pause();
    const resume = () => tween?.resume();
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);
    return () => {
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
      ctx.revert();
    };
  }, [duration]);

  return trackRef;
}
