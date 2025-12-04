import "dotenv/config";
import { z } from "zod";

//from now on I'll always use this way

const envSchema = z.object({
  BCRYPT_ROUNDS: z.coerce.number().default(10),
  PORT: z.coerce.number(),
  MONGO_URI: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
  GEMINI_API_KEY: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);
// console.log(parsed);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsed.error.issues);
  process.exit(1);
}

export const env = parsed.data;
