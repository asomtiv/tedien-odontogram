'use client';

import { useState } from 'react';
import { OdontogramBoard, type OdontogramData } from '@/components/odontogram';

export default function Home() {
  const [data, setData] = useState<OdontogramData>({
    teeth: {},
    prostheses: [],
  });

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-8">
      <OdontogramBoard data={data} onChange={setData} />
    </main>
  );
}
