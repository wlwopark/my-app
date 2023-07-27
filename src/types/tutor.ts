export interface Tutor {
  id: string;
  name: string;
  avatar: string;
  university: string | null;
  major: string | null;
  confirmRate: number;
  tags?: string[];
}
