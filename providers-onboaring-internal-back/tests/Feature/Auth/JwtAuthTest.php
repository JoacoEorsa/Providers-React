<?php

declare(strict_types=1);

namespace Tests\Feature\Auth;

use Database\Factories\UserFactory;
use Illuminate\Http\JsonResponse;
use Illuminate\Testing\Fluent\AssertableJson;
use function Pest\Laravel\postJson;

describe('login', function (): void {
    /** @see LoginController */
    it('logs in a user and returns a successful response', function (): void {
        $password = '>e$pV4chNFcJoAB%X#{';
        $existingUser = UserFactory::new()->createOne([
            'password' => $password,
        ]);

        postJson('api/auth/login', [
            'email' => $existingUser->email,
            'password' => $password,
        ])
            ->assertStatus(JsonResponse::HTTP_OK)
            ->assertJson(
                fn (AssertableJson $json): AssertableJson =>
                    $json->has('data')
                         ->has('data.access_token')
                         ->has('data.token_type')
                         ->has('data.expires_in')
            );
    });

    it('returns a 401 response when user is unauthorized', function (): void {
        postJson('api/auth/login', [
            'email' => 'nonexistent@example.com',
            'password' => 'wrongpassword',
        ])
            ->assertStatus(JsonResponse::HTTP_UNAUTHORIZED);
    });
});

describe('logout', function (): void {
    it('logs out a user and returns a successful response', function (): void {
        $password = 'logoutPass123!';
        $user = UserFactory::new()->createOne([
            'password' => $password,
        ]);

        $response = postJson('api/auth/login', [
            'email' => $user->email,
            'password' => $password,
        ]);

        /** @var string $token */
        $token = $response->json('data.access_token');

        postJson('api/auth/logout', [], [
            'Authorization' => "Bearer {$token}",
        ])
            ->assertStatus(JsonResponse::HTTP_NO_CONTENT);
    });

    it('returns a 401 response when user is unauthorized', function (): void {
        $invalidToken = 'invalidToken';

        postJson('api/auth/logout', [], [
            'Authorization' => "Bearer {$invalidToken}",
        ])
            ->assertStatus(JsonResponse::HTTP_UNAUTHORIZED);
    });
});

describe('refresh', function (): void {
    it('refreshes the access token', function (): void {
        $password = 'refreshPass123!';
        $user = UserFactory::new()->createOne([
            'password' => $password,
        ]);

        $response = postJson('api/auth/login', [
            'email' => $user->email,
            'password' => $password,
        ]);

        /** @var string $token */
        $token = $response->json('data.access_token');

        postJson('/api/auth/refresh', [], [
            'Authorization' => "Bearer {$token}",
        ])->assertSuccessful()
            ->assertJsonStructure([
                'data' => [
                    'access_token',
                    'token_type',
                    'expires_in',
                ],
            ]);
    });
});
