'use client';

import { useState } from 'react';
import {
  OdontogramBoard,
  DEFAULT_FACES,
  type OdontogramData,
  type FaceName,
  type FaceStatus,
} from '@/components/odontogram';

export default function Home() {
  const [data, setData] = useState<OdontogramData>({});

  const handleChange = (toothId: string, face: FaceName, status: FaceStatus) => {
    setData((prev) => ({
      ...prev,
      [toothId]: {
        ...(prev[toothId] ?? DEFAULT_FACES),
        [face]: status,
      },
    }));
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-8">
      <OdontogramBoard data={data} onChange={handleChange} />
    </main>
  );
}
