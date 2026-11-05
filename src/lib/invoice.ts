import { formatDate, formatHour } from "@/lib/format";
import type { Booking } from "@/lib/types";

export async function downloadInvoice(booking: Booking) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const width = doc.internal.pageSize.getWidth();
  const margin = 48;
  const invoiceNo = `SS-${booking._id.slice(-8).toUpperCase()}`;

  // Header band
  doc.setFillColor(255, 176, 32);
  doc.rect(0, 0, width, 100, "F");
  doc.setTextColor(20, 20, 28);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.text("StudioSpace", margin, 56);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Creative Workspace Marketplace", margin, 76);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("INVOICE", width - margin, 56, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(invoiceNo, width - margin, 76, { align: "right" });

  const label = (text: string, x: number, yy: number) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(130, 130, 140);
    doc.text(text.toUpperCase(), x, yy);
  };
  const value = (text: string, x: number, yy: number) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(30, 30, 38);
    doc.text(text, x, yy);
  };

  // Billing details
  let y = 150;
  label("Billed to", margin, y);
  value(booking.userName, margin, y + 18);
  value(booking.userEmail, margin, y + 36);

  label("Issued on", width / 2, y);
  value(
    new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    width / 2,
    y + 18
  );
  label("Status", width / 2, y + 48);
  value(booking.status, width / 2, y + 66);

  // Studio details
  y += 110;
  label("Studio", margin, y);
  value(booking.studioTitle, margin, y + 18);
  label("Session", margin, y + 52);
  value(
    `${formatDate(booking.date)}, ${formatHour(booking.startHour)} to ${formatHour(booking.endHour)}`,
    margin,
    y + 70
  );

  // Table header
  y += 130;
  doc.setFillColor(240, 240, 244);
  doc.rect(margin, y, width - margin * 2, 28, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 70);
  doc.text("DESCRIPTION", margin + 12, y + 18);
  doc.text("AMOUNT", width - margin - 12, y + 18, { align: "right" });

  const rate = booking.hourlyRate;
  const deposit = booking.securityDeposit;
  const rows: [string, string][] =
    rate !== undefined && deposit !== undefined
      ? [
          [`Studio rental: ${booking.hours} hr x $${rate}`, `$${booking.hours * rate}`],
          ["Security deposit", `$${deposit}`],
        ]
      : [["Studio booking (rental and deposit)", `$${booking.totalPrice}`]];

  y += 28;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(30, 30, 38);
  rows.forEach(([desc, amount]) => {
    y += 30;
    doc.text(desc, margin + 12, y);
    doc.text(amount, width - margin - 12, y, { align: "right" });
    doc.setDrawColor(225, 225, 230);
    doc.line(margin, y + 12, width - margin, y + 12);
  });

  // Total
  y += 44;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(30, 30, 38);
  doc.text("Total", margin + 12, y);
  doc.setTextColor(200, 130, 0);
  doc.text(`$${booking.totalPrice}`, width - margin - 12, y, { align: "right" });

  // Footer
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(130, 130, 140);
  doc.text("Thank you for booking with StudioSpace.", margin, 780);
  doc.text("This invoice was generated automatically and is valid without a signature.", margin, 796);

  doc.save(`StudioSpace-Invoice-${invoiceNo}.pdf`);
}