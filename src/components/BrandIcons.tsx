import React from 'react';

export function KakaoTalkIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={`shrink-0 ${className}`}>
      {/* Yellow rounded square base matching the official brand identity */}
      <rect x="1" y="1" width="22" height="22" rx="4.5" fill="#FEE500" />
      {/* Black speech bubble */}
      <path
        d="M12 5c-3.8 0-7 2.45-7 5.5 0 2 .9 3.7 2.5 4.6l-.8 2.5c-.06.2.14.38.33.3l2.8-1.1c.6.1 1.2.2 1.9.2 3.8 0 7-2.45 7-5.5S15.8 5 12 5z"
        fill="#111111"
      />
      {/* Official "Ch" lettering in Kakao yellow */}
      <text
        x="11.8"
        y="12.8"
        fill="#FEE500"
        fontSize="7"
        fontWeight="900"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        textAnchor="middle"
      >
        Ch
      </text>
    </svg>
  );
}

export function NaverBlogIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={`shrink-0 ${className}`}>
      {/* Green rounded speech bubble representing the official Naver Blog app icon shape */}
      <rect x="2" y="4" width="20" height="13" rx="4" fill="#03C75A" />
      <polygon points="12,17 9,21 13,17" fill="#03C75A" />
      {/* White 'blog' text inside */}
      <text
        x="12"
        y="12.4"
        fill="#FFFFFF"
        fontSize="7"
        fontWeight="900"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        textAnchor="middle"
        letterSpacing="-0.03em"
      >
        blog
      </text>
    </svg>
  );
}

export function InstagramIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  // Unique gradient ID for the component instance
  const gradientId = "instagram-gradient-global";
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={`url(#${gradientId})`} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className}`}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EDE15F" />
          <stop offset="25%" stopColor="#F48A3B" />
          <stop offset="50%" stopColor="#ED394F" />
          <stop offset="75%" stopColor="#D61F92" />
          <stop offset="100%" stopColor="#9C349C" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
