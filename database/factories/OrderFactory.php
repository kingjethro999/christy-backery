<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'customer_name' => $this->faker->name(),
            'customer_email' => $this->faker->safeEmail(),
            'customer_phone' => $this->faker->phoneNumber(),
            'delivery_address' => $this->faker->address(),
            'delivery_date' => $this->faker->dateTimeBetween('now', '+7 days')->format('Y-m-d'),
            'delivery_time' => $this->faker->time('H:i'),
            'total_price' => $this->faker->randomFloat(2, 10, 150),
            'payment_status' => $this->faker->randomElement(['pending', 'paid', 'failed']),
            'payment_method' => $this->faker->randomElement(['card', 'delivery']),
            'status' => $this->faker->randomElement(['pending', 'processing', 'completed', 'cancelled']),
            'notes' => $this->faker->sentence(),
        ];
    }
}
