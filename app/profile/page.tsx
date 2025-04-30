// app/profile/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<{ name: string; email: string }>({ name: '', email: '' });
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('/api/profile', { credentials: 'include' });

      if (res.status === 401) {
        router.push('/login');
        return;
      }

      const data = await res.json();
      setUser(data);
      setUpdatedUser(data); // Set the initial form values
    };

    fetchProfile();
  }, [router]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    const res = await fetch('/api/profile', { // Changed to the correct API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });

    if (res.ok) {
      const updatedData = await res.json();
      setUser(updatedData);
      setEditing(false); // Exit editing mode
    } else {
      // Handle error (e.g., show error message)
      alert('Failed to save changes');
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Profile</h1>
      {editing ? (
        <div>
          <input
            type="text"
            value={updatedUser.name}
            onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
          />
          <input
            type="email"
            value={updatedUser.email}
            onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
          />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
    </div>
  );
}
