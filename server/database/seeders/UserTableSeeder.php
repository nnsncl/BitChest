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
                'name' => 'Sami',
                'email' => 'sami@sami.fr',
                'password' => Hash::make('admin'), // crypté le mot de passe
                'elevation' => 'admin',
                'balance' => 100,
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Nuni',
                'email' => 'nuni@nuni.fr',
                'password' => Hash::make('nuni'),
                'elevation' => 'user',
                'balance' => 100,
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
