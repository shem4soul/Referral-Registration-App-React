import z from "zod";

export const userFormSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First name field is required" })
    .max(100, { message: "First name should not longer than 100 characters" }),
  last_name: z
    .string()
    .min(2, { message: "Last name field is required" })
    .max(100, { message: "Last name should not longer than 100 characters" }),
  email: z.string().email(),
  gender: z.enum(["male", "female", "other"]),
  date_of_birth: z.date(),
  reffer_by: z
    .string()
    .min(2, { message: "Referral code is required" })
    .optional(),
  country_code: z.string().min(1, { message: "Country code is required" }),
  phone_number: z
    .string()
    .min(10, { message: "Phone number is required" })
    .max(15, { message: "Phone number should not longer than 15 characters" }),
  pin: z
    .string()
    .min(6, { message: "Password must be at least 6 digits long" })
    .max(10, { message: "Password must not be longer than 10 digits" })
    .regex(/^[0-9]+$/, { message: "Password must contain only numbers" }),
});

export const businessFormSchema = z.object({
  business_name: z
    .string()
    .min(2, { message: "Business name field is required" })
    .max(100, {
      message: "Business name should not longer than 100 characters",
    }),
  business_sector: z
    .string()
    .min(2, { message: "Business sector field is required" })
    .max(100, {
      message: "Business sector should not longer than 100 characters",
    }),
  email: z.string().email(),
  country_code: z.string().min(1, { message: "Country code is required" }),
  phone_number: z
    .string()
    .min(10, { message: "Phone number is required" })
    .max(15, { message: "Phone number should not longer than 15 characters" }),
  business_category: z
    .string()
    .min(10, { message: "Business category is required" })
    .max(15, {
      message: "Business category should not longer than 15 characters",
    }),
  reffer_by: z
    .string()
    .optional(),
  password: z
  .string()
  .min(6, { message: "Password must be at least 6 characters long" })
  .max(10, { message: "Password must not be longer than 10 characters" })
  .regex(/^[A-Za-z0-9]+$/, { message: "Password must contain only letters and numbers" }),
});

export const loginSchema = z.object({
  country_code: z.string().min(1, { message: "Country code is required" }),
  phone_number: z
    .string()
    .min(10, { message: "Phone number is required" })
    .max(15, { message: "Phone number should not longer than 15 characters" }),
      pin: z
    .string().min(1, { message: "Password is required" }),
    // .min(6, { message: "Password must be at least 6 digits long" })
    // .max(10, { message: "Password must not be longer than 10 digits" })
    // .regex(/^[0-9]+$/, { message: "Password must contain only numbers" }),
})
export const resetPasswordSchema = z.object({
  country_code: z.string().min(1, { message: "Country code is required" }),
  phone_number: z
    .string()
    .min(10, { message: "Phone number is required" })
    .max(15, { message: "Phone number should not longer than 15 characters" }),
})
