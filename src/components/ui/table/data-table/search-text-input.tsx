import { Icons, Input } from "@/components/ui";
import type { AvailableRoutesId } from "@/config/router";
import { useSearchText } from "@/hooks";
import { useTranslation } from "@/i18n";
import { SIZE } from "@/types/styles";

type SearchTextInputProps = {
  path: AvailableRoutesId;
  placeholder?: string;
};

export const SearchTextInput = ({ path, placeholder }: SearchTextInputProps) => {
  const {
    actions: { setPaginatedSearchText },
    searchText,
  } = useSearchText(path);

  const { t } = useTranslation();

  return (
    <Input
      className="max-w-sm"
      left={<Icons.Search />}
      onChange={(event) => {
        return setPaginatedSearchText(event.target.value);
      }}
      placeholder={placeholder ?? t("common.filter")}
      size={SIZE.SMALL}
      value={searchText ?? ""}
    />
  );
};
