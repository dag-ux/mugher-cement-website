<?php

namespace App\Http\Controllers\Api;

use App\Models\Job;
use App\Models\JobApplication;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class JobController extends Controller
{
    // Public: Get all active jobs
    public function index()
    {
        $jobs = Job::where('is_active', true)->orderBy('created_at', 'desc')->get();
        return response()->json($jobs);
    }

    // Public: Get single job
    public function show($slug)
    {
        $job = Job::where('slug', $slug)->firstOrFail();
        return response()->json($job);
    }

    // Public: Submit application
    public function apply(Request $request, $id)
    {
        $job = Job::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'cover_letter' => 'nullable|string',
            'cv' => 'required|file|mimes:pdf,doc,docx|max:2048', // 2MB max
        ]);

        // Store CV
        $path = $request->file('cv')->store('cvs', 'public');

        $application = JobApplication::create([
            'job_id' => $job->id,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'cover_letter' => $validated['cover_letter'] ?? null,
            'cv_path' => $path,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Application submitted successfully!',
            'application' => $application
        ], 201);
    }

    // Admin: Store new job
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|unique:jobs,slug',
            'location' => 'required|string|max:255',
            'type' => 'required|string|max:50',
            'description' => 'required|string',
            'is_active' => 'boolean',
        ]);

        $job = Job::create($validated);
        return response()->json($job, 201);
    }

    // Admin: Update job
    public function update(Request $request, $id)
    {
        $job = Job::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|required|unique:jobs,slug,' . $id,
            'location' => 'sometimes|required|string|max:255',
            'type' => 'sometimes|required|string|max:50',
            'description' => 'sometimes|required|string',
            'is_active' => 'boolean',
        ]);

        $job->update($validated);
        return response()->json($job);
    }

    // Admin: Delete job
    public function destroy($id)
    {
        $job = Job::findOrFail($id);
        $job->delete();
        return response()->json(null, 204);
    }

    // Admin: Get all applications
    public function applications()
    {
        $applications = JobApplication::with('job')->orderBy('created_at', 'desc')->get();
        return response()->json($applications);
    }

    // Admin: Update application status
    public function updateApplicationStatus(Request $request, $id)
    {
        $application = JobApplication::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|in:pending,reviewed,accepted,rejected',
        ]);

        $application->update($validated);
        return response()->json($application);
    }

    // Admin: Download CV
    public function downloadCV($id)
    {
        $application = JobApplication::findOrFail($id);
        $path = storage_path('app/public/' . $application->cv_path);

        if (!file_exists($path)) {
            return response()->json(['error' => 'CV not found'], 404);
        }

        return response()->download($path);
    }
}