import { modules } from '@/data/curriculum';
import ContentPage from '@/components/ContentPage';

export default function DataProtectionPage() {
  const currentModule = modules[3];
  const page = currentModule.pages[1];
  const prevPage = currentModule.pages[0];

  return (
    <ContentPage
      module={currentModule}
      page={page}
      prevPage={prevPage}
    />
  );
}

