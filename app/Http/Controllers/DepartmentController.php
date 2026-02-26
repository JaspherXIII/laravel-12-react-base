<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    public function getDepartments(Request $request)
    {
        try {
            $perPage = $request->input('per_page', 10);
            $page = $request->input('page', 1);
            $search = $request->input('search', '');

            $query = Department::query()->orderByDesc('id');

            if (!empty($search)) {
                $query->search($search);
            }

            $total = $query->count();

            $departments = $query
                ->skip(($page - 1) * $perPage)
                ->take($perPage)
                ->get();

            $departments->transform(function ($department) {
                return [
                    'id' => $department->id,
                    'name' => $department->name,
                ];
            });

            $payload = [
                'data' => $departments,
                'recordsTotal' => $total,
                'recordsFiltered' => $total,
            ];

            return response()->json([
                'encoded' => base64_encode(json_encode($payload))
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function index()
    {
        return Inertia::render('dashboard/department');
    }

    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|string|max:255',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first(),
            ], 422);
        }

        $department = Department::updateOrCreate(
            ['id' => $request->department_id],
            ['name' => $request->name]
        );

        $message = $request->department_id 
            ? 'Department Updated Successfully!' 
            : 'Department Saved Successfully!';

        $payload = [
            'message' => $message,
            'department' => [
                'id' => $department->id,
                'name' => $department->name,
            ]
        ];

        return response()->json([
            'encoded' => base64_encode(json_encode($payload))
        ]);
    }

    public function edit(string $id)
    {
        $department = Department::findOrFail($id);

        $payload = [
            'id' => $department->id,
            'name' => $department->name,
        ];

        return response()->json([
            'encoded' => base64_encode(json_encode($payload))
        ]);
    }

    public function destroy(string $id)
    {
        $department = Department::findOrFail($id);
        $department->delete();

        $payload = [
            'message' => 'Department Deleted Successfully!',
            'deleted_id' => $id
        ];

        return response()->json([
            'encoded' => base64_encode(json_encode($payload))
        ]);
    }
}