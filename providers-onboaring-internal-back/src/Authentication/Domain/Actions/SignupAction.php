<?php

declare(strict_types=1);

namespace Lightit\Authentication\Domain\Actions;

use Illuminate\Support\Facades\Hash;
use Lightit\Authentication\Domain\DataTransferObjects\SignupInputDto;
use Lightit\Users\Domain\Models\User;

class SignupAction
{
    public function execute(SignupInputDto $data): void
    {
        $user = new User();
        $user->name = $data->name;
        $user->email = $data->email;
        $user->password = Hash::make($data->password);
        $user->saveOrFail();
    }
}
