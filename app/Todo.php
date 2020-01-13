<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $table = 'todo';

    protected $hidden = [
        'created_by',
    ];

    protected $fillable = [
        'task', 'completed'
    ];
}
