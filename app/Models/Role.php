<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
	use SoftDeletes;
	
	protected $table = 'role';

	protected $fillable = ['name', 'slug', 'permissions', 'level'];

	protected $casts = [
        'name' => 'json',
        'permissions' => 'json',
    ];

    public function attachPermissions(array $permissions)
    {
        $this->permissions = $permissions;
        $this->save();

        return $this;
    }

    public function isRole($role)
    {
        return $this->slug === $role;
    }

    public function canAccess($permission)
    {
        return in_array($permission, $this->permissions);
    }

    public function canAccessPermissions(Array $permissions)
    {
        return count(array_intersect($permissions, $this->permissions)) > 0;
    }

    public function scopeOnlyUnderLevel($query, $level)
    {
        return $query->where('level', '>', $level);
    }
}