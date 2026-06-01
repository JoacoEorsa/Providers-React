<?php

declare(strict_types=1);

namespace Lightit\Providers\Domain\Actions;

use Lightit\Providers\Domain\Models\Provider;
use Lightit\Users\Domain\Models\User;

class FavoriteProviderAction
{
    public function execute(User $user, Provider $provider, bool $favorited): void
    {
        $relation = $user->favoriteProviders();
        $providerId = $provider->getKey();

        if ($favorited) {
            $relation->syncWithoutDetaching([$providerId]);
        } else {
            $relation->detach($providerId);
        }

        $provider->setAttribute('is_favorited', $favorited);

        $provider->loadMissing(['specialty', 'clinics']);
    }
}
