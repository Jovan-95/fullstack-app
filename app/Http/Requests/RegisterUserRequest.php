<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'          => ['required','string','min:2','max:100'],
            'email'         => ['required','email:rfc,dns','max:255','unique:users,email'],
            'username'      => ['required','min:3','max:30','unique:users,username'],
            'password'      => ['required','string','min:8','confirmed'],
            'gender_id'     => ['required','integer','in:1,2','exists:genders,id'],
            'profile_image' => ['nullable','url','max:2048'],
        ];
    }

     public function messages(): array
    {
        return [
            'password.confirmed' => 'Password confirmation does not match.',
        ];
    }
}
