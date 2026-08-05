<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(Product::all());
    }

    public function show($slug)
    {
        $product = Product::where('slug', $slug)->firstOrFail();
        return response()->json($product);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'slug' => 'required|unique:products,slug',
            'description' => 'nullable|string',
            'technical_specs' => 'nullable|json',
            'application' => 'nullable|string',
            'image_url' => 'nullable|url',
            'category' => 'nullable|string',
        ]);
        $product = Product::create($validated);
        return response()->json($product, 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $validated = $request->validate([
            'name' => 'sometimes|required|string',
            'slug' => 'sometimes|required|unique:products,slug,' . $id,
            'description' => 'nullable|string',
            'technical_specs' => 'nullable|json',
            'application' => 'nullable|string',
            'image_url' => 'nullable|url',
            'category' => 'nullable|string',
        ]);
        $product->update($validated);
        return response()->json($product);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(null, 204);
    }
}