import { Metadata } from 'next';
import { PipelineCanvas } from '@/components/canvas/PipelineCanvas';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pipeline Canvas | WebToolsEasy — Chain Developer Tools Together',
  description: 'Drag and drop developer tools onto an interactive canvas to create custom data transformation pipelines. 100% client-side processing.',
};

export default function CanvasPage() {
  return (
    <main className="w-full h-screen bg-[#0A0A0B] flex flex-col">
      <PipelineCanvas />
    </main>
  );
}
