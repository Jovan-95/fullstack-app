<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Http\Requests\EditUserRequest;
use App\Http\Requests\EditUserImageRequest;
use App\Http\Requests\UsersSreachRequest;
use Illuminate\Support\Facades\Storage;


class UserController extends Controller
{
public function getUsers(UsersSreachRequest $request)
{
    
$search = $request->input('users_search');

    $users = User::with([
            'gender:id,name',
            'roles:id,name' 
        ])
        ->whereDoesntHave('roles', fn ($q) => $q->where('name', 'admin'))
        ->when($search, function ($query, $search) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
                  });
        })
        ->paginate(10);

   

    return response()->json($users);
}
/////////////////////////////////////////////////////////////////////////////////////////////////
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

/////////////////////////////////////////////////////////////////////////////////////////////////



public function updateAvatar(EditUserImageRequest $request)
{
    $user = Auth::user();
if (!$request->hasFile('profile_image')) {
        return response()->json([
            'success' => false,
            'message' => 'No file uploaded. Field must be "profile_image" and payload must be multipart/form-data.',
            'errors'  => ['profile_image' => ['Image file is required.']],
        ], 422);
    }

   if ($user->profile_image && !str_contains($user->profile_image, 'supabase.co')) {
        $pathFromUrl = parse_url($user->profile_image, PHP_URL_PATH); 
        if ($pathFromUrl) {
            $previousPath = ltrim(str_replace('/storage/', '', $pathFromUrl), '/'); 
            if (Storage::disk('public')->exists($previousPath)) {
                Storage::disk('public')->delete($previousPath);
            }
        }
    }
$path = $request->file('profile_image')->store('profile_images', 'public');
    $publicUrl = asset(Storage::url($path));
    $user->profile_image = $publicUrl;
    $user->save();
return response()->json([
        'success' => true,
        'message' => 'Profile picture updated successfully.',
        'data'    => [
            'id'            => $user->id,
            'name'          => $user->name,
            'email'         => $user->email,
            'username'      => $user->username,
            'gender'        => $user->gender,
            'profile_image' => $user->profile_image,
            'roles'         => $user->getRoleNames(),
        ],
    ], 200);
}
public function deleteUser(User $user) {
    $user->delete();
    return response()->json(['message' => 'User deleted']);
}

}
