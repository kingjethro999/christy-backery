<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Users
        User::factory()->create([
            'name' => 'Christy Admin',
            'email' => 'iamchristy@gmail.com',
            'password' => bcrypt('SecurePassword123!'),
            'is_admin' => true,
        ]);

        User::factory()->create([
            'name' => 'Customer User',
            'email' => 'customer@christybakery.com',
            'password' => bcrypt('password'),
            'is_admin' => false,
        ]);

        // 2. Seed Categories & Products
        $catalog = [
            'Cakes' => [
                'description' => 'Decadent and beautifully decorated cakes for all occasions.',
                'products' => [
                    [
                        'name' => 'Chocolate Fudge Cake',
                        'description' => 'Rich, moist chocolate cake layered with decadent fudge frosting and topped with chocolate curls.',
                        'price' => 25.00,
                        'stock' => 15,
                    ],
                    [
                        'name' => 'Red Velvet Delight',
                        'description' => 'Classic red velvet cake layers with a light cocoa flavor, frosted with rich cream cheese icing.',
                        'price' => 28.00,
                        'stock' => 10,
                    ],
                    [
                        'name' => 'Strawberry Shortcake',
                        'description' => 'Light, fluffy sponge cake filled with fresh strawberries and sweet whipped cream.',
                        'price' => 22.00,
                        'stock' => 12,
                    ],
                    [
                        'name' => 'Vanilla Bean Dream',
                        'description' => 'Elegant Madagascan vanilla sponge paired with silky smooth vanilla buttercream.',
                        'price' => 20.00,
                        'stock' => 20,
                    ],
                ]
            ],
            'Breads' => [
                'description' => 'Freshly baked artisan breads, hand-kneaded and baked daily.',
                'products' => [
                    [
                        'name' => 'Sourdough Boule',
                        'description' => 'Naturally leavened artisan bread with a crisp crust and a soft, tangy, chewy crumb.',
                        'price' => 6.50,
                        'stock' => 30,
                    ],
                    [
                        'name' => 'Brioche Loaf',
                        'description' => 'Rich, buttery French bread with a golden crust and a pillow-soft, tender crumb.',
                        'price' => 8.00,
                        'stock' => 25,
                    ],
                    [
                        'name' => 'Whole Wheat Loaf',
                        'description' => 'Hearty and nutritious bread made from 100% stoneground whole wheat flour.',
                        'price' => 5.50,
                        'stock' => 30,
                    ],
                    [
                        'name' => 'French Baguette',
                        'description' => 'Traditional long, thin loaf with a crackly crust and a light, airy interior.',
                        'price' => 3.50,
                        'stock' => 40,
                    ],
                ]
            ],
            'Pastries' => [
                'description' => 'Sweet and savory laminated pastries that melt in your mouth.',
                'products' => [
                    [
                        'name' => 'Butter Croissant',
                        'description' => 'Flaky, golden-brown laminated pastry made with layers of high-quality French butter.',
                        'price' => 4.00,
                        'stock' => 50,
                    ],
                    [
                        'name' => 'Pain au Chocolat',
                        'description' => 'Decadent butter croissant dough wrapped around two bars of premium dark chocolate.',
                        'price' => 4.50,
                        'stock' => 45,
                    ],
                    [
                        'name' => 'Cinnamon Roll',
                        'description' => 'Soft, warm cinnamon swirl pastry topped with a generous layer of sweet cream cheese glaze.',
                        'price' => 5.00,
                        'stock' => 35,
                    ],
                    [
                        'name' => 'Almond Danish',
                        'description' => 'Flaky Danish pastry filled with sweet almond frangipane and topped with sliced almonds.',
                        'price' => 4.50,
                        'stock' => 30,
                    ],
                ]
            ],
            'Cookies' => [
                'description' => 'Freshly baked cookies, crunchy on the outside and chewy on the inside.',
                'products' => [
                    [
                        'name' => 'Chocolate Chip Cookie',
                        'description' => 'Classic soft-baked cookie loaded with semi-sweet chocolate chunks and a touch of sea salt.',
                        'price' => 2.50,
                        'stock' => 100,
                    ],
                    [
                        'name' => 'Oatmeal Raisin Cookie',
                        'description' => 'Chewy, spiced oatmeal cookie packed with sweet, plump raisins.',
                        'price' => 2.50,
                        'stock' => 80,
                    ],
                    [
                        'name' => 'Assorted Macaron Box',
                        'description' => 'A colorful box of 6 delicate French macarons in raspberry, pistachio, chocolate, and vanilla.',
                        'price' => 15.00,
                        'stock' => 25,
                    ],
                    [
                        'name' => 'Double Chocolate Cookie',
                        'description' => 'Decadent chocolate cookie dough loaded with both milk and white chocolate chips.',
                        'price' => 3.00,
                        'stock' => 90,
                    ],
                ]
            ],
        ];

        foreach ($catalog as $categoryName => $details) {
            $category = Category::create([
                'name' => $categoryName,
                'slug' => str($categoryName)->slug()->toString(),
                'description' => $details['description'],
            ]);

            foreach ($details['products'] as $prod) {
                Product::create([
                    'category_id' => $category->id,
                    'name' => $prod['name'],
                    'slug' => str($prod['name'])->slug()->toString(),
                    'description' => $prod['description'],
                    'price' => $prod['price'],
                    'stock' => $prod['stock'],
                    'is_available' => true,
                ]);
            }
        }
    }
}
