<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Permission extends Model
{
    use SoftDeletes;

    protected $table = 'permission';

    protected $fillable = ['name', 'slug', 'group'];

    protected $casts = [
        'name' => 'json',
    ];

    public static function getForRoleAttachment($slugs)
    {
        return static::whereIn('slug', $slugs)->get()->map(function ($item) {
            return $item->slug;
        })->toArray();
    }
}
