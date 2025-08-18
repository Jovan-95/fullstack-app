<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gender extends Model
{
    use HasFactory;

    protected $table = 'genders';
    public $timestamps=false;

    protected  $fillable=['name'];

     public function users()
    {
        return $this->hasMany(User::class);
    }
}
