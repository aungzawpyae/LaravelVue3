<?php

namespace App\Http\Middleware;

use Closure;

class InternalServiceAuthenticate
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = $request->header('X-API-TOKEN');

        if ( ! $token || !in_array($token, config('api.auth.keys'))) {
            return response()->json(['message' => 'Invalid Api Key!'], 401);
        }

        return $next($request);
    }
}