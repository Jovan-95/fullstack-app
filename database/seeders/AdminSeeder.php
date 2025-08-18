<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    
    public function run(): void
    {
     $user=  User::create([
            'name' => 'Jovan Vuksanovic',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin123'),  
            'username'=>'Jovuk95',
            'profile_image'=>'https://mizgqxjgunjoxzgmssso.supabase.co/storage/v1/object/sign/avatars/man.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNWM3M2U5OC0zOGE5LTRlODItYWMyZS1iYmZiZDQzNjExYjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhdmF0YXJzL21hbi5wbmciLCJpYXQiOjE3NTU1MjA2NDIsImV4cCI6MTc4NzA1NjY0Mn0.wf-C0F4t0218bmjsev5D85po75eh7YB2jQ5xlmWhKS4',
            'gender_id'=>1

            ]);

       $user->assignRole('admin');
    }
}
