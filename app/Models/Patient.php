<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable =
    [
        'full_name',
        'id_number',
        'email',
        'street_name',
        'city',
        'zip_code',
        'jpmg_number',
        'notes',
        'doctor_name',
        'treatment_duration',
    ];
}
