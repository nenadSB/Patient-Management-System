<?php
namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function index()
    {
        return Patient::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'id_number' => 'required|string|max:255|unique:patients',
            'email' => 'required|email|unique:patients',
            'street_name' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'zip_code' => 'required|string|max:10',
            'jpmg_number' => 'required|string|max:255',
            'notes' => 'nullable|string',
            'doctor_name' => 'required|string|max:255',
            'treatment_duration' => 'required|integer',
        ]);

        $patient = Patient::create($request->all());
        return response()->json($patient, 201);
    }

    public function show($id)
    {
        return Patient::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'id_number' => 'required|string|max:255|unique:patients,id_number,' . $id,
            'email' => 'required|email|unique:patients,email,' . $id,
            'street_name' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'zip_code' => 'required|string|max:10',
            'jpmg_number' => 'required|string|max:255',
            'notes' => 'nullable|string',
            'doctor_name' => 'required|string|max:255',
            'treatment_duration' => 'required|integer',
        ]);

        $patient = Patient::findOrFail($id);
        $patient->update($request->all());
        return response()->json($patient, 200);
    }

    public function destroy($id)
    {
        $patient = Patient::findOrFail($id);
        $patient->delete();
        return response()->json(null, 204);
    }
}
