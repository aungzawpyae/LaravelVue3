<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;

use App\Http\Resources\UserResource;
use App\Models\User;

class LoginController extends Controller
{

	public function login(Request $request)
	{
		$username = $request->input('username');
		$password = $request->input('password');

		$user = User::where('user_name', $username)->first();

		$platfrom = $request->header('platform', 'android');

		if (is_null($user) || ! Hash::check($password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => [trans('auth.failed')],
            ]);
        }

        $token = $user->createToken($platfrom)->plainTextToken;

        return response()->json([
        	'token' => $token,
            'user' 	=> new UserResource($user)
        ]); 
	}
}