<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Factories\SpecialtyFactory;

class SpecialtySeeder extends Seeder
{
    public const STANDARD_SPECIALTIES = [
        'Cardiology',
        'Dermatology',
        'Endocrinology',
        'Gastroenterology',
        'Neurology',
        'Oncology',
        'Orthopedics',
        'Pediatrics',
        'Psychiatry',
        'Radiology',
        'Surgery',
        'Urology',
        'Family Medicine',
        'Internal Medicine',
        'Obstetrics and Gynecology',
    ];

    public function run(): void
    {
        foreach (self::STANDARD_SPECIALTIES as $specialtyName) {
            SpecialtyFactory::new()->create(['name' => $specialtyName]);
        }

        $this->command->info('Standard specialties seeded successfully!');
    }
}