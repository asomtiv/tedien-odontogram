export type FaceStatus = 'healthy' | 'decay' | 'restored' | 'absent';

export type FaceName = 'vestibular' | 'lingual' | 'mesial' | 'distal' | 'oclusal';

export type ToothFaces = Record<FaceName, FaceStatus>;

/** Keys are FDI tooth numbers as strings: "11", "12", ..., "48" */
export type OdontogramData = Record<string, ToothFaces>;

export interface OdontogramProps {
  data: OdontogramData;
  onChange: (toothId: string, face: FaceName, status: FaceStatus) => void;
  readOnly?: boolean;
}

export interface ToothProps {
  toothId: string;
  faces: ToothFaces;
  onChange: (face: FaceName, status: FaceStatus) => void;
  isUpper: boolean;
  readOnly?: boolean;
}
