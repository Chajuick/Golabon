// 상세페이지 에디토리얼 (쇼핑몰 상세컷 · 인플루언서 제공 사진 기반) — 서버 렌더링
import { Icon } from '../icons';
import { Slot } from '../ui';

export function ShopDetail({ p, isPlace, photos = {} }) {
  const points = p.pros.slice(0, 2);
  const specRows = Object.entries(p.summary);
  // 섹션별 은은한 색상 (좋았던 점=초록 / 실제 느낌=앰버 / 정보=블루)
  const SECT = {
    good: { bar: 'var(--green)', bg: 'var(--green-tint)', bd: 'var(--green-soft)' },
    feel: { bar: '#E0A23D', bg: '#FBF6EC', bd: '#F0E3C6' },
    spec: { bar: '#4C7EF3', bg: '#F2F5FD', bd: '#DEE8FB' },
  };
  return (
    <div className="sd" style={{ marginTop: 8 }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <span className="sd-eyebrow"><Icon name="spark" size={14} fill /> 직접 방문 · 현장 검증</span>
        <h2 style={{ fontSize: 26, marginTop: 14, letterSpacing: '-0.03em' }}>
          {isPlace ? '직접 가보니, 이런 곳이었습니다' : '직접 써보니, 이랬습니다'}
        </h2>
        <p style={{ color: 'var(--gray)', marginTop: 8, fontSize: 14.5, lineHeight: 1.6 }}>
          협찬·광고가 아니라, 골라본이 직접 확인하고 한 컷씩 골라 담은 검증 기록입니다.
        </p>
      </div>

      {/* lead band */}
      <div className="sd-shot sd-lead" style={{ aspectRatio: '16/10' }}>
        <Slot src={photos.lead} ph="대표 이미지 준비 중" />
        <div className="sd-overlay">
          <h3>{p.name}</h3>
          <p>&quot;{p.oneLiner}&quot;</p>
        </div>
      </div>
      <div className="sd-cap">
        <Icon name="search" size={14} style={{ color: 'var(--gray-light)' }} />
        <span className="src">직접 촬영했거나, 출처를 밝히고 제공받은 검증 사진입니다</span>
      </div>

      {/* detail points — 초록 톤 */}
      <section style={{ marginTop: 36, background: SECT.good.bg, border: `1px solid ${SECT.good.bd}`, borderRadius: 'var(--r-lg)', padding: '22px 22px 24px' }}>
        <h3 style={{ fontSize: 19, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 4, height: 18, borderRadius: 2, background: SECT.good.bar }}></span> 현장에서 확인한 강점
        </h3>
        <div className="sd-grid2">
          {points.map((pt, i) => (
            <div key={i}>
              <div className="sd-shot" style={{ aspectRatio: '4/3' }}>
                <Slot src={photos['p' + i]} ph={`상세 이미지 ${i + 1} 준비 중`} />
              </div>
              <div className="sd-point" style={{ display: 'flex', gap: 11, alignItems: 'center', marginTop: 12 }}>
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span className="ptxt">{pt}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 현장 하이라이트 (바베큐·야경 등) — 코랄 톤. highlights 있을 때만 */}
      {Array.isArray(p.highlights) && p.highlights.map((h, i) => {
        const imgs = h.imgs || [];
        return (
          <section key={i} style={{ marginTop: 18, background: '#FBF2F0', border: '1px solid #F3D9D3', borderRadius: 'var(--r-lg)', padding: '22px 22px 24px' }}>
            <h3 style={{ fontSize: 19, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 4, height: 18, borderRadius: 2, background: 'var(--coral-deep)' }}></span>
              {h.title}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: imgs.length > 1 ? '1fr 1fr' : '1fr', gap: 10 }}>
              {imgs.map((src, j) => (
                <div key={j} className="sd-shot" style={{ aspectRatio: imgs.length > 1 ? '4/3' : '16/9' }}>
                  <Slot src={src} ph="이미지 준비 중" />
                </div>
              ))}
            </div>
            {h.text && <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--ink-soft)', marginTop: 16, textWrap: 'pretty', whiteSpace: 'pre-line' }}>{h.text}</p>}
          </section>
        );
      })}

      {/* usage full-bleed — 앰버 톤 */}
      <section style={{ marginTop: 18, background: SECT.feel.bg, border: `1px solid ${SECT.feel.bd}`, borderRadius: 'var(--r-lg)', padding: '22px 22px 24px' }}>
        <h3 style={{ fontSize: 19, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 4, height: 18, borderRadius: 2, background: SECT.feel.bar }}></span>
          {isPlace ? '현장에서 본 그대로' : '사용하며 느낀 그대로'}
        </h3>
        <div className="sd-shot" style={{ aspectRatio: '16/9' }}>
          <Slot src={photos.use} ph={isPlace ? '현장 이미지 준비 중' : '사용 이미지 준비 중'} />
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--ink-soft)', marginTop: 16, textWrap: 'pretty', whiteSpace: 'pre-line' }}>{p.body.exp}</p>
      </section>

      {/* spec table — 블루 톤 */}
      <section style={{ marginTop: 18, background: SECT.spec.bg, border: `1px solid ${SECT.spec.bd}`, borderRadius: 'var(--r-lg)', padding: '22px 22px 24px' }}>
        <h3 style={{ fontSize: 19, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 4, height: 18, borderRadius: 2, background: SECT.spec.bar }}></span>
          {isPlace ? '한눈에 보는 장소 정보' : '한눈에 보는 제품 정보'}
        </h3>
        <div className="sd-spec">
          {isPlace ? (
            <>
              <div className="row"><div className="k">위치</div><div className="v">{p.area}</div></div>
              <div className="row"><div className="k">가격대</div><div className="v">{p.priceRange}</div></div>
            </>
          ) : (
            <div className="row"><div className="k">카테고리</div><div className="v">{p.catLabel}</div></div>
          )}
          {specRows.map(([k, v], i) => (
            <div className="row" key={i}><div className="k">{k}</div><div className="v">{v}</div></div>
          ))}
        </div>
      </section>

      {/* credit bar */}
      <div className="sd-credit" style={{ marginTop: 24 }}>
        <Icon name="shield" size={20} fill style={{ color: 'var(--green)', flex: '0 0 auto', marginTop: 1 }} />
        <div>
          <div style={{ color: '#fff', fontWeight: 800, fontSize: 13.5, marginBottom: 4 }}>사진 출처</div>
          <p style={{ fontSize: 13, lineHeight: 1.6 }}>
            이 페이지의 사진은 골라본이 직접 촬영했거나, 인플루언서·블로거에게 제공받아 출처를 표기한 검증 컷입니다.
            무단 사용은 금지합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
