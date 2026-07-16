import type { ContactInput } from "@/lib/schemas";

export function renderContactNotification(input: ContactInput): { subject: string; html: string; text: string } {
  const { name, email, phone, message } = input;
  const subject = `New enquiry from ${name}`;
  const text = [`Name: ${name}`, `Email: ${email}`, phone && `Phone: ${phone}`, "", "Message:", message]
    .filter(Boolean)
    .join("\n");

  const html = `
  <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#f5f5f5;padding:32px">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.04)">
      <div style="background:#0a0a0a;color:#c9a961;padding:24px 32px;font-size:14px;letter-spacing:4px;text-transform:uppercase">New Enquiry</div>
      <div style="padding:32px">
        <h1 style="margin:0 0 24px;font-size:22px;color:#0a0a0a">${escapeHtml(name)}</h1>
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#333">
          <tr><td style="padding:6px 0;color:#888;width:80px">Email</td><td>${escapeHtml(email)}</td></tr>
          ${phone ? `<tr><td style="padding:6px 0;color:#888">Phone</td><td>${escapeHtml(phone)}</td></tr>` : ""}
        </table>
        <hr style="margin:24px 0;border:0;border-top:1px solid #eee">
        <div style="font-size:15px;line-height:1.6;color:#111;white-space:pre-wrap">${escapeHtml(message)}</div>
      </div>
    </div>
  </div>`;

  return { subject, html, text };
}

export function renderContactConfirmation(input: ContactInput, brandName = "Our Team"): { subject: string; html: string; text: string } {
  const subject = `We received your message`;
  const text = `Hi ${input.name},\n\nThanks for reaching out. We received your message and will get back within 24 hours.\n\n— ${brandName}`;
  const html = `
  <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#f5f5f5;padding:32px">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden">
      <div style="background:#0a0a0a;color:#c9a961;padding:24px 32px;font-size:14px;letter-spacing:4px;text-transform:uppercase">${escapeHtml(brandName)}</div>
      <div style="padding:32px;color:#111">
        <p style="margin:0 0 16px">Hi ${escapeHtml(input.name)},</p>
        <p style="margin:0 0 16px">Thanks for reaching out. We received your message and will get back within 24 hours.</p>
        <p style="margin:0;color:#888;font-size:13px">This is an automated confirmation, no reply needed.</p>
      </div>
    </div>
  </div>`;
  return { subject, html, text };
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
