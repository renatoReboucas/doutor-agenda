"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";

const schema = z.object({
  id: z.string(),
});

export const deletePatient = actionClient
  .schema(schema)
  .action(async ({ parsedInput }) => {
    await db.delete(patientsTable).where(eq(patientsTable.id, parsedInput.id));
    revalidatePath("/patients");
    return { success: true };
  });
