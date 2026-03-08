'use client';

import type { OdontogramProps } from './types';
import { UPPER_ROW, LOWER_ROW } from './constants';
import { ToothRow } from './ToothRow';

export function OdontogramBoard({ data, onChange, readOnly }: OdontogramProps) {
  return (
    <div className="inline-flex flex-col items-center gap-2 rounded-2xl bg-slate-950 p-6">
      <ToothRow
        toothIds={UPPER_ROW}
        data={data}
        onChange={onChange}
        isUpper={true}
        readOnly={readOnly}
      />

      <div className="w-full border-t border-slate-800" />

      <ToothRow
        toothIds={LOWER_ROW}
        data={data}
        onChange={onChange}
        isUpper={false}
        readOnly={readOnly}
      />
    </div>
  );
}
