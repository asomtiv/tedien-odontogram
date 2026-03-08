'use client';

import { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import type { FaceName, ToothProps } from './types';
import { STATUS_COLORS, getFacePolygons, isMesialRight } from './constants';
import { FacePopoverContent } from './FacePopoverContent';

const FACE_ORDER: FaceName[] = ['vestibular', 'lingual', 'mesial', 'distal', 'oclusal'];

export function Tooth({ toothId, faces, onChange, isUpper, readOnly }: ToothProps) {
  const [activeFace, setActiveFace] = useState<FaceName | null>(null);
  const polygons = getFacePolygons(isUpper, isMesialRight(toothId));

  return (
    <Popover.Root
      open={activeFace !== null}
      onOpenChange={(open) => {
        if (!open) setActiveFace(null);
      }}
    >
      <Popover.Anchor asChild>
        <svg
          viewBox="0 0 100 100"
          className="h-12 w-12 sm:h-14 sm:w-14"
        >
          {FACE_ORDER.map((face) => (
            <polygon
              key={face}
              points={polygons[face]}
              fill={STATUS_COLORS[faces[face]]}
              stroke="#334155"
              strokeWidth="1.5"
              className="cursor-pointer transition-all hover:brightness-90"
              onClick={() => {
                if (!readOnly) setActiveFace(face);
              }}
            />
          ))}
        </svg>
      </Popover.Anchor>

      <Popover.Portal>
        <Popover.Content
          side={isUpper ? 'bottom' : 'top'}
          sideOffset={6}
          collisionPadding={8}
          className="z-50 animate-in fade-in-0 zoom-in-95"
        >
          {activeFace && (
            <FacePopoverContent
              toothId={toothId}
              face={activeFace}
              currentStatus={faces[activeFace]}
              onSelect={(status) => {
                onChange(activeFace, status);
                setActiveFace(null);
              }}
            />
          )}
          <Popover.Arrow className="fill-slate-700" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
