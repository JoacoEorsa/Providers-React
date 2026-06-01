<?php

declare(strict_types=1);

namespace Tests\Feature\Auth;

use Database\Factories\UserFactory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Testing\TestResponse;
use Lightit\Users\Domain\Models\User;

use function Pest\Laravel\postJson;

/**
 * @param array{
 *     name?: string,
 *     email?: string,
 *     password?: string,
 *     password_confirmation?: string
 * } $overrides
 *
 * @return array{
 *     name: string,
 *     email: string,
 *     password: string,
 *     password_confirmation: string
 * }
 */
function validSignupPayload(array $overrides = []): array
{
    $base = [
        'name'                  => 'Alice Example',
        'email'                 => 'alice@example.test',
        'password'              => 'Str0ngPass1',
        'password_confirmation' => 'Str0ngPass1',
    ];

    return array_replace($base, $overrides);
}

/**
 * @param TestResponse<JsonResponse> $response
 * @param non-empty-string           $field
 */
function expectValidationError(TestResponse $response, string $field, string|null $message = null): void
{
    $response
        ->assertStatus(JsonResponse::HTTP_UNPROCESSABLE_ENTITY)
        ->assertJsonPath('error.code', 'validation_failed');

    /** @var array<int, string>|null $messages */
    $messages = $response->json("error.fields.$field");

    if ($message !== null) {
        expect($messages)->toContain($message);
    } else {
        expect($messages)->not()->toBeEmpty();
    }
}

it('signs up successfully with 201 and no content; password is hashed', function (): void {
    $payload = validSignupPayload();

    $password = $payload['password'];

    $res = postJson('/api/auth/signup', $payload)
        ->assertStatus(Response::HTTP_CREATED);

    expect($res->getContent())->toBe('');

    $user = User::where('email', $payload['email'])->firstOrFail();
    expect($user->name)->toBe($payload['name']);
    expect($user->password)->not->toBe($payload['password']);
    expect(Hash::check($password, $user->password))->toBeTrue();
});

it('rejects duplicate email (422)', function (): void {
    UserFactory::new()->createOne(['email' => 'dupe@example.test']);

    $res = postJson('/api/auth/signup', validSignupPayload(['email' => 'dupe@example.test']));
    expectValidationError($res, 'email', 'The email has already been taken.');
});

it('rejects invalid email format (422)', function (): void {
    $res = postJson('/api/auth/signup', validSignupPayload(['email' => 'not-an-email']));
    expectValidationError($res, 'email');
});

it('rejects weak password per rules (422)', function (): void {
    $res = postJson('/api/auth/signup', validSignupPayload([
        'password'              => 'weakpass',
        'password_confirmation' => 'weakpass',
    ]));
    expectValidationError($res, 'password');
});

it('requires password confirmation (422)', function (): void {
    $payload = validSignupPayload();
    unset($payload['password_confirmation']);

    $res = postJson('/api/auth/signup', $payload);
    expectValidationError($res, 'password');
});

it('rejects mismatched confirmation (422)', function (): void {
    $res = postJson('/api/auth/signup', validSignupPayload([
        'password_confirmation' => 'Different123',
    ]));
    expectValidationError($res, 'password');
});

it('requires name (422)', function (): void {
    $payload = validSignupPayload();
    unset($payload['name']);

    $res = postJson('/api/auth/signup', $payload);
    expectValidationError($res, 'name');
});
