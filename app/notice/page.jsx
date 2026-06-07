import { Icon } from '@/components/icons';

export const metadata = {
  title: '제휴·광고 고지',
  description: '골라본의 제휴 링크 운영 방식과 추천 독립성에 대한 안내.',
};

export default function NoticePage() {
  return (
    <div className="wrap section" style={{ maxWidth: 760 }}>
      <span className="eyebrow"><Icon name="shield" size={15} fill /> 투명성 안내</span>
      <h1 style={{ fontSize: 'clamp(24px,3.6vw,32px)', marginTop: 12, letterSpacing: '-0.03em' }}>제휴·광고 고지</h1>

      <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 22, fontSize: 15, lineHeight: 1.75, color: 'var(--ink-soft)' }}>
        <section>
          <h2 style={{ fontSize: 18, marginBottom: 8 }}>제휴 링크 안내</h2>
          <p>
            골라본의 일부 페이지에는 쿠팡 파트너스, 알리익스프레스, 테무, 무신사, 지그재그, 야놀자, 여기어때,
            캐치테이블 등의 <b>제휴(어필리에이트) 링크</b>가 포함되어 있습니다. 사용자가 이 링크를 통해 구매하거나 예약하면,
            골라본은 판매자로부터 일정 수수료를 제공받을 수 있습니다. 이 수수료는 사용자가 지불하는 가격에 영향을 주지 않습니다.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, marginBottom: 8 }}>추천의 독립성</h2>
          <p>
            <b>추천 여부와 리뷰 내용은 제휴 수수료에 영향을 받지 않습니다.</b> 골라본은 직접 써보고 가본 경험과
            자체 검증 기준에 따라 추천·조건부 추천·비추천을 판정하며, 추천할 수 없는 경우 그 이유를 솔직하게 남깁니다.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, marginBottom: 8 }}>직접 결제·예약을 제공하지 않습니다</h2>
          <p>
            골라본은 제품을 직접 판매하거나 예약을 받지 않습니다. 모든 구매·예약은 외부 판매처·예약 채널에서 이루어지며,
            결제·배송·환불 등에 대한 책임은 해당 판매처에 있습니다.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, marginBottom: 8 }}>사진·콘텐츠 출처</h2>
          <p>
            상세페이지의 사진은 인플루언서·블로거가 제공했거나 골라본이 직접 촬영한 자료이며, 출처를 함께 표기합니다.
            제공 사진의 무단 도용·재배포를 금지합니다.
          </p>
        </section>

        <div style={{ background: 'var(--cream)', border: '1px dashed var(--line)', borderRadius: 'var(--r-lg)', padding: '16px 18px', display: 'flex', gap: 12 }}>
          <Icon name="shield" size={20} fill style={{ color: 'var(--green)', flex: '0 0 auto', marginTop: 1 }} />
          <p style={{ fontSize: 13.5, color: 'var(--gray)', lineHeight: 1.65 }}>
            본 고지는 공정거래위원회 「추천·보증 등에 관한 표시·광고 심사지침」을 준수하기 위한 것입니다.
            문의 사항은 운영팀으로 연락 주세요.
          </p>
        </div>
      </div>
    </div>
  );
}
