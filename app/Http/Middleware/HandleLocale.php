<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class HandleLocale
{
    public function handle(Request $request, Closure $next)
    {
        $locale =
            $request->user()?->locale ??
            $request->cookie('locale') ??
            config('app.locale');

        app()->setLocale($locale);

        return $next($request);
    }
}
