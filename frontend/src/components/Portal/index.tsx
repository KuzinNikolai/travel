"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const Portal = ({ children }: PropsWithChildren<{}>) => {
  const [_body, setBody] = useState<HTMLElement | null>(null)
  
  useEffect(() => {
    setBody(document.body)
  }, [])

  return _body && createPortal(children, _body, "portal-root");
}