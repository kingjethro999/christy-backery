<?php

namespace Database\Factories;

use App\Models\Inquiry;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Inquiry>
 */
class InquiryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = $this->faker->randomElement(['reservation', 'custom_cake', 'feedback', 'other']);
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'type' => $type,
            'reservation_date' => $type === 'reservation' ? $this->faker->dateTimeBetween('now', '+14 days')->format('Y-m-d') : null,
            'reservation_time' => $type === 'reservation' ? $this->faker->time('H:i') : null,
            'message' => $this->faker->paragraph(),
            'status' => $this->faker->randomElement(['pending', 'resolved']),
        ];
    }
}
