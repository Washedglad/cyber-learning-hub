import { modules } from '@/data/curriculum';
import ContentPage from '@/components/ContentPage';

export default function NetworkingEssentialsPage() {
  const currentModule = modules[1];
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

