"use server";

import { Resend } from "resend";
import { contactSchema } from "@/lib/schemas";
import { renderContactNotification, renderContactConfirmation } from "../../emails/contact";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.FROM_EMAIL ?? "onboarding@resend.dev";
const TO = process.env.TO_EMAIL ?? FROM;

export type ContactResult =
  | { ok: true }
  | { ok: false; errors: Record<string, string[]> };

export async function submitContact(_prev: ContactResult | null, formData: FormData): Promise<ContactResult> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors };
  }

  const notification = renderContactNotification(parsed.data);
  const confirmation = renderContactConfirmation(parsed.data);

  await Promise.all([
    resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: parsed.data.email,
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
    }),
    resend.emails.send({
      from: FROM,
      to: parsed.data.email,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    }),
  ]);

  return { ok: true };
}
