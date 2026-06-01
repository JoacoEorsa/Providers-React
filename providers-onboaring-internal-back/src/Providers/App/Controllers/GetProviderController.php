<?php

declare(strict_types=1);

namespace Lightit\Providers\App\Controllers;

use Illuminate\Http\JsonResponse;
use Lightit\Providers\App\Resources\ProviderResource;
use Lightit\Providers\Domain\Actions\GetProviderAction;
use Lightit\Providers\Domain\Models\Provider;

final class GetProviderController
{
    public function __invoke(
        GetProviderAction $action,
        Provider $provider,
    ): JsonResponse {
        $provider = $action->execute($provider);

        return ProviderResource::make($provider)
            ->response();
    }
}
