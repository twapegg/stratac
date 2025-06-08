import { NextResponse } from "next/server";
import tickets from "@/data/tickets";

// POST /api/complaint/file
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, category, tags, subject, description } = body;

    if (!name || !email || !category || !subject || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const ticket = {
      id: tickets.length + 1,
      name,
      email,
      category,
      tags: tags || [],
      subject,
      description,
      createdAt: new Date().toISOString(),
    };

    tickets.push(ticket);

    return NextResponse.json(
      { message: "Complaint filed successfully", ticket },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
