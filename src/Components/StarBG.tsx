import { useEffect, useRef } from "react";

export default function StarBG({
  starCount = 250,
  starColor = "#FFFFFF",
  speed = 0.2,
}: {
  starCount?: number;
  starColor?: string;
  speed?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const stars: { x: number; y: number; size: number; velocityY: number; velocityX: number; length: number }[] = [];

    // Resize canvas to full screen
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    // Create random stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5, // radius
        velocityY: Math.random() * speed + 0.5, // vertical speed
        velocityX: (Math.random() - 0.5) * speed, // small sideways drift
        length: Math.random() * 15 + 5, // trail length
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let star of stars) {
        ctx.beginPath();
        ctx.strokeStyle = starColor;
        ctx.lineWidth = star.size;

        // Draw streak
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.velocityX * star.length, star.y - star.velocityY * star.length);
        ctx.stroke();

        // Move star
        star.x += star.velocityX;
        star.y += star.velocityY;

        // Reset star when out of view
        if (star.y > canvas.height || star.x < 0 || star.x > canvas.width) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [starCount, starColor, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // sit behind content
      }}
    />
  );
}
