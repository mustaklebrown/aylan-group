import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  gradientTitle?: string;
}

export default function PageHeader({ title, subtitle, gradientTitle }: PageHeaderProps) {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden bg-bg-dark">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-primary/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-full md:w-1/2 h-full bg-accent/5 blur-[120px] rounded-full pointer-events-none translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          {title} <span className="text-gradient-gold">{gradientTitle}</span>
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
