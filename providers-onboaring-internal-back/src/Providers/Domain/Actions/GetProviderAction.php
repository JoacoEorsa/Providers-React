<?php

declare(strict_types=1);

namespace Lightit\Providers\Domain\Actions;

use Lightit\Providers\Domain\Models\Provider;

class GetProviderAction
{
    public function execute(Provider $provider): Provider
    {
        return $provider->loadMissing(['specialty', 'clinics']);
    }
}
