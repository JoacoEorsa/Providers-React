<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clinic_provider', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('provider_id')
                  ->constrained('providers')
                  ->cascadeOnDelete();
            
            $table->foreignId('clinic_id')
                  ->constrained('clinics')
                  ->cascadeOnDelete();
            
            $table->unique(['provider_id', 'clinic_id']);
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clinic_provider');
    }
};
