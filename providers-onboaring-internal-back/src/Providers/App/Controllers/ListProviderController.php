<?php

declare(strict_types=1);

namespace Lightit\Providers\App\Controllers;

// use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Http\JsonResponse;
use Lightit\Providers\App\Resources\ProviderResource;
use Lightit\Providers\Domain\Actions\ListProvidersAction;
// use Lightit\Users\Domain\Models\User;

class ListProviderController
{
    public function __invoke(
        ListProvidersAction $action,
        // #[CurrentUser]
        // User $user,
    ): JsonResponse {
        // NOTE: $user temporarily removed for the front-end onboarding
        // challenge. Restore when authentication is implemented.
        $providers = $action->execute();

        return ProviderResource::collection($providers)->response();
    }
}
