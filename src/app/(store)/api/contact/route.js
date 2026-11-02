import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const apiBase = (process.env.NEXT_PUBLIC_VASTU_API_URL || "http://localhost:3001").replace(/\/$/, "");
    const res = await fetch(`${apiBase}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Unable to process contact enquiry." },
      { status: 500 }
    );
  }
}
