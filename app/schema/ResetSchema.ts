import * as zod from "zod";

export const ResetSchema = zod.object({
  resetCode: zod
    .string()
    .nonempty("resetcode is required")
  
});
