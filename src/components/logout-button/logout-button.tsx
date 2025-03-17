import { useNavigate, useRouter } from '@tanstack/react-router';

import { Button, Dialog } from '@/components/ui';
import { useTranslation } from '@/i18n';
import { setAuthStoreToken } from '@/stores';

export const LogoutButton = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const navigate = useNavigate();

  const handleClick = () => {
    setAuthStoreToken(null);

    router.invalidate().finally(() => {
      navigate({ to: '/login' });
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>{t('logout.logOut')}</Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>{t('logout.areYouSureYouWantToLogout')}</Dialog.Title>
          <Dialog.Description>{t('logout.youWillLoseYourChanges')}</Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer className="flex items-center justify-end gap-2">
          <Dialog.Close asChild>
            <Button variant="outline">{t('common.no')}</Button>
          </Dialog.Close>
          <Button onClick={handleClick}>{t('common.yes')}</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};
