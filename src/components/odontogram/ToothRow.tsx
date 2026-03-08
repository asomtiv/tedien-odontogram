'use client';

import React from 'react';
import type { FaceName, FaceStatus, OdontogramData } from './types';
import { DEFAULT_FACES } from './constants';
import { Tooth } from './Tooth';

interface ToothRowProps {
  toothIds: string[];
  data: OdontogramData;
  onChange: (toothId: string, face: FaceName, status: FaceStatus) => void;
  isUpper: boolean;
  readOnly?: boolean;
}

export function ToothRow({ toothIds, data, onChange, isUpper, readOnly }: ToothRowProps) {
  return (
    <div className="flex items-end gap-0.5">
      {toothIds.map((id, i) => (
        <React.Fragment key={id}>
          {i === 8 && (
            <div className="mx-1 h-16 w-px self-center bg-slate-700" />
          )}
          <div className="flex flex-col items-center gap-0.5">
            {isUpper && (
              <span className="font-mono text-[10px] text-slate-500">{id}</span>
            )}
            <Tooth
              toothId={id}
              faces={data[id] ?? DEFAULT_FACES}
              onChange={(face, status) => onChange(id, face, status)}
              isUpper={isUpper}
              readOnly={readOnly}
            />
            {!isUpper && (
              <span className="font-mono text-[10px] text-slate-500">{id}</span>
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
