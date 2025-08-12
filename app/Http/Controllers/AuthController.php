<?php

namespace App\Http\Controllers;
use App\Models\User;

use Illuminate\Http\Request;

class AuthController extends Controller
{
   public function getAdmin()
    {
        
        $admin = User::where('is_admin', true)->first();

        if (!$admin) {
            return response()->json(['message' => 'Admin not found'], 404);
        }

        return response()->json($admin);
    }
}
