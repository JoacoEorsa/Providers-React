<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Lightit\Clinics\Domain\Models\Clinic;

/**
 * @extends Factory<Clinic>
 */
class ClinicFactory extends Factory
{
    /**
     *
     * @var class-string<Clinic>
     */
    protected $model = Clinic::class;

    /**
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company() . ' Medical Center',
            'address' => fake()->streetAddress(),
            'city' => fake()->city(),
            // @phpstan-ignore method.notFound
            'state' => fake()->stateAbbr(),
            'zip_code' => fake()->postcode(),
            'phone' => fake()->phoneNumber(),
        ];
    }
}