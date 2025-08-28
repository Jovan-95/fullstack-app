<?php

namespace App\Http\Controllers;
use App\Models\User;use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Http\Requests\EditUserRequest;

class UserController extends Controller
{
public function getUsers()
{
    
    $users = User::with([
            'gender:id,name',
            'roles:id,name' 
        ])
        ->whereDoesntHave('roles', fn ($q) => $q->where('name', 'admin'))
        ->paginate(10);

   

    return response()->json($users);
}

 public function updateProfile(EditUserRequest $request)
    {
        $user = Auth::user(); 
        $data = $request->only(['name', 'username', 'gender_id', 'password']);
        $user->fill($data);
        $user->save();
       

        return response()->json([
            'success' => true,
            'message' => 'Profile successfully updated',
            'data'    => [
                    'id'            => $user->id,
                    'name'          => $user->name,
                    'email'         => $user->email,
                    'username'      => $user->username,
                    'gender'        => $user->gender,
                    'profile_image' => $user->profile_image,
                    'roles'         => $user->getRoleNames(),
        ]
        ], 200);
    }
}
