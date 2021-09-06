<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/**
 * Auth (Register | Login | Verify)
 */
Route::namespace('Api\Auth')->group(function () {
    Route::post('login', 'LoginController@login');
});


Route::group(['middleware' => 'auth:api', 'namespace' => 'Api'], function () {
    Route::get('users', 'UserController@list')->middleware('check.permission::staff-list');
    
});