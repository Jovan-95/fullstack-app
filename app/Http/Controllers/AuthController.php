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
public function login(LoginUserRequest $request)
{
    if (Auth::attempt($request->only('email', 'password'))) {
        $user = Auth::user();

        if ($user) {

             $user->load('gender');
            return response()->json([
            'status' => true,
            'message' => 'Welcome ' . $user->name . ' ' . $user->last_name,
            'data' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'profile_image' => $user->profile_image,
            'username' => $user->username,
           'gender' => $user->gender,
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
/////////////////////////////////////////////////////////////////////REGISTER USER

public function register(RegisterUserRequest $request)
{
    $maleImage   = "https://mizgqxjgunjoxzgmssso.supabase.co/storage/v1/object/sign/avatars/man.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNWM3M2U5OC0zOGE5LTRlODItYWMyZS1iYmZiZDQzNjExYjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhdmF0YXJzL21hbi5wbmciLCJpYXQiOjE3NTU1MjA2NDIsImV4cCI6MTc4NzA1NjY0Mn0.wf-C0F4t0218bmjsev5D85po75eh7YB2jQ5xlmWhKS4";
    $femaleImage = "https://mizgqxjgunjoxzgmssso.supabase.co/storage/v1/object/sign/avatars/woman.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNWM3M2U5OC0zOGE5LTRlODItYWMyZS1iYmZiZDQzNjExYjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhdmF0YXJzL3dvbWFuLnBuZyIsImlhdCI6MTc1NTUyMzUyNiwiZXhwIjoxNzg3MDU5NTI2fQ.T2CDmfDKYTxx3iGMa8leYfLR9QEExGLBpNtV7U-_8FA";

    $profileImage = match ((int) $request->gender_id) {
        1 => $maleImage,
        2 => $femaleImage,
        default => null,
    };

    $user = User::create([
        'name'          => $request->name,
        'email'         => $request->email,
        'username'      => $request->username,
        'gender_id'     => $request->gender_id,
        'password'      => Hash::make($request->password),
        'profile_image' => $profileImage,
    ]);

    $user->assignRole('student');
    $user->load('gender');

    return response()->json([
        'status'  => true,
        'message' => 'User registered successfully',
        'data'    => [
            'id'            => $user->id,
            'name'          => $user->name,
            'email'         => $user->email,
            'username'      => $user->username,
            'gender'        => $user->gender,
            'profile_image' => $user->profile_image,
            'roles'         => $user->getRoleNames(),
        ],
        
    ], 201);
}


}
