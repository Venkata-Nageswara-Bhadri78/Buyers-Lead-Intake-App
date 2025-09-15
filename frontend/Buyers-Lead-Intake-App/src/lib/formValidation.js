import { z } from 'zod';

const checkValidation = (formData) => {
    const simpleSchema = z.object({
        fullName : z.string().min(2, "Full Name must be greater than 3 characters"),
        email : z.string().email("Please Enter a Valid Email Address"),
        phone : z.string().regex(/^[0-9]{10,15}$/, "Phone Number must be of 10 - 15 Characters"),
        city: z.enum(["Chandigarh","Mohali","Zirakpur","Panchkula","Other"]),
        propertyType: z.enum(["Apartment","Villa","Plot","Office","Retail"]),
        bhk: z.string().optional(),
        purpose: z.enum(["Buy", "Rent"]),
        minBudget: z.number().nonnegative("Minimum budget must be >=0").nullable(),
        maxBudget: z.number().nullable(),
        timeline: z.enum(["0-3m","3-6m",">6m","Exploring"]),
        source: z.enum(["Website","Referral","Walk-in","Call","Other"]),
        status: z.enum(["New","Qualified","Contacted","Visited","Negotiation","Converted","Dropped"]).default("New"),
        notes: z.string().max(1000, "Notes cannot exceed 1000 characters").optional(),
        tags: z.array(z.string()).optional(),
    })
    .superRefine((data, ctx) => {

        if (["Apartment", "Villa"].includes(data.propertyType) && (!data.bhk || data.bhk.length === 0)) {
          ctx.addIssue({
            path: ["bhk"],
            code: "custom",
            message: "BHK is required only for Apartment/Villa",
          });
        }
      
        if (data.minBudget !== null && data.maxBudget !== null && data.maxBudget < data.minBudget) {
          ctx.addIssue({
            path: ["maxBudget"],
            code: "custom",
            message: "Maximum Budget should be greater than or equal to Minimum Budget",
          });
        }
    });

    const result = simpleSchema.safeParse(formData);

    if (result.success) {
        return { success: true, data: result.data };
    } 
    else {
        return { success: false, errors: result.error.format() };
    }
}
export default checkValidation;
/*
const [formData, setFormData] = useState({
    id: JSON.parse(localStorage.getItem("user")).uuid,
    fullName : '',
    email : '',
    phone : '',
    city: '',
    propertyType: '',
    bhk: '',
    purpose: '',
    minBudget: '',
    maxBudget: '',
    timeline: '',
    source: '',
    status: 'New',
    notes: '',
    tags: '',
    updatedAt: new Date().toISOString()
})
*/