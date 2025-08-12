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
       User::create([
            'name' => 'Jovan Vuksanovic',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin123'),  
            'is_admin' => true,
        ]);
    }
}
