"use client";

import React, { useEffect, useState } from "react";
import { MobileIntake } from "./mobile-intake";
import { DesktopIntake } from "./desktop-intake";

const DESKTOP_QUERY = "(min-width: 1024px)";

export function IntakeRoot() {
  // Defaults to mobile so a phone gets the right tree on the first frame.
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return isDesktop ? <DesktopIntake /> : <MobileIntake />;
}
