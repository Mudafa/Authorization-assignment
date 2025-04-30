// app/api/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { users } from '@/lib/users'; 

export async function GET(req: NextRequest) {
  const auth = req.cookies.get('auth')?.value;

  if (auth !== 'valid-session') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = users[0]; 
  return NextResponse.json({ name: user.name, email: user.email });
}

export async function POST(req: NextRequest) {
  const auth = req.cookies.get('auth')?.value;

  if (auth !== 'valid-session') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, email } = await req.json();

  const userIndex = users.findIndex((user) => user.email === email);

  if (userIndex === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  users[userIndex] = { name, email, password: users[userIndex].password }; 
  
  return NextResponse.json({ name, email }); 
}
