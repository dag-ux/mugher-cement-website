<?php

namespace App\Http\Controllers\Api;

use App\Models\ContactMessage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactNotification;

class ContactController extends Controller
{
    /**
     * Store a new contact message.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'nullable|string',
            'subject' => 'required|string',
            'message' => 'required|string',
        ]);

        $contact = ContactMessage::create($validated);

        // Send email notification (requires ContactNotification Mailable)
        Mail::to('admin@mughercement.com')->send(new ContactNotification($contact));

        return response()->json([
            'success' => true,
            'message' => 'Message sent successfully'
        ], 201);
    }

    /**
     * Get all contact messages (admin only).
     */
    public function index()
    {
        return response()->json(ContactMessage::all());
    }

    /**
     * Mark a contact message as read (admin only).
     */
    public function markAsRead($id)
    {
        $contact = ContactMessage::findOrFail($id);
        $contact->update(['is_read' => true]);
        return response()->json($contact);
    }
}