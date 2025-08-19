<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition(): array
    {
        $maleImage   = "https://mizgqxjgunjoxzgmssso.supabase.co/storage/v1/object/sign/avatars/man.png?token=...";
        $femaleImage = "https://mizgqxjgunjoxzgmssso.supabase.co/storage/v1/object/sign/avatars/woman.png?token=...";

        $genderId = fake()->numberBetween(1, 2);

        return [
            'name'          => fake()->name(),
            'email'         => fake()->unique()->safeEmail(),
            'password'      => Hash::make('user1234'),
            'username'      => fake()->unique()->userName(),
            'gender_id'     => $genderId,
            'profile_image' => $genderId === 1 ? $maleImage : $femaleImage,
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (User $user) {
            // Uveri se da role postoje (guard 'web' po difoltu)
            Role::findOrCreate('student', 'web');
            Role::findOrCreate('teacher', 'web');

            $role = fake()->randomElement(['student', 'teacher']);
            $user->assignRole($role);
        });
    }

    // Stati za eksplicitnu dodelu role
    public function student(): static
    {
        return $this->afterCreating(function (User $user) {
            Role::findOrCreate('student', 'web');
            $user->syncRoles(['student']);
        });
    }

    public function teacher(): static
    {
        return $this->afterCreating(function (User $user) {
            Role::findOrCreate('teacher', 'web');
            $user->syncRoles(['teacher']);
        });
    }

    public function unverified(): static
    {
        return $this->state(fn () => ['email_verified_at' => null]);
    }
}
