import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import type { AvailableRoutesId } from '@/config/router';
import { useSearchText } from '@/hooks';
import { SIZE } from '@/types/styles';

interface SearchTextInputProps {
  path: AvailableRoutesId;
}

export const SearchTextInput = ({ path }: SearchTextInputProps) => {
  const {
    actions: { setPaginatedSearchText },
    searchText,
  } = useSearchText(path);

  return (
    <Input
      className="max-w-sm"
      left={<Icons.Search />}
      onChange={(event) => {
        return setPaginatedSearchText(event.target.value);
      }}
      placeholder="Filter..."
      size={SIZE.SMALL}
      value={searchText ?? ''}
    />
  );
};
