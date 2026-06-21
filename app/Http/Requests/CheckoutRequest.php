<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CheckoutRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'customer_name' => ['required', 'string', 'max:255'],
            'customer_email' => ['required', 'email', 'max:255'],
            'customer_phone' => ['required', 'string', 'max:50'],
            'delivery_address' => ['required', 'string'],
            'delivery_date' => ['required', 'date', 'after_or_equal:today'],
            'delivery_time' => ['required', 'string'],
            'payment_method' => ['required', 'string', 'in:paystack,pay_on_delivery'],
            'notes' => ['nullable', 'string'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'card_number.regex' => 'Please enter a valid 16-digit card number.',
            'card_expiry.regex' => 'Please enter expiry in MM/YY format.',
            'card_cvv.regex' => 'Please enter a valid CVV code.',
        ];
    }
}
