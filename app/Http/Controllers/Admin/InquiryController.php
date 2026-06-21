<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use App\Http\Resources\InquiryResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class InquiryController extends Controller
{
    /**
     * Display a listing of inquiries and reservations.
     */
    public function index(Request $request): Response
    {
        $query = Inquiry::query();

        if ($request->filled('type')) {
            $query->where('type', $request->input('type'));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%");
            });
        }

        $inquiries = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('admin/inquiries/index', [
            'inquiries' => InquiryResource::collection($inquiries),
            'filters' => $request->only(['type', 'status', 'search']),
        ]);
    }

    /**
     * Mark an inquiry/reservation as resolved.
     */
    public function resolve(Inquiry $inquiry): RedirectResponse
    {
        try {
            $inquiry->update(['status' => 'resolved']);

            Log::info("Inquiry ID {$inquiry->id} marked as resolved by admin.", [
                'admin_id' => auth()->id(),
            ]);

            return back()->with('success', 'Inquiry marked as resolved successfully.');

        } catch (\Exception $e) {
            Log::error("Failed to resolve inquiry ID {$inquiry->id}.", [
                'error' => $e->getMessage(),
            ]);

            return back()->with('error', 'Failed to resolve inquiry: ' . $e->getMessage());
        }
    }
}
