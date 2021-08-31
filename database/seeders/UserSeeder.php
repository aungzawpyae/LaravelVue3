<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'user_name' => 'admin',
            'name' => 'Admin',
            'email' => 'admin@gamil.com', 
            'password' => bcrypt('secret'),
            'phone' => '["09254390974"]',
            'role_id' => '1',
        ]);
    }
}
