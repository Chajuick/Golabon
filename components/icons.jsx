// 아이콘 — 원본 프로토타입에서 이식 (순수 SVG, 서버 컴포넌트 가능)

export const ICONS = {
  search: 'M11 4a7 7 0 1 0 4.9 12l4.6 4.6 1.4-1.4-4.6-4.6A7 7 0 0 0 11 4Zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z',
  heart: 'M12 21s-7.5-4.6-10-9.2C.4 8.6 2 5 5.5 5c2 0 3.4 1.2 4.2 2.3l.8 1 .8-1C12.1 6.2 13.5 5 15.5 5 19 5 20.6 8.6 19 11.8 16.5 16.4 9 21 9 21h3Z',
  heartLine: 'M12 20.3 10.6 19C6 14.9 3 12.2 3 8.9 3 6.5 4.9 5 7 5c1.6 0 3.1.9 4 2.3C11.9 5.9 13.4 5 15 5c2.1 0 4 1.5 4 3.9 0 3.3-3 6-7.6 10.1L12 20.3Z',
  menu: 'M3 6h18M3 12h18M3 18h18',
  close: 'M5 5l14 14M19 5L5 19',
  chevR: 'M9 5l7 7-7 7',
  chevL: 'M15 5l-7 7 7 7',
  chevD: 'M5 9l7 7 7-7',
  star: 'M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9L12 2.5Z',
  check: 'M4 12l5 5L20 6',
  truck: 'M3 6h11v9H3zM14 9h4l3 3v3h-7zM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  shield: 'M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3Zm-1 11 5-5-1.4-1.4L11 11.2 9.4 9.6 8 11l3 3Z',
  xcirc: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm3.5 12.1L14 16.5 12 14.5l-2 2-1.5-1.4 2-2-2-2L10 9.5l2 2 2-2 1.5 1.4-2 2 2 2Z',
  upRight: 'M7 17 17 7M8 7h9v9',
  arrowR: 'M5 12h14M13 6l6 6-6 6',
  spark: 'M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2Z',
  thumbUp: 'M7 22V10l5-8 1.2.6c.5.3.8.9.8 1.5V8h5a2 2 0 0 1 2 2.3l-1.3 8A2 2 0 0 1 17.7 20H7Zm-2 0H2V10h3v12Z',
  thumbDn: 'M17 2v12l-5 8-1.2-.6a1.8 1.8 0 0 1-.8-1.5V16H5a2 2 0 0 1-2-2.3l1.3-8A2 2 0 0 1 6.3 4H17Zm2 0h3v12h-3V2Z',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  pot: 'M5 9h14l-1 9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 9Zm-2 0h18M9 9V6m6 3V6',
  box: 'M3 7l9-4 9 4-9 4-9-4Zm0 0v10l9 4 9-4V7M12 11v10',
  spray: 'M9 8h5v13H9zM9 8V5h3M14 10h3M14 13h3M16 5h2M16 2h2',
  drop: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z',
  plug: 'M9 2v6m6-6v6M6 8h12v3a6 6 0 0 1-12 0V8Zm6 9v5',
  phone: 'M7 2h10v20H7zM10 5h4M10 19h4',
  lamp: 'M8 3h8l3 7H5l3-7Zm4 7v8m-4 3h8',
  shirt: 'M8 3 5 5 3 8l2.5 2L7 9v12h10V9l1.5 1L21 8l-2-3-3-2c0 1.5-1.5 2.5-4 2.5S8 4.5 8 3Z',
  fork: 'M7 2v7a2 2 0 0 0 2 2v11M7 2v5M11 2v5M11 2v7a2 2 0 0 1-2 2M17 2c-1.4 1-2 3-2 6 0 2 1 3 2 3v11',
  cup: 'M4 8h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Zm12 1h2.5a2 2 0 0 1 0 4H16M7 2v2.5M11 2v2.5',
  play: 'M5 4l14 8-14 8V4Z',
  bed: 'M3 8v11M3 13h18v6M21 13v6M3 13V9.5A1.5 1.5 0 0 1 4.5 8h6A1.5 1.5 0 0 1 12 9.5V13',
  scissors: 'M7 6.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm0 6a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM9 10l11-4M9 14l11 4M9.2 9.2 20 18',
  pin: 'M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z',
  cal: 'M4 6h16v15H4zM4 9h16M8 3v4M16 3v4',
};

export function Icon({ name, size = 20, sw = 1.7, fill, style, className }) {
  const filled = ['heart', 'star', 'spark', 'shield', 'truck', 'thumbUp', 'thumbDn', 'xcirc'].includes(name) && fill;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}
      fill={filled ? 'currentColor' : 'none'} stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}
