'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    daum?: {
      Postcode: new (opts: {
        oncomplete: (data: any) => void;
        onclose?: (state: 'COMPLETE_CLOSE' | 'FORCE_CLOSE') => void;
      }) => { open: () => void };
    };
  }
}

const KAKAO_POSTCODE_SRC = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
const KAKAO_SCRIPT_ID = 'daum-postcode-script';

/** 외부 스크립트 1회 로드 */
function useLoadDaumPostcodeScript() {
  const [ready, setReady] = useState<boolean>(
    () => typeof window !== 'undefined' && !!window.daum?.Postcode,
  );

  useEffect(() => {
    // 클라이언트 가드
    if (typeof window === 'undefined') return;
    if (ready) return;

    // 이미 Postcode 객체가 있으면 즉시 ready
    if (window.daum?.Postcode) {
      setReady(true);
      return;
    }

    // ID 기준으로 스크립트 존재 확인(absolute/relative src 변형 이슈 방지)
    let script = document.getElementById(KAKAO_SCRIPT_ID) as HTMLScriptElement | null;

    const onLoad = () => {
      if (window.daum?.Postcode) setReady(true);
    };

    if (script) {
      // 이미 붙어있는데 load가 끝났을 수도 있음 -> readyState 체크
      if ((script as any).readyState === 'loaded' || (script as any).readyState === 'complete') {
        onLoad();
      } else {
        script.addEventListener('load', onLoad, { once: true });
      }
      return () => script?.removeEventListener('load', onLoad);
    }

    // 새로 삽입
    script = document.createElement('script');
    script.id = KAKAO_SCRIPT_ID;
    script.src = KAKAO_POSTCODE_SRC;
    script.async = true;
    script.addEventListener('load', onLoad, { once: true });
    script.addEventListener('error', () => console.error('[DaumPostcode] script load failed'));
    document.head.appendChild(script);

    return () => script?.removeEventListener('load', onLoad);
  }, [ready]);

  return ready;
}

/** 팝업 열기 전용 훅 */
export function useDaumPostcodePopup() {
  const ready = useLoadDaumPostcodeScript();
  const openingRef = useRef(false); // 연속 클릭 방지

  const open = useCallback(
    (onSelect: (addr: { address: string; zonecode?: string }) => void) => {
      if (typeof window === 'undefined') return;
      if (!ready || !window.daum?.Postcode) {
        console.warn('[DaumPostcode] not ready yet');
        return;
      }
      if (openingRef.current) return;
      openingRef.current = true;

      const restore = () => {
        openingRef.current = false;
      };

      const pc = new window.daum.Postcode({
        oncomplete: (data: any) => {
          // 주소 조합(건물명/법정동 포함) + 우편번호 반환
          const base = data.roadAddress || data.address;
          const extraParts: string[] = [];
          if (data.bname) extraParts.push(data.bname);
          if (data.buildingName) extraParts.push(data.buildingName);
          const extra = extraParts.length ? ` (${extraParts.join(', ')})` : '';
          onSelect({ address: base + extra, zonecode: data.zonecode });
          restore();
        },
        onclose: () => restore(),
      });

      try {
        pc.open();
      } catch (e) {
        restore();
        console.error(e);
      }
    },
    [ready],
  );

  return { ready, open };
}
