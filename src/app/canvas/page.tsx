import { Metadata } from 'next';
import { ArchitectureCanvas } from '@/components/canvas/ArchitectureCanvas';

export const metadata: Metadata = {
  title: 'Visual Cloud Architecture Estimator | ArchCost',
  description: 'Drag and drop AWS resources onto a canvas to instantly visualize your architecture and calculate real-time monthly costs.',
};

export default function CanvasPage() {
  return (
    <main className="w-full h-screen bg-[#0A0A0B] flex flex-col">
      <ArchitectureCanvas />
    </main>
  );
}
