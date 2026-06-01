<?php

declare(strict_types=1);

namespace Lightit\Authentication\App\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Lightit\Authentication\Domain\DataTransferObjects\SignupInputDto;

final class SignupRequest extends FormRequest
{
    public const NAME = 'name';

    public const EMAIL = 'email';

    public const PASSWORD = 'password';

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            self::NAME     => ['required', 'string', 'max:255'],
            self::EMAIL    => ['required', 'string', Rule::email(), 'max:255', Rule::unique('users', 'email')],
            self::PASSWORD => ['required', 'string', Password::min(8)->letters()->mixedCase()->numbers(), 'confirmed'],
        ];
    }

    public function toDto(): SignupInputDto
    {
        return new SignupInputDto(
            name: (string) $this->string(self::NAME),
            email: (string) $this->string(self::EMAIL),
            password: (string) $this->string(self::PASSWORD),
        );
    }
}
