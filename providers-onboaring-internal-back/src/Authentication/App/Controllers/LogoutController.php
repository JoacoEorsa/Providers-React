<?php

declare(strict_types=1);

namespace Lightit\Authentication\App\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Lightit\Authentication\Domain\Actions\LogoutAction;

class LogoutController
{
    public function __invoke(Request $request, LogoutAction $logoutAction): Response
    {
        $logoutAction->execute();

        return response()->noContent();
    }
}
