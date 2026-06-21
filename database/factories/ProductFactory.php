<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->unique()->words(2, true);
        return [
            'category_id' => \App\Models\Category::factory(),
            'name' => ucfirst($name),
            'slug' => str($name)->slug()->toString(),
            'description' => $this->faker->paragraph(),
            'price' => $this->faker->randomFloat(2, 2, 45),
            'image_path' => null,
            'is_available' => true,
            'stock' => $this->faker->numberBetween(5, 100),
        ];
    }
}
