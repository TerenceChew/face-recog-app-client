import Particles from 'react-tsparticles';
import './ParticlesBg.css';

export default function ParticlesBg() {
  const options = {
    background: {
      color: {
        value: "",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 2,
        },
        repulse: {
          distance: 120,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: ["#BD10E0", "#B8E986", "#50E3C2", "#FFD300", "#E86363"],
      },
      links: {
        color: "#FFFFFF",
        distance: 150,
        enable: false, // disable links
        opacity: 1,
        width: 1,
      },
      collisions: {
        enable: false,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 1500,
        },
        value: 50,
      },
      opacity: {
        value: 1,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 6 },
      },
    },
    detectRetina: true,
  };

  return (
    <Particles
      className="particles"
      options={options}
    />
  );
};
