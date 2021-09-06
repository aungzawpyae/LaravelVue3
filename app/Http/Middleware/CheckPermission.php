<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckPermission
{
    public function handle($request, Closure $next, $permission)
    {
        if ( Auth::user()->role_id == 1 || Auth::user()->canAccess($permission)) {
            return $next($request);
        }
        return response_error('You don\'t have permission!', 403);
    }
}
