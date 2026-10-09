import React from "react";

interface CardProps {
  title: string;
  description: string;
  icon?: string;
  badge?: string;
  href?: string;
}

export function Card({ title, description, icon, badge, href }: CardProps) {
  const content = (
    <div className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        {icon && <span className="text-2xl">{icon}</span>}
        {badge && (
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/20">
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-white transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
}
