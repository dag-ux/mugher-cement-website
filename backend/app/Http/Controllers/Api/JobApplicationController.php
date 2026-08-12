<?php

namespace App\Http\Controllers\Api;

use App\Models\JobApplication;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class JobApplicationController extends Controller
{
    /**
     * Get all job applications (for admin)
     */
    public function index()
    {
        $applications = JobApplication::with('job')->orderBy('created_at', 'desc')->get();
        return response()->json($applications);
    }

    /**
     * Store a new job application (public)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_id' => 'required|exists:jobs,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'cover_letter' => 'nullable|string',
            'cv' => 'required|file|mimes:pdf,doc,docx|max:5120', // 5MB
        ]);

        // Store CV
        $path = $request->file('cv')->store('cvs', 'public');

        $application = JobApplication::create([
            'job_id' => $validated['job_id'],
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'cover_letter' => $validated['cover_letter'] ?? null,
            'cv_path' => Storage::url($path),
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Application submitted successfully!',
            'application' => $application
        ], 201);
    }

    /**
     * Update application status (admin)
     */
    public function update(Request $request, $id)
    {
        $application = JobApplication::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|in:pending,reviewed,accepted,rejected',
        ]);

        $application->update($validated);

        return response()->json([
            'message' => 'Status updated successfully!',
            'application' => $application
        ]);
    }

    /**
     * Download CV file (admin)
     */
    public function downloadCV($id)
    {
        $application = JobApplication::findOrFail($id);
        
        // Get the file path from the stored URL
        $path = str_replace('/storage/', 'public/', $application->cv_path);
        
        if (!Storage::exists($path)) {
            return response()->json(['error' => 'CV file not found'], 404);
        }

        return Storage::download($path);
    }
}