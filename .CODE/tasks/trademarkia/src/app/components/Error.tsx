// app/dashboard/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="text-center text-red-500">
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()} className="mt-4 px-4 py-2 bg-red-600 text-white rounded">
        Try again
      </button>
    </div>
  );
}
