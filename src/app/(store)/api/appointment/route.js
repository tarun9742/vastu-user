import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const apiBase = (process.env.NEXT_PUBLIC_VASTU_API_URL || "http://localhost:3001").replace(/\/$/, "");

    const res = await fetch(`${apiBase}/api/appointments/initiate-payu`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await res.json().catch(() => ({}));
    if (!res.ok || !result.success) {
      return NextResponse.json(
        { message: result.error || result.message || "Failed to initiate appointment payment" },
        { status: res.status || 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Proxy appointment error:", error);
    return NextResponse.json(
      { message: "Unable to process booking at this time." },
      { status: 500 }
    );
  }
}
