<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return User::find($id);
    }

    public function indexTransactions($id)
    {
        $user = User::find($id);

        return $user->transactions;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        $request->validate([
            "name" => "required",
            "email" => "required",
            "elevation" => "required",
        ]);

        $user->update($request->all());

        return [
            "user" => $user,
            "message" => "User updated"
        ];
    }

    public function updateCurrentUser(Request $request, $id)
    {
        $user = User::find($id);

        $request->validate([
            'name' => 'string',
            'email' => 'string',
            'password' => 'string|confirmed'
        ]);

        if ($request['password']) {
            $user->update($request->all());

            $user->password = Hash::make($user->password);

            $user->save;
        }

        $user->update([
            'name' => $request['name'],
            'email' => $request['email'],
        ]);

        $user->save;

        return [
            "message" => "User updated",
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);

        $user->transactions()->delete();

        $user->delete();

        return [
            "message" => "User deleted",
        ];
    }
}
