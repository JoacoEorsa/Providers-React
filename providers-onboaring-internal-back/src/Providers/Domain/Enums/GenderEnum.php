<?php

declare(strict_types=1);

namespace Lightit\Providers\Domain\Enums;

enum GenderEnum: string
{
    case Male = 'male';
    case Female = 'female';
    case Other = 'other';

    /**
     * @return array<int, string>
     */
    public static function values(): array
    {
        return array_map(fn (self $case) => $case->value, self::cases());
    }

    public static function tryFromValue(mixed $value): self|null
    {
        if ($value === null || ! is_string($value)) {
            return null;
        }
        
        return self::tryFrom($value);
    }
}
