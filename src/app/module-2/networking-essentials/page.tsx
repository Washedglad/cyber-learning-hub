import { modules } from '@/data/curriculum';
import ContentPage from '@/components/ContentPage';

export default function NetworkingEssentialsPage() {
  const module = modules[1];
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

