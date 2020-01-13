<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'api'], function () {
    Auth::routes();
});
/**
 * Serve Vue SPA Application
 * */
Route::get('/{any}', 'VueApplicationController@index')->where('any', '.*');
