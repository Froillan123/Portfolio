export const FloatingParticles = () => {
  const particles = Array.from({ length: 15 }, (_, i) => (
    <div
      key={i}
      className={`absolute w-2 h-2 bg-primary/20 rounded-full animate-float`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${5 + Math.random() * 10}s`,
      }}
    />
  ));

  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{particles}</div>;
};

