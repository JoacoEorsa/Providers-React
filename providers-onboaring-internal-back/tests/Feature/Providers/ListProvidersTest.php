<?php

declare(strict_types=1);

namespace Tests\Feature\Providers;

use Database\Factories\ClinicFactory;
use Database\Factories\ProviderFactory;
use Database\Factories\UserFactory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Testing\Fluent\AssertableJson;
use Lightit\Users\Domain\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\getJson;

beforeEach(function (): void {
    $user = UserFactory::new()->createOne([
        'password' => '>e$pV4chNFcJoAB%X#{',
    ]);

    actingAs($user);
});

describe('providers list', function (): void {
    it('lists providers successfully', function (): void {
        $p1 = ProviderFactory::new()->createOne();

        getJson('/api/providers')
            ->assertOk()
            ->assertJson(
                fn (AssertableJson $json): AssertableJson =>
                $json->where('data.0.id', $p1->id)
                    ->etc()
            );
    });

    it('filters by gender (exact)', function (): void {
        $male = ProviderFactory::new()->male()->createOne();

        getJson('/api/providers?filter[gender]=male')
            ->assertOk()
            ->assertJson(
                fn (AssertableJson $json): AssertableJson =>
                $json->has('data', 1)
                     ->has('links')
                     ->has('meta')
                     ->where('data.0.id', $male->id)
            );
    });

    it('filters by clinic_id (scope)', function (): void {
        $clinicA = ClinicFactory::new()->createOne();

        $provA = ProviderFactory::new()->withClinics(collect([$clinicA]))->createOne();

        getJson('/api/providers?filter[clinic_id]=' . $clinicA->id)
            ->assertOk()
            ->assertJson(
                fn (AssertableJson $json): AssertableJson =>
                $json->has('data', 1)
                     ->has('links')
                     ->has('meta')
                     ->where('data.0.id', $provA->id)
            );
    });

    it('filters by favorited=true', function (): void {
        $fav = ProviderFactory::new()->createOne();

        /** @var User $user */
        $user = Auth::user();

        $user->favoriteProviders()->syncWithoutDetaching([$fav->getKey()]);

        getJson('/api/providers?filter[favorited]=1')
            ->assertOk()
            ->assertJson(
                fn (AssertableJson $json): AssertableJson =>
                $json->has('data', 1)
                     ->has('links')
                     ->has('meta')
                     ->where('data.0.id', $fav->id)
                     ->where('data.0.is_favorited', true)
            );
    });
});
