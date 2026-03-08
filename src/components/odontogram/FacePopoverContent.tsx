'use client';

import type { FaceName, FaceStatus } from './types';
import { STATUS_COLORS, FACE_LABELS, STATUS_OPTIONS } from './constants';

interface FacePopoverContentProps {
  toothId: string;
  face: FaceName;
  currentStatus: FaceStatus;
  onSelect: (status: FaceStatus) => void;
}

export function FacePopoverContent({
  toothId,
  face,
  currentStatus,
  onSelect,
}: FacePopoverContentProps) {
  return (
    <div className="min-w-[160px] rounded-lg border border-slate-700 bg-slate-900 p-3 shadow-xl">
      <p className="mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wide">
        {toothId} &middot; {FACE_LABELS[face]}
      </p>
      <div className="flex flex-col gap-1">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={[
              'flex items-center gap-2 rounded px-2 py-1.5 text-sm text-slate-200',
              'transition-colors hover:bg-slate-800',
              currentStatus === opt.value
                ? 'bg-slate-800 ring-1 ring-slate-600'
                : '',
            ].join(' ')}
          >
            <span
              className="h-3 w-3 rounded-full border border-slate-600 shrink-0"
              style={{ backgroundColor: STATUS_COLORS[opt.value] }}
            />
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
