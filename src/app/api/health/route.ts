import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    framework: "Next.js 16 (App Router)",
    environment: process.env.NODE_ENV,
  });
}
