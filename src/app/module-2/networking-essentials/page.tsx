'use client';

import { modules } from '@/data/curriculum';
import ContentPage from '@/components/ContentPage';
import TerminalChallenge from '@/components/TerminalChallenge';
import PacketInspector from '@/components/PacketInspector';

export default function NetworkingEssentialsPage() {
  const currentModule = modules[1];
  const page = currentModule.pages[0];
  const nextPage = currentModule.pages[1];

  return (
    <ContentPage
      module={currentModule}
      page={page}
      nextPage={nextPage}
    >
      <PacketInspector />
      
      <TerminalChallenge
        title="Network Discovery Lab"
        objective="Use the ping command to test connectivity to google.com"
        hint="Try typing: ping google.com"
        successCommand="ping google.com"
        successMessage="Connection successful! You've verified network connectivity to google.com."
      />
    </ContentPage>
  );
}
