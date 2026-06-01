<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Factories\ClinicFactory;

class ClinicSeeder extends Seeder
{
    public function run(): void
    {
        ClinicFactory::new()->createMany(10);

        $this->command->info('Clinics seeded successfully!');
    }
}