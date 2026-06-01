<?php

declare(strict_types=1);

namespace Lightit\Providers\App\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Lightit\Clinics\App\Resources\ClinicResource;
use Lightit\Providers\Domain\Models\Provider;
// use Lightit\Users\Domain\Models\User;

/**
 * @mixin Provider
 */
class ProviderResource extends JsonResource
{
    /**
     * NOTE: $request->user() lookup and is_favorited field were temporarily
     * removed for the front-end onboarding challenge. Restore when
     * authentication is implemented.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'gender' => $this->gender,
            'about' => $this->about,
            'languages' => $this->languages,
            'profile_pic' => $this->profile_pic,

            'specialty' => SpecialtyResource::make($this->whenLoaded('specialty')),
            'clinics' => ClinicResource::collection($this->whenLoaded('clinics')),

            // 'is_favorited' => $this->resource->isFavoritedBy($request->user()),
        ];
    }
}
