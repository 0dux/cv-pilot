import z, { email } from "zod";

export const registerUserData = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(6),
});

export type RegisterUserData = z.infer<typeof registerUserData>;

export const loginUserData = z.object({
  email: z.email().min(3),
  password: z.string().min(6),
});

export type LoginUserData = z.infer<typeof loginUserData>;
