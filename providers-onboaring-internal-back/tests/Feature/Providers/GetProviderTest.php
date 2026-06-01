<?php

declare(strict_types=1);

namespace Tests\Feature\Providers;

use Database\Factories\ClinicFactory;
use Database\Factories\ProviderFactory;
use Database\Factories\SpecialtyFactory;
use Database\Factories\UserFactory;
use Illuminate\Http\JsonResponse;
use Illuminate\Testing\Fluent\AssertableJson;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\getJson;

beforeEach(function (): void {
    $user = UserFactory::new()->createOne([
        'password' => '>e$pV4chNFcJoAB%X#{',
    ]);

    actingAs($user);
});

describe('providers show', function (): void {
    it('retrieves a single provider successfully (explicit JSON shape)', function (): void {
        $specialty = SpecialtyFactory::new()->createOne();
        $clinicA = ClinicFactory::new()->createOne();
        $clinicB = ClinicFactory::new()->createOne();

        $provider = ProviderFactory::new()
            ->withSpecialty($specialty)
            ->withClinics(collect([$clinicA, $clinicB]))
            ->createOne();

        $provider->loadMissing(['specialty', 'clinics']);

        getJson("/api/providers/{$provider->id}")
            ->assertOk()
            ->assertJson(
                fn (AssertableJson $json): AssertableJson =>
                $json->has(
                    'data',
                    fn (AssertableJson $data): AssertableJson =>
                    $data
                        ->where('id', $provider->id)
                        ->where('name', $provider->name)
                        ->where('email', $provider->email)
                        ->where('phone', $provider->phone)
                        ->where('gender', $provider->gender)
                        ->where('about', $provider->about)
                        ->where('languages', $provider->languages)
                        ->where('is_favorited', false)
                        ->whereType('profile_pic', 'string')

                        ->has(
                            'specialty',
                            fn (AssertableJson $spec): AssertableJson =>
                            $spec
                                ->where('id', $specialty->id)
                                ->where('name', $specialty->name)
                        )

                        ->has('clinics', 2)
                        ->has(
                            'clinics.0',
                            fn (AssertableJson $clinic): AssertableJson =>
                            $clinic->where('id', $clinicA->id)
                              ->where('name', $clinicA->name)
                              ->where('address', $clinicA->address)
                              ->where('city', $clinicA->city)
                              ->where('state', $clinicA->state)
                              ->where('zip_code', $clinicA->zip_code)
                              ->where('phone', $clinicA->phone)
                        )
                        ->has(
                            'clinics.1',
                            fn (AssertableJson $clinic): AssertableJson =>
                            $clinic->where('id', $clinicB->id)
                              ->where('name', $clinicB->name)
                              ->where('address', $clinicB->address)
                              ->where('city', $clinicB->city)
                              ->where('state', $clinicB->state)
                              ->where('zip_code', $clinicB->zip_code)
                              ->where('phone', $clinicB->phone)
                        )
                )
            );
    });

    it('returns 404 when provider not found', function (): void {
        getJson('/api/providers/999999')
            ->assertStatus(JsonResponse::HTTP_NOT_FOUND);
    });
});
