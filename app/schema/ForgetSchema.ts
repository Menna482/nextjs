import * as zod from "zod";

export const ForgetSchema = zod.object({
  email: zod
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
});
