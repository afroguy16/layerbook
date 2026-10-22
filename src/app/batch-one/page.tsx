import type { Metadata } from "next";
import { IntakeRoot } from "@/components/intake/intake-root";

export const metadata: Metadata = {
  title: "LayerBook | Pilot intake",
  description: "Submit your farm for the first LayerBook batch.",
  robots: { index: false, follow: false },
};

export default function BatchOnePage() {
  return <IntakeRoot />;
}
