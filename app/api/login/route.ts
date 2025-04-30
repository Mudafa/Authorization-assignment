import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { users } from '@/lib/users';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });

  res.cookies.set('auth', 'valid-session', {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60, // 1 hour
  });

  return res;
}
