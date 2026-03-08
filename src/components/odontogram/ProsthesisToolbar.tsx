'use client';

interface ProsthesisToolbarProps {
  isActive: boolean;
  onToggle: () => void;
  selectedCount: number;
  onCreate: () => void;
  onCancel: () => void;
  readOnly?: boolean;
}

export function ProsthesisToolbar({
  isActive,
  onToggle,
  selectedCount,
  onCreate,
  onCancel,
  readOnly,
}: ProsthesisToolbarProps) {
  if (readOnly) return null;

  return (
    <div className="mb-3 flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2">
      <button
        onClick={onToggle}
        className={[
          'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
          isActive
            ? 'bg-blue-600 text-white'
            : 'bg-slate-800 text-slate-300 hover:bg-slate-700',
        ].join(' ')}
      >
        Modo Prótesis
      </button>

      {isActive && (
        <>
          <span className="text-xs text-slate-400">
            {selectedCount === 0
              ? 'Selecciona los dientes'
              : `${selectedCount} diente${selectedCount > 1 ? 's' : ''}`}
          </span>

          <button
            onClick={onCreate}
            disabled={selectedCount < 2}
            className="ml-auto rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Crear Prótesis
          </button>

          <button
            onClick={onCancel}
            className="rounded-md bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-700"
          >
            Cancelar
          </button>
        </>
      )}
    </div>
  );
}
