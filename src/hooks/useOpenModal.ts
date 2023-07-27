"use client";

import { useState, useCallback } from "react";

export default function useOpenModal(init: boolean) {
  const [isOpen, setOpen] = useState(init);
  const closeModal = useCallback(() => setOpen(false), []);
  const openModal = useCallback(() => setOpen(true), []);

  return {
    isOpen,
    closeModal,
    openModal,
  };
}
