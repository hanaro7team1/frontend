import { NextRequest, NextResponse } from 'next/server';

const ROUTES = {
  ADMIN_ONLY: ['/admin'] as const,
  LOGGED_IN_ONLY: ['/reservations', '/main'] as const,
  AUTH: {
    SIGNIN: '/auth/signin',
    INVALID_ACCESS: '/invalidAccess',
  } as const,
} as const;

const USER_ROLES = { ADMIN: 'ROLE_ADMIN' } as const;

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  // 경로 매칭 함수
  const isPathMatched = (routes: readonly string[]): boolean => {
    return routes.some((route) => pathname.startsWith(route));
  };

  // 사용자 인증 정보 확인
  const accessToken = req.cookies.get('accessToken')?.value;
  const userRole = req.cookies.get('role')?.value;

  const isLoggedIn = Boolean(accessToken);
  const isAdmin = userRole === USER_ROLES.ADMIN;

  // 1. 로그인이 필요한 페이지 접근 시
  const isBookingPage = pathname.match(/^\/stays\/[^\/]+\/booking/);
  if ((isPathMatched(ROUTES.LOGGED_IN_ONLY) || isBookingPage) && !isLoggedIn) {
    return NextResponse.redirect(new URL(ROUTES.AUTH.SIGNIN, origin));
  }

  // 2. 관리자 페이지 접근 시
  if (isPathMatched(ROUTES.ADMIN_ONLY)) {
    // 2-1. 로그인하지 않은 경우
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL(ROUTES.AUTH.SIGNIN, origin));
    }

    // 2-2. 로그인했지만 관리자가 아닌 경우
    if (!isAdmin) {
      return NextResponse.redirect(new URL(ROUTES.AUTH.INVALID_ACCESS, origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Next.js 내부 파일, 정적 파일, 인증 관련 페이지, 웹 표준 경로 제외
    '/((?!_next|fonts|icons|images|loaders|auth|api|invalidAccess|hana|\\.well-known).*)',
  ],
};
