<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
    Schema::create('patients', function (Blueprint $table) {
        $table->id();
        $table->string('full_name');
        $table->string('id_number')->unique();
        $table->string('email')->unique();
        $table->string('street_name');
        $table->string('city');
        $table->string('zip_code');
        $table->string('jpmg_number');
        $table->text('notes')->nullable();
        $table->string('doctor_name');
        $table->integer('treatment_duration'); // You can change the type based on your requirement
        $table->timestamps();
        });
    }

};
