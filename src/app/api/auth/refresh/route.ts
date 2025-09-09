'use server';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: Request) {
  const cookieHeader = req.headers.get('cookie') ?? '';

  const res = await fetch(`${BASE_URL}/api/members/refresh`, {
    method: 'POST',
    headers: { Cookie: cookieHeader },
  });

  // 원 서버의 응답 쿠키 복사
  const headers = new Headers();
  res.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'set-cookie') {
      headers.append('set-cookie', value); // 👈 브라우저로 전달
    }
  });

  const body = await res.text();
  return new Response(body, { status: res.status, headers });
}
