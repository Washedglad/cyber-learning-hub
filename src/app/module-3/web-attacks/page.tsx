import { modules } from '@/data/curriculum';
import ContentPage from '@/components/ContentPage';

export default function WebAttacksPage() {
  const module = modules[2];
  const page = module.pages[0];
  const nextPage = module.pages[1];

  return (
    <ContentPage
      module={module}
      page={page}
      nextPage={nextPage}
    />
  );
}

