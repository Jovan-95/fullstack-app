<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Gender;

class GenderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $list = ['male', 'female'];

         foreach ($list as $a) {
        
            Gender::create([
            'name' => $a
        ]);
    }
    }
}
