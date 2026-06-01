<?php

declare(strict_types=1);

namespace Database\Seeders;

use Database\Factories\UserFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        UserFactory::new()->createMany(35);
        UserFactory::new()->createOne([
            'email' => 'api.tester@example.com',
        ]);

        $this->call([
            SpecialtySeeder::class,
            ClinicSeeder::class,
            ProviderSeeder::class,
        ]);
    }
}
