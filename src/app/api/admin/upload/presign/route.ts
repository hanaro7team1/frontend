// 이미지 업로드용 route.ts 임시...
//TODO: 나중에 삭제하기 -> token 대신 cookie로 변경할 예정...
export async function POST(req: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return new Response('Not Found', { status: 404 });
  }

  const token = process.env.LOCAL_ADMIN_TOKEN;
  if (!token) {
    // dev에서 토큰 없으면 바로 메시지
    return new Response('LOCAL_ADMIN_TOKEN is missing (.env.local)', { status: 500 });
  }

  const body = await req.json();

  // 리다이렉트 추적을 위해 manual
  const upstream = await fetch('http://localhost:8082/api/admin/upload/presign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Bearer 접두사 필수
    },
    body: JSON.stringify(body),
    redirect: 'manual',
  });

  // 3xx면 목적지 알려주고 중단 (무한루프 방지 + 디버깅)
  if (upstream.status >= 300 && upstream.status < 400) {
    const loc = upstream.headers.get('location') ?? '(no Location)';
    return new Response(`Upstream redirected to: ${loc}`, { status: 502 });
  }

  const text = await upstream.text();
  return new Response(text, {
    status: upstream.status,
    headers: {
      'Content-Type': upstream.headers.get('Content-Type') ?? 'application/json',
    },
  });
}
