<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Factories\ProviderFactory;
use Lightit\Providers\Domain\Models\Specialty;
use Lightit\Clinics\Domain\Models\Clinic;



class ProviderSeeder extends Seeder
{
    public function run(): void
    {

    $specialties = Specialty::all();
    $clinics = Clinic::all();

    foreach (range(1, 50) as $i) {
        ProviderFactory::new()
            ->withSpecialty($specialties->random())
            ->withClinics($clinics->random(fake()->numberBetween(1, 5)))
            ->create();
    }

        $this->command->info('Providers seeded successfully with clinic associations!');
    }
}