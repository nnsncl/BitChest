<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'Jane Admin',
                'email' => 'admin@admin.com',
                'password' => Hash::make('admin'),
                'elevation' => 'admin',
                'balance' => 100,
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'John User',
                'email' => 'user@user.com',
                'password' => Hash::make('user'),
                'elevation' => 'user',
                'balance' => 100,
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
