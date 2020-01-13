<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TodoController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Request $request)
    {
        $todos = Auth::user()->todos();
        $validation = Validator::make($request->all(), [
            'completed' => 'boolean|required'
        ]);
        if ($validation->fails()) {
            abort(403, 'Completed Should be Boolean');
        }
        $completed = $request->completed;
        $todos->where('completed', $completed);
        $todos->orderBy('created_at', 'desc');
        $todoList = $todos->get();
        return response()->json($todoList);
    }

    public function create()
    {
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'task' => 'required'
        ]);
        if ($validation->fails()) {
            abort(403, 'Task Message is Mandatory');
        }
        $todoItem = $request->all(['task']);
        $todo = Auth::user()->todos()->create($todoItem);
        return response()->json($todo);
    }

    public function show($id)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $validation = Validator::make($request->all(), [
            'task' => 'string',
            'completed' => 'boolean'
        ]);
        if ($validation->fails()) {
            abort(403, 'Task Should be string and Completed Boolean');
        }
        $todoItem = $request->all(['completed']);
        $status = Auth::user()->todos()->where('id', $id)->update($todoItem);
        return response()->json(['status' => true]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
