<?php

declare(strict_types=1);

namespace Tests\Feature\Providers;

use Database\Factories\ProviderFactory;
use Database\Factories\UserFactory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Testing\Fluent\AssertableJson;
use Lightit\Users\Domain\Models\User;


use function Pest\Laravel\actingAs;
use function Pest\Laravel\patchJson;

beforeEach(function (): void {
    $user = UserFactory::new()->createOne([
        'password' => '>e$pV4chNFcJoAB%X#{',
    ]);

    actingAs($user);
});


describe('favorite provider', function (): void {
    it('favorites a provider (sets is_favorited=true and creates pivot)', function (): void {
        /** @var User $user */
        $user = Auth::user();
        $provider = ProviderFactory::new()->createOne();

        patchJson("/api/providers/{$provider->id}/favorite", [
            'favorited' => true,
        ])
            ->assertOk()
            ->assertJson(
                fn (AssertableJson $json): AssertableJson =>
                $json->has(
                    'data',
                    fn (AssertableJson $data): AssertableJson =>
                    $data
                        ->where('id', $provider->id)
                        ->where('is_favorited', true)
                        ->etc()
                )
            );

        expect(
            $user->favoriteProviders()->whereKey($provider->id)->exists()
        )->toBeTrue();
    });

    it('unfavorites a provider', function (): void {
        /** @var User $user */
        $user = Auth::user();
        $provider = ProviderFactory::new()->createOne();

        $user->favoriteProviders()->syncWithoutDetaching([$provider->id]);

        patchJson("/api/providers/{$provider->id}/favorite", [
            'favorited' => false,
        ])
            ->assertOk()
            ->assertJson(
                fn (AssertableJson $json): AssertableJson =>
                $json->has(
                    'data',
                    fn (AssertableJson $data): AssertableJson =>
                    $data
                        ->where('id', $provider->id)
                        ->where('is_favorited', false)
                        ->etc()
                )
            );

        expect(
            $user->favoriteProviders()->whereKey($provider->id)->exists()
        )->toBeFalse();
    });

    it('validates the payload (missing favorited => 422)', function (): void {
        $provider = ProviderFactory::new()->createOne();

        patchJson("/api/providers/{$provider->id}/favorite", [])
            ->assertUnprocessable();
    });
});
