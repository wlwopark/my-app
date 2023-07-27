"use client";

import { useState } from "react";

export interface Tutor {
  id: string;
  name: string;
  avatar: string;
  university: string | null;
  major: string | null;
  confirmRate: number;
  tags?: string[];
}

export function useChangeTutor() {
  const [tutor, setTutor] = useState<Tutor | null>(null);

  return {
    tutor,
  };
}
