<?php

declare(strict_types=1);

namespace Lightit\Authentication\Domain\DataTransferObjects;

final readonly class SignupInputDto
{
    public function __construct(
        public string $name,
        public string $email,
        public string $password,
    ) {
    }
}
