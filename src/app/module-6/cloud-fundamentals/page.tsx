'use client';

import { modules } from '@/data/curriculum';
import ContentPage from '@/components/ContentPage';

export default function CloudFundamentalsPage() {
  const currentModule = modules[5];
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

