// app/api/internal/presign/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const token = process.env.LOCAL_ADMIN_TOKEN; // 서버 전용! 클라로 안 나감

  if (!token) {
    return NextResponse.json({ error: 'SERVER_TOKEN_MISSING' }, { status: 500 });
  }

  const r = await fetch('http://localhost:8082/api/admin/upload/presign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const raw = await r.text();
  return new NextResponse(raw, {
    status: r.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
