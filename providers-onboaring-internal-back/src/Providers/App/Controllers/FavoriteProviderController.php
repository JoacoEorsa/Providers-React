<?php

declare(strict_types=1);

namespace Lightit\Providers\App\Controllers;

use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Http\JsonResponse;
use Lightit\Providers\App\Requests\FavoriteProviderRequest;
use Lightit\Providers\App\Resources\ProviderResource;
use Lightit\Providers\Domain\Actions\FavoriteProviderAction;
use Lightit\Providers\Domain\Models\Provider;
use Lightit\Users\Domain\Models\User;

class FavoriteProviderController
{
    public function __invoke(
        FavoriteProviderRequest $request,
        FavoriteProviderAction $action,
        Provider $provider,
        #[CurrentUser]
        User $user,
    ): JsonResponse {
        $favorited = $request->getFavorited();

        $action->execute($user, $provider, $favorited);

        $provider->setAttribute('is_favorited', $favorited);

        return ProviderResource::make($provider)
            ->response()
            ->setStatusCode(JsonResponse::HTTP_OK);
    }
}
