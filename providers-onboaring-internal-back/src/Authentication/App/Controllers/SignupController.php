<?php

declare(strict_types=1);

namespace Lightit\Authentication\App\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Lightit\Authentication\App\Requests\SignupRequest;
use Lightit\Authentication\Domain\Actions\SignupAction;

final class SignupController
{
    public function __invoke(SignupRequest $request, SignupAction $action): Response
    {
        $action->execute($request->toDto());

        return response()->noContent(JsonResponse::HTTP_CREATED);
    }
}
