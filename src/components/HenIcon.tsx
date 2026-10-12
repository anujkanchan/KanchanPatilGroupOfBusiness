import React from 'react';

export interface HenIconProps {
  className?: string;
}

export const HenIcon: React.FC<HenIconProps> = ({ className = "w-7 h-7 text-[#FFD700]" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Rooster / Hen comb */}
    <path d="M12 3c.6 0 1 .4 1 1a1.5 1.5 0 0 0 2 0 1.5 1.5 0 0 0 2 1.5c.8 0 1.5.7 1.5 1.5" />
    {/* Beak & Wattle */}
    <path d="M18.5 7l3 1.5-2.5 2" />
    <path d="M17.5 11c0 1-.8 1.5-1.5 1.5" />
    {/* Body */}
    <path d="M16 6c-2.5 0-4 1.5-4.5 3.5-1.5-.5-3.5 0-4.5 1.5-1.5 2-1 4.5.5 6 1.5 1.5 3.5 2 5.5 2 4 0 7-3 7-7 0-.8-.2-1.5-.5-2" />
    {/* Wing */}
    <path d="M11.5 13c1.5 0 2.5 1 2.5 2.5" />
    {/* Tail Feathers */}
    <path d="M7 11C5 9.5 3 9 2 10.5c-1 1.5 0 3.5 1.5 4.5" />
    {/* Legs */}
    <path d="M11 19v3M9.5 22h3" />
    <path d="M15 19v3M13.5 22h3" />
  </svg>
);

export default HenIcon;
