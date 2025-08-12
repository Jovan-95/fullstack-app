<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginUserRequest;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
public function login(LoginUserRequest $request)
{
    if (Auth::attempt($request->only('email', 'password'))) {
        $user = Auth::user();

        if ($user) {
            return response()->json([
            'status' => true,
            'message' => 'Welcome ' . $user->name . ' ' . $user->last_name,
            'data' => $user,
            'auth_token' => $user->createToken('auth_token')->plainTextToken,
        ], 200);
        }
}
return response()->json([
        'message' => 'The provided credentials are incorrect.',
    ], 401);
}


public function logout(){
Auth::user()->currentAccessToken()->delete();

    return response()->json([
        'Message' => 'The user has been successfully logged out'
    ], 200);

}


}
