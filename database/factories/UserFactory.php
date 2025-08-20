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
        $maleImage   = "https://mizgqxjgunjoxzgmssso.supabase.co/storage/v1/object/sign/avatars/man.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNWM3M2U5OC0zOGE5LTRlODItYWMyZS1iYmZiZDQzNjExYjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhdmF0YXJzL21hbi5wbmciLCJpYXQiOjE3NTU1MjA2NDIsImV4cCI6MTc4NzA1NjY0Mn0.wf-C0F4t0218bmjsev5D85po75eh7YB2jQ5xlmWhKS4";
        $femaleImage = "https://mizgqxjgunjoxzgmssso.supabase.co/storage/v1/object/sign/avatars/woman.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNWM3M2U5OC0zOGE5LTRlODItYWMyZS1iYmZiZDQzNjExYjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhdmF0YXJzL3dvbWFuLnBuZyIsImlhdCI6MTc1NTUyMzUyNiwiZXhwIjoxNzg3MDU5NTI2fQ.T2CDmfDKYTxx3iGMa8leYfLR9QEExGLBpNtV7U-_8FA";

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
           
            Role::findOrCreate('student', 'web');
            Role::findOrCreate('teacher', 'web');

            $role = fake()->randomElement(['student', 'teacher']);
            $user->assignRole($role);
        });
    }

    
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
