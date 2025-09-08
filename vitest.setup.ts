import '@testing-library/jest-dom';

vi.mock('next-auth', () => {
  const mockHandlers = {
    GET: vi.fn(),
    POST: vi.fn(),
  };

  const authConfig = {
    handlers: mockHandlers,
    auth: vi.fn(),
    signIn: vi.fn(),
    signOut: vi.fn(),
  };

  const NextAuth = vi.fn(() => authConfig);

  return {
    default: NextAuth,
    NextAuth,
    AuthError: class AuthError extends Error {},
    CredentialsSignin: class CredentialsSignin extends Error {},
  };
});

vi.mock('next-auth/providers/credentials', () => ({
  default: vi.fn(() => ({
    id: 'credentials',
    name: 'Credentials',
    type: 'credentials',
    credentials: {},
    authorize: vi.fn(),
  })),
}));
