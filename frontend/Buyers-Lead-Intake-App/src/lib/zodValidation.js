import { z } from "zod";

// Column validators
const columnValidators = {
  fullName: z.string().min(2, "Full Name must be greater than 2 characters"),
  email: z.string().email("Please enter a valid Email Address").optional(),
  phone: z.string().regex(/^[0-9]{10,15}$/, "Phone Number must be 10 - 15 digits"),
  city: z.enum(["Chandigarh", "Mohali", "Zirakpur", "Panchkula", "Other"], {
    errorMap: () => ({ message: "City must be one of Chandigarh, Mohali, Zirakpur, Panchkula, Other" }),
  }),
  propertyType: z.enum(["Apartment", "Villa", "Plot", "Office", "Retail"], {
    errorMap: () => ({ message: "Property type must be one of Apartment, Villa, Plot, Office, Retail" }),
  }),
  bhk: z.string().optional(),
  purpose: z.enum(["Buy", "Rent"], {
    errorMap: () => ({ message: "Purpose must be Buy or Rent" }),
  }),
  budgetMin: z.preprocess(
    (val) => (val === "" ? null : Number(val)),
    z.number().nonnegative("Minimum budget must be >= 0").nullable()
  ),
  budgetMax: z.preprocess(
    (val) => (val === "" ? null : Number(val)),
    z.number().nullable()
  ),
  timeline: z.enum(["0-3m", "3-6m", ">6m", "Exploring"], {
    errorMap: () => ({ message: "Timeline must be 0-3m, 3-6m, >6m, or Exploring" }),
  }),
  source: z.enum(["Website", "Referral", "Walk-in", "Call", "Other"], {
    errorMap: () => ({ message: "Source must be Website, Referral, Walk-in, Call, or Other" }),
  }),
  status: z.preprocess(
    (val) => (typeof val === "string" ? val.trim().charAt(0).toUpperCase() + val.trim().slice(1).toLowerCase() : val),
    z.enum(
      ["New", "Qualified", "Contacted", "Visited", "Negotiation", "Converted", "Dropped"],
      { errorMap: () => ({ message: "Invalid status value" }) }
    )
  ),  
  notes: z.string().max(1000, "Notes cannot exceed 1000 characters").optional(),
  tags: z.preprocess(
    (val) => (typeof val === "string" ? val.split(",").map((s) => s.trim()) : val),
    z.array(z.string()).optional()
  ),
};

// ✅ Validate a whole row
function validateRow(rowData) {
  let errorCount = 0;
  const result = {};

  for (const [column, validator] of Object.entries(columnValidators)) {
    const value = rowData[column];
    const parsed = validator.safeParse(value);
    // console.log("Status value raw:", JSON.stringify(value));
    if (parsed.success) {
      result[column] = { success: true, value, message: "Success" };
    } else {
      errorCount++;
      const firstError = parsed.error?.errors?.[0]?.message || "Invalid value";
      result[column] = { success: false, value, message: firstError };
    }
  }

  return { result, errorCount };
}

export default validateRow;
