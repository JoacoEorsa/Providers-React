<?php

declare(strict_types=1);

namespace Lightit\Providers\App\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FavoriteProviderRequest extends FormRequest
{
    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'favorited' => ['required', 'boolean'],
        ];
    }

    public function getFavorited(): bool
    {
        return $this->boolean('favorited');
    }
}
