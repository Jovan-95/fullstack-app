<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginUserRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\RegisterUserRequest;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{

/////////////////////////////////////////////////////////////////////LOGIN
public function login(Request $request)
{
    if (Auth::attempt($request->only('email', 'password'))) {
        $user = Auth::user();

        if ($user) {
            return response()->json([
            'status' => true,
            'message' => 'Welcome ' . $user->name . ' ' . $user->last_name,
            'data' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'roles' => $user->getRoleNames()
        ],
            'auth_token' => $user->createToken('auth_token')->plainTextToken,
        ], 200);
        }
}
return response()->json([
        'message' => 'The provided credentials are incorrect.',
    ], 401);
}

/////////////////////////////////////////////////////////////////////LOGOUT
public function logout(){
Auth::user()->tokens()->delete();

    return response()->json([
        'Message' => 'The user has been successfully logged out'
    ], 200);

}

/////////////////////////////////////////////////////////////////////FORGOT PASSWORD
public function forgot(ForgotPasswordRequest $request)
{
    Password::sendResetLink($request->only('email'));
    
    return response()->json([
        'status' => 'If your email exists in our system, you will receive a reset link shortly.'
    ], 200);
}
/////////////////////////////////////////////////////////////////////RESET PASSWORD
public function reset(ResetPasswordRequest $request)
{
    $status = Password::reset(
        $request->only('email', 'password', 'token'),
        function ($user) use ($request) {
            $user->update([
                'password' => Hash::make($request->password),
            ]);
            $user->save();
        }
    );
if ($status === Password::PASSWORD_RESET) {
        return response()->json([
            'message' => 'Password reset successfully'
        ], 200);
    }

    return response()->json([
        'message' => 'Password reset failed',
        'error_code' => $status
    ], 422);
}


public function register(){
    
}


}
