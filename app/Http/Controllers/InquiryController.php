<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInquiryRequest;
use App\Models\Inquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;

class InquiryController extends Controller
{
    /**
     * Store a newly created inquiry / reservation in storage.
     */
    public function store(StoreInquiryRequest $request): RedirectResponse
    {
        try {
            $inquiry = Inquiry::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'phone' => $request->input('phone'),
                'type' => $request->input('type'),
                'reservation_date' => $request->input('reservation_date'),
                'reservation_time' => $request->input('reservation_time'),
                'message' => $request->input('message'),
                'status' => 'pending',
            ]);

            Log::info("Inquiry/Reservation created successfully.", [
                'id' => $inquiry->id,
                'name' => $inquiry->name,
                'type' => $inquiry->type,
            ]);

            $message = $inquiry->type === 'reservation' 
                ? 'Your reservation request has been submitted successfully! We will contact you soon to confirm.'
                : 'Your inquiry has been sent! A representative will reach out to you shortly.';

            return back()->with('success', $message);

        } catch (\Exception $e) {
            Log::error('Failed to submit inquiry.', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return back()->withInput()->with('error', 'Failed to submit request: ' . $e->getMessage());
        }
    }
}
