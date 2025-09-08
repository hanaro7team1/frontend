export type SignupForm = {
  loginId: string;
  password: string;
  confirmPassword: string;
  villageName: string;
  region: string;
  phone: string;
};

export type SignupErrors = Partial<Record<keyof SignupForm, string>>;
