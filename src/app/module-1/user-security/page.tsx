import { modules } from '@/data/curriculum';
import ContentPage from '@/components/ContentPage';

export default function UserSecurityPage() {
  const module = modules[0];
  const page = module.pages[1];
  const prevPage = module.pages[0];

  return (
    <ContentPage
      module={module}
      page={page}
      prevPage={prevPage}
    />
  );
}

