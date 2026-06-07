import Link from 'next/link';
import { Icon } from '@/components/icons';

export const metadata = {
  title: '검증 기준 — 골라본은 이렇게 검증합니다',
  description: '협찬·초대가 아닌 직접 구매·방문, 충분한 사용 기간, 장점과 단점의 동시 기록. 골라본의 검증 원칙을 공개합니다.',
};

const STEPS = [
  { n: '01', t: '직접 사거나 가본다', d: '협찬·초대가 아닌, 직접 구매하고 방문한 것만 다룹니다. 대가를 받고 쓴 글은 골라본 본문이 되지 않습니다.' },
  { n: '02', t: '충분히 겪어본다', d: '제품은 평균 17일 이상 사용하고, 장소는 직접 방문해 겪은 뒤에 작성합니다.' },
  { n: '03', t: '장점·단점을 함께 기록', d: '단점 없는 리뷰는 발행하지 않습니다. 추천할 만한 이유가 분명할 때만 추천합니다.' },
];

const PRINCIPLES = [
  ['판정을 명시한다', '추천 / 조건부 추천 / 비추천 중 하나로 분명히 밝히고, 한 줄 판정을 답니다.'],
  ['누구에게 맞는지 적는다', '"이런 사람에게 추천 / 이런 사람에겐 비추천"을 함께 적어 판단을 돕습니다.'],
  ['거르는 것도 추천한다', '사지·가지 않아도 되는 것을 알리는 탈락 리스트를 운영합니다.'],
  ['제휴를 숨기지 않는다', '모든 상세·푸터에 제휴 링크를 고지하며, 추천 여부는 수수료에 영향받지 않습니다.'],
  ['사진 출처를 표기한다', '인플루언서·블로거 제공 또는 직접 촬영을 표기하고, 무단 도용을 금지합니다.'],
];

export default function VerifyPage() {
  return (
    <div className="wrap section" style={{ maxWidth: 880 }}>
      <span className="eyebrow"><Icon name="shield" size={15} fill /> 골라본이 신뢰받는 이유</span>
      <h1 style={{ fontSize: 'clamp(26px,4vw,38px)', marginTop: 12, letterSpacing: '-0.03em', lineHeight: 1.2 }}>
        안 써보고 안 가본 것을<br />추천하지 않습니다.
      </h1>
      <p style={{ fontSize: 16, color: 'var(--gray)', marginTop: 16, lineHeight: 1.7 }}>
        블로그·SNS에 협찬과 AI 광고가 넘칩니다. 골라본은 그 사이에서, 직접 겪고 검증한 것만 골라 보여줍니다.
      </p>

      <div className="gb-steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 36 }}>
        {STEPS.map((s) => (
          <div key={s.n} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: '22px 22px' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--green)', fontFamily: 'ui-monospace, monospace' }}>{s.n}</div>
            <div style={{ fontSize: 18, fontWeight: 800, marginTop: 8, letterSpacing: '-0.02em' }}>{s.t}</div>
            <div style={{ fontSize: 14, color: 'var(--gray)', marginTop: 8, lineHeight: 1.6 }}>{s.d}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 22, marginTop: 48, marginBottom: 18 }}>골라본 검증 원칙</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {PRINCIPLES.map(([t, d], i) => (
          <div key={i} style={{ display: 'flex', gap: 14, background: 'var(--green-tint)', border: '1px solid var(--green-soft)', borderRadius: 'var(--r-lg)', padding: '16px 18px' }}>
            <Icon name="check" size={20} sw={2.4} style={{ color: 'var(--green)', flex: '0 0 auto', marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 800 }}>{t}</div>
              <div style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 4, lineHeight: 1.6 }}>{d}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 40, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Link className="btn btn-green btn-lg" href="/category">검증된 추천 보기 <Icon name="arrowR" size={18} /></Link>
        <Link className="btn btn-ghost btn-lg" href="/rejected"><Icon name="thumbDn" size={17} /> 탈락 리스트 보기</Link>
      </div>
    </div>
  );
}
