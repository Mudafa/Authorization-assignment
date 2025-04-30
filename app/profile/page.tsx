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
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '400px',
      }}>
        <h1 style={{ 
          textAlign: 'center',
          marginBottom: '1.5rem',
          color: '#333',
          fontSize: '1.8rem'
        }}>
          Profile
        </h1>

        {editing ? (
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
            <input
              type="text"
              value={updatedUser.name}
              onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
              style={{
                padding: '0.8rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
              placeholder="Name"
            />
            <input
              type="email"
              value={updatedUser.email}
              onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
              style={{
                padding: '0.8rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
              placeholder="Email"
            />
          </div>
        ) : (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ 
                margin: '0.5rem 0',
                color: '#666',
                fontSize: '1.1rem'
              }}>
                <span style={{ fontWeight: '600', color: '#333' }}>Name:</span> {user.name}
              </p>
              <p style={{ 
                margin: '0.5rem 0',
                color: '#666',
                fontSize: '1.1rem'
              }}>
                <span style={{ fontWeight: '600', color: '#333' }}>Email:</span> {user.email}
              </p>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div
            style={{
              backgroundColor: editing ? '#4CAF50' : '#f0f0f0',
              color: editing ? 'white' : '#333',
              padding: '0.8rem',
              borderRadius: '4px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontWeight: '500',
              border: 'none'
            }}
            onClick={editing ? handleSaveClick : handleEditClick}
            onMouseOver={(e) => !editing && (e.currentTarget.style.backgroundColor = '#e0e0e0')}
            onMouseOut={(e) => !editing && (e.currentTarget.style.backgroundColor = '#f0f0f0')}
          >
            {editing ? 'Save Changes' : 'Edit Profile'}
          </div>

          <div
            style={{
              backgroundColor: '#f0f0f0',
              color: '#333',
              padding: '0.8rem',
              borderRadius: '4px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontWeight: '500',
              border: 'none'
            }}
            onClick={handleLogout}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}
