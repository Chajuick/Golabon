// 푸터 (제휴 고지 포함) — 원본에서 이식. go() → next/link
import Link from 'next/link';
import { Icon } from './icons';
import { Logo } from './ui';

const COLS = [
  { h: '탐색', items: [['홈', '/'], ['카테고리', '/category'], ['탈락템·비추천', '/rejected']] },
  { h: '신뢰', items: [['검증 기준', '/verify'], ['제휴·광고 고지', '/notice']] },
  { h: '골라본', items: [['소개', '/verify'], ['문의', '/notice']] },
];

export function Footer() {
  return (
    <footer style={{ background: '#1C1F24', color: '#C9CDD3', marginTop: 40 }}>
      <div className="wrap" style={{ padding: '44px 24px 36px' }}>
        <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)',
          borderRadius: 14, padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 32 }}>
          <span style={{ color: 'var(--green)', flex: '0 0 auto', marginTop: 1 }}><Icon name="shield" size={22} fill /></span>
          <p style={{ fontSize: 13.5, lineHeight: 1.65, color: '#AEB3BB' }}>
            <b style={{ color: '#fff' }}>제휴 링크 고지 ·</b> 이 사이트에는 쿠팡·알리·테무 등의 제휴 링크가 포함되어 있으며,
            링크를 통해 구매가 발생하면 일정 수수료를 제공받을 수 있습니다.
            단, <b style={{ color: '#fff' }}>리뷰와 추천 여부는 실제 사용 경험과 자체 검증 기준에 따라</b> 작성되며 수수료에 영향을 받지 않습니다.
          </p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'space-between' }}>
          <div style={{ maxWidth: 280 }}>
            <Logo light />
            <p style={{ fontSize: 13, lineHeight: 1.6, color: '#8A8F97', marginTop: 12 }}>
              직접 써보고 가보고 괜찮은 것만 골라본.<br />흩어진 협찬·홍보 속 진짜 괜찮은 제품·장소를 먼저 검증합니다.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
            {COLS.map((col) => (
              <div key={col.h}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 12 }}>{col.h}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {col.items.map((it, i) => (
                    <Link key={i} href={it[1]} style={{ fontSize: 13, color: '#8A8F97' }}>{it[0]}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', marginTop: 32, paddingTop: 20,
          fontSize: 12, color: '#70757D', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <span>© 2026 골라본 (Golabon). 실사용 검증 큐레이션.</span>
          <span>본 사이트는 직접 결제·예약을 제공하지 않으며, 구매·예약은 외부 채널에서 이루어집니다.</span>
        </div>
      </div>
    </footer>
  );
}
