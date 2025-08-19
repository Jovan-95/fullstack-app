<?php

namespace App\Http\Controllers;
use App\Models\User;

use Illuminate\Http\Request;

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
}
