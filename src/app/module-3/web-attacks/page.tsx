import { modules } from '@/data/curriculum';
import ContentPage from '@/components/ContentPage';

export default function WebAttacksPage() {
  const currentModule = modules[2];
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

