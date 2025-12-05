'use client';

import { modules } from '@/data/curriculum';
import ContentPage from '@/components/ContentPage';
import IncidentTimeline from '@/components/IncidentTimeline';

export default function IncidentTriagePage() {
  const currentModule = modules[4];
  const page = currentModule.pages[0];
  const nextPage = currentModule.pages[1];

  return (
    <ContentPage
      module={currentModule}
      page={page}
      nextPage={nextPage}
    >
      <IncidentTimeline />
    </ContentPage>
  );
}

