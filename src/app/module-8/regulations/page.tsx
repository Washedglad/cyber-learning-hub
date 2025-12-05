'use client';

import { modules } from '@/data/curriculum';
import ContentPage from '@/components/ContentPage';

export default function RegulationsPage() {
  const currentModule = modules[7];
  const page = currentModule.pages[1];
  const prevPage = currentModule.pages[0];
  const nextPage = currentModule.pages[2];

  return (
    <ContentPage
      module={currentModule}
      page={page}
      prevPage={prevPage}
      nextPage={nextPage}
    />
  );
}

