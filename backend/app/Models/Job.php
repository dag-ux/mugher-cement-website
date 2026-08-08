<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'location',
        'type',
        'description',
        'is_active',
    ];

    public function applications()
    {
        return $this->hasMany(JobApplication::class);
    }
}