<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $adminUser = new User();
        $adminUser->name = 'admin';
        $adminUser->email = 'admin@example.com';
        $adminUser->password = bcrypt('password');
        $adminUser->email_verified_at = now();
        $adminUser->is_admin = true;
        $adminUser->save();
    }
}
