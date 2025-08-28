<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditUserRequest extends FormRequest
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
           'name'          => ['sometimes','string','min:2','max:100'],
            'username'      => ['sometimes','min:3','max:30','unique:users,username'],
            'password'      => ['sometimes','string','min:8','confirmed'],
            'gender_id'     => ['sometimes','integer','in:1,2','exists:genders,id'],
        ];
    }
}
