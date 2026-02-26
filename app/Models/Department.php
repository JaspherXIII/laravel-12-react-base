<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Searchable;

class Department extends Model
{
    use HasFactory, Searchable;

    protected $fillable = ['name'];

    protected function getSearchableConfig(): array
    {
        return [
            'fields' => ['name'],
            'relationships' => [], 
            'nested_relationships' => [], 
        ];
    }
}
