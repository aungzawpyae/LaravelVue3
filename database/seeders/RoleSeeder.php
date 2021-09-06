<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => ['en' => 'Super Admin', 'mm' => 'စူပါအက်ဒမင်'],
            'slug' => 'super-admin',
            'permissions' => [], 
            'level' => 1,
        ]);
    }
}
