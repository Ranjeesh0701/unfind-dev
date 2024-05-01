type BackgroundProps = {
  children: React.ReactNode;
};

const Background = ({ children }: BackgroundProps) => {
  return (
    <div className="w-full dark:bg-black bg-secondary dark:bg-dot-secondary/[0.4] bg-dot-black/[0.4] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_100%,black)]"></div>
      {children}
    </div>
  );
};

export default Background;
