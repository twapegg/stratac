import { NextResponse } from "next/server";
import users from "@/data/users";

// POST /api/auth/login
export async function POST(request) {
  const { username, password } = await request.json();

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // You would set a cookie or session here in a real app

  // Redirect based on role
  if (user.role === "admin") {
    return NextResponse.json({ redirect: "/admin" });
  } else {
    return NextResponse.json({ redirect: "/" });
  }
}
