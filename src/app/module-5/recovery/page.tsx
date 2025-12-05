'use client';

import { modules } from '@/data/curriculum';
import ContentPage from '@/components/ContentPage';

export default function RecoveryPage() {
  const currentModule = modules[4];
  const page = currentModule.pages[2];
  const prevPage = currentModule.pages[1];

  return (
    <ContentPage
      module={currentModule}
      page={page}
      prevPage={prevPage}
    />
  );
}

