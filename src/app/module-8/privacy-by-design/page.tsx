'use client';

import { modules } from '@/data/curriculum';
import ContentPage from '@/components/ContentPage';

export default function PrivacyByDesignPage() {
  const currentModule = modules[7];
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

