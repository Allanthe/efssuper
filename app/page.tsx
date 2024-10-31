// app/page.js
import { redirect } from 'next/navigation';

export default function Home() {
  // Assuming you want to redirect to the dashboard or login based on auth status
  const isAuthenticated = false; // Replace with your actual authentication check

  if (!isAuthenticated) {
    redirect('/login'); // Redirect to login if not authenticated
  }

  return (
    <div>
      <h2>Administration Dashboard</h2>
      {/* Dashboard content goes here */}
    </div>
  );
}
