<?php

namespace App\Http\Controllers\Api;

use App\Models\News;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class NewsController extends Controller
{
    public function index()
    {
        return response()->json(News::all());
    }

    public function show($slug)
    {
        $news = News::where('slug', $slug)->firstOrFail();
        return response()->json($news);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'slug' => 'required|unique:news,slug',
            'content' => 'required|string',
            'cover_image' => 'nullable|url',
            'published_date' => 'nullable|date',
            'is_published' => 'boolean',
        ]);
        $news = News::create($validated);
        return response()->json($news, 201);
    }

    public function update(Request $request, $id)
    {
        $news = News::findOrFail($id);
        $validated = $request->validate([
            'title' => 'sometimes|required|string',
            'slug' => 'sometimes|required|unique:news,slug,' . $id,
            'content' => 'sometimes|required|string',
            'cover_image' => 'nullable|url',
            'published_date' => 'nullable|date',
            'is_published' => 'boolean',
        ]);
        $news->update($validated);
        return response()->json($news);
    }

    public function destroy($id)
    {
        $news = News::findOrFail($id);
        $news->delete();
        return response()->json(null, 204);
    }
}