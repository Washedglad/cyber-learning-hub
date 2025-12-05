import { modules } from '@/data/curriculum';
import ContentPage from '@/components/ContentPage';

export default function EncryptionConceptsPage() {
  const module = modules[3];
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

