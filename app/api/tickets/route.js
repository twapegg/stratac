import { NextResponse } from "next/server";
import tickets from "@/data/tickets";

// GET /api/admin
export async function GET() {
  return NextResponse.json({ tickets });
}
