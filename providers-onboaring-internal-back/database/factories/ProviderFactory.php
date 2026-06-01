<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Lightit\Providers\Domain\Models\Provider;
use Lightit\Providers\Domain\Models\Specialty;
use Lightit\Providers\Domain\Enums\GenderEnum;

/**
 * @extends Factory<Provider>
 */
class ProviderFactory extends Factory
{
    protected $model = Provider::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->name();

        return [
            'name' => $name,
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'gender' => fake()->randomElement(GenderEnum::cases()),
            'about' => fake()->paragraph(3),
            'languages' => fake()->randomElements(
                ['English', 'Spanish', 'French', 'Mandarin', 'German', 'Portuguese', 'Italian', 'Arabic'],
                rand(1, 3)
            ),
            'profile_pic' => 'https://ui-avatars.com/api/?name=' . urlencode($name) . '&size=500&background=random',
            'specialty_id' => SpecialtyFactory::new(),
        ];
    }

    /**
     * Assign a specific specialty to the provider.
     *
     * @param Specialty|int $specialty Specialty model or ID
     */
    public function withSpecialty(Specialty|int $specialty): static
    {
        $specialtyId = $specialty instanceof Specialty ? $specialty->id : $specialty;

        return $this->state(fn (array $_attributes) => [
            'specialty_id' => $specialtyId,
        ]);
    }

    public function female(): static
    {
        return $this->state(fn (array $_attributes) => [
            'gender' => 'female',
        ]);
    }

    public function male(): static
    {
        return $this->state(fn (array $_attributes) => [
            'gender' => 'male',
        ]);
    }

    /**
     * @param \Illuminate\Support\Collection<int, \Lightit\Clinics\Domain\Models\Clinic>|null $clinics
     */
    public function withClinics(?\Illuminate\Support\Collection $clinics = null): static
    {
        return $this->afterCreating(function (Provider $provider) use ($clinics) {
            $clinicsToAttach = $clinics ?? collect([ClinicFactory::new()->create()]);
            $provider->clinics()->attach($clinicsToAttach);
        });
    }
}
