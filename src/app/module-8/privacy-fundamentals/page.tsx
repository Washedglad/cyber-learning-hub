'use client';

import { modules } from '@/data/curriculum';
import ContentPage from '@/components/ContentPage';

export default function PrivacyFundamentalsPage() {
  const currentModule = modules[7];
  const page = currentModule.pages[0];
  const nextPage = currentModule.pages[1];

  return (
    <ContentPage
      module={currentModule}
      page={page}
      nextPage={nextPage}
    />
  );
}

