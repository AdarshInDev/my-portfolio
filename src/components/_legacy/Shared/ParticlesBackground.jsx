import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      className="absolute inset-0"
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 120,
        particles: {
          color: {
            value: ["#64FFDA", "#8892B0", "#CCD6F6"],
          },
          links: {
            enable: true,
            color: "#233554",
            distance: 150,
            opacity: 0.3,
            width: 1,
          },
          move: {
            enable: true,
            random: true,
            speed: 0.5,
            direction: "none",
            outModes: {
              default: "bounce",
            },
          },
          number: {
            value: 100,
            density: {
              enable: true,
              area: 800,
            },
          },
          opacity: {
            value: 0.8,
            animation: {
              enable: true,
              speed: 0.3,
              minimumValue: 0.1,
            },
          },
          size: {
            value: { min: 1, max: 3 },
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 0.5,
            },
          },
        },
      }}
    />
  );
};

export default ParticlesBackground;